
// ============================================================
//  3D ASTRONOMİ SİMÜLASYONU - ANA MODÜL
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import {
    YEAR_SECONDS, MOON_PERIOD_SECONDS, EARTH_ROTATION_PERIOD,
    VISUAL_SCALE, REALISTIC_SCALE, EARTH_AXIAL_TILT
} from './constants.js';

import {
    createSun, createSunGlow, createEarth, createClouds, createMoon
} from './celestial.js';

import { initControls, updateUI } from './ui.js';
import { computeMoonPhase } from './utils.js';

// --- Global Değişkenler ---
let visualScale = true;
let cameraTargetMode = 'free';
let timeScale = 1.0;
let isPlaying = true;
let simulationTimeMs = Date.now();

// --- Three.js Kurulumu ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010118);
scene.fog = new THREE.FogExp2(0x010118, 0.00003);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// --- Post-processing (Bloom) ---
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.2, 0.1);
const effectComposer = new EffectComposer(renderer);
effectComposer.addPass(renderScene);
effectComposer.addPass(bloomPass);

// --- Kontroller ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- Işıklandırma ---
scene.add(new THREE.AmbientLight(0x111111));
const sunLight = new THREE.PointLight(0xffdd99, 1.8, 0, 2);
sunLight.castShadow = true;
scene.add(sunLight);

// --- Arkaplan ---
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(4000 * 3);
for (let i = 0; i < 4000; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 800;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 80;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.7 }));
scene.add(stars);

// --- Nesneler ---
const sunMesh = createSun();
const sunGlow = createSunGlow();
const earthGroup = new THREE.Group();
const earthMesh = createEarth();
const cloudMesh = createClouds();
const moonMesh = createMoon();
let moonOrbitRing = null;

earthGroup.add(earthMesh, cloudMesh);
earthGroup.rotation.x = -EARTH_AXIAL_TILT;
scene.add(sunMesh, sunGlow, earthGroup, moonMesh);

// --- Yörünge Çizgileri ve Grid ---
const earthOrbitLine = new THREE.LineLoop(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.3 })
);
scene.add(earthOrbitLine);

const gridHelper = new THREE.GridHelper(25, 30, 0x88aaff, 0x335588);
gridHelper.position.y = -0.5;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.25;
scene.add(gridHelper);

function createMoonOrbitRing() {
    if (moonOrbitRing) earthGroup.remove(moonOrbitRing);
    const radius = visualScale ? VISUAL_SCALE.MOON_ORBIT_RADIUS : REALISTIC_SCALE.MOON_ORBIT_RADIUS;
    const points = [];
    for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    moonOrbitRing = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xccaa88, transparent: true, opacity: 0.45 })
    );
    earthGroup.add(moonOrbitRing);
}

// --- Ana Fonksiyonlar ---
function setScaleMode(isVisual) {
    visualScale = isVisual;
    const scale = isVisual ? VISUAL_SCALE : REALISTIC_SCALE;

    earthMesh.scale.setScalar(scale.EARTH_RADIUS / 0.9);
    cloudMesh.scale.setScalar(scale.EARTH_RADIUS / 0.9 * 1.005);
    moonMesh.scale.setScalar(scale.MOON_RADIUS / 0.25);
    sunMesh.scale.setScalar(scale.SUN_RADIUS);
    sunGlow.scale.setScalar(scale.SUN_RADIUS * 1.1);

    const earthOrbitPoints = [];
    for (let i = 0; i <= 200; i++) {
        const angle = (i / 200) * Math.PI * 2;
        earthOrbitPoints.push(new THREE.Vector3(Math.cos(angle) * scale.EARTH_ORBIT_RADIUS, 0, Math.sin(angle) * scale.EARTH_ORBIT_RADIUS));
    }
    earthOrbitLine.geometry.setFromPoints(earthOrbitPoints);
    createMoonOrbitRing();
}

function updatePositions(timeMs) {
    const timeSec = timeMs / 1000;
    const scale = visualScale ? VISUAL_SCALE : REALISTIC_SCALE;

    const earthAngle = (timeSec / YEAR_SECONDS) * Math.PI * 2;
    earthGroup.position.set(
        Math.cos(earthAngle) * scale.EARTH_ORBIT_RADIUS,
        0,
        Math.sin(earthAngle) * scale.EARTH_ORBIT_RADIUS
    );

    const moonAngle = (timeSec / MOON_PERIOD_SECONDS) * Math.PI * 2;
    const moonRelPos = new THREE.Vector3(
        Math.cos(moonAngle) * scale.MOON_ORBIT_RADIUS,
        0,
        Math.sin(moonAngle) * scale.MOON_ORBIT_RADIUS
    );
    // Transform moon position to be relative to the tilted earth group
    const moonWorldPos = earthGroup.localToWorld(moonRelPos.clone());
    moonMesh.position.copy(moonWorldPos);

    earthMesh.rotation.y = (timeMs / (EARTH_ROTATION_PERIOD * 1000)) * Math.PI * 2;
    cloudMesh.rotation.y = earthMesh.rotation.y + 0.01;
    moonMesh.rotation.y = moonAngle; // Tidal lock

    return {
        earthPos: earthGroup.position,
        moonPos: moonMesh.position,
        moonRelPos: moonRelPos
    };
}

function updateCameraTarget() {
    let target;
    if (cameraTargetMode === 'sun') target = sunMesh.position;
    else if (cameraTargetMode === 'earth') target = earthGroup.position;
    else if (cameraTargetMode === 'moon') target = moonMesh.position;
    
    if (target) {
        controls.target.lerp(target, 0.1);
    }
}

// --- Animasyon Döngüsü ---
let lastFrameTime = performance.now();
function animate() {
    const now = performance.now();
    const delta = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    if (isPlaying) {
        simulationTimeMs += delta * timeScale * 1000;
    }

    const { earthPos, moonPos, moonRelPos } = updatePositions(simulationTimeMs);
    const phase = computeMoonPhase(earthPos, moonRelPos);
    updateUI(new Date(simulationTimeMs), earthPos, moonPos, timeScale, phase);
    updateCameraTarget();

    stars.rotation.y += 0.00005 * timeScale;
    controls.update();
    effectComposer.render();

    requestAnimationFrame(animate);
}

// --- Olay Yöneticileri ---
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effectComposer.setSize(window.innerWidth, window.innerHeight);
};

// --- Başlatma ---
initControls({
    onPlayPause: () => { isPlaying = !isPlaying; return isPlaying; },
    onReset: () => { simulationTimeMs = Date.now(); },
    onRewind: () => { simulationTimeMs -= 1000 * timeScale; },
    onForward: () => { simulationTimeMs += 1000 * timeScale; },
    onSpeedChange: (newSpeed) => { timeScale = newSpeed; },
    onScaleToggle: (isVisual) => { setScaleMode(isVisual); },
    onGridToggle: () => { gridHelper.visible = !gridHelper.visible; },
    onDateChange: (newTimeMs) => { simulationTimeMs = newTimeMs; },
    onApollo: () => { simulationTimeMs = new Date('1969-07-20T20:17:00Z').getTime(); },
    onJuneSolstice: () => { simulationTimeMs = new Date('2025-06-21T12:00:00Z').getTime(); },
    onCameraTargetChange: () => {
        const modes = ['free', 'sun', 'earth', 'moon'];
        let idx = modes.indexOf(cameraTargetMode);
        cameraTargetMode = modes[(idx + 1) % modes.length];
        if (cameraTargetMode === 'free') controls.target.set(0, 0, 0);
    }
});

setScaleMode(true);
animate();

console.log("Simülasyon başlatıldı.");
