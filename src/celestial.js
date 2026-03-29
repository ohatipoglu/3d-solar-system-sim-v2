// ============================================================
//  Gök Cisimleri Oluşturma Modülü
// ============================================================

import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

// --- Texture'lar (yüksek kalite) ---
const sunTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'); // placeholder, güneş için parlak
const earthDiffuse = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const earthSpecular = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
const earthNormal = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
const cloudTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
const moonTexture = textureLoader.load('https://threejs.org/examples/textures/planets/moon_1024.jpg');

export function createSun() {
    const sunGeometry = new THREE.SphereGeometry(1, 128, 128);
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa55, emissive: 0xff4411, emissiveIntensity: 0.9, metalness: 0.1, roughness: 0.4 });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.castShadow = false;
    return sunMesh;
}

export function createSunGlow() {
    const sunGlowGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunGlowMat = new THREE.MeshBasicMaterial({ color: 0xff8833, transparent: true, opacity: 0.2 });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMat);
    return sunGlow;
}

export function createEarth() {
    const earthGeometry = new THREE.SphereGeometry(0.9, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthDiffuse, specularMap: earthSpecular, specular: new THREE.Color('grey'), shininess: 5, normalMap: earthNormal });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    return earthMesh;
}

export function createClouds() {
    const cloudGeometry = new THREE.SphereGeometry(0.905, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudTexture, transparent: true, opacity: 0.12 });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    return cloudMesh;
}

export function createMoon() {
    const moonGeometry = new THREE.SphereGeometry(0.25, 128, 128);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 0.8, metalness: 0.05 });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    return moonMesh;
}
