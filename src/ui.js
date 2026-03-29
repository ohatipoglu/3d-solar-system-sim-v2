// ============================================================
//  Kullanıcı Arayüzü (UI) ve Kontroller Modülü
// ============================================================

import { getSeason, getMoonPhaseName } from './utils.js';
import { AU_KM } from './constants.js';

let visualScale = true;

export function updateUI(simDate, earthPos, moonPos, speed, phaseVal) {
    const utcStr = simDate.toUTCString().slice(0, 25);
    document.getElementById('sim-date').innerText = utcStr;
    const istanbul = new Date(simDate.getTime() + 3*60*60*1000);
    document.getElementById('sim-date-istanbul').innerText = istanbul.toLocaleString('tr-TR');
    document.getElementById('season').innerText = getSeason(simDate);

    const distSunAU = earthPos.length();
    const sunDistKm = (distSunAU * AU_KM).toFixed(1);
    document.getElementById('sun-dist').innerHTML = `${(distSunAU).toFixed(3)} AU (${sunDistKm} km)`;

    const moonDistKm = moonPos.distanceTo(earthPos) * (visualScale ? 125000 : 1);
    document.getElementById('moon-dist').innerHTML = `${moonDistKm.toFixed(0)} km`;

    const phaseName = getMoonPhaseName(phaseVal);
    document.getElementById('moon-phase').innerText = phaseName.split(' ')[0];
    document.getElementById('moon-emoji').innerHTML = phaseName.includes('🌑')?'🌑':(phaseName.includes('🌒')?'🌒':(phaseName.includes('🌓')?'🌓':(phaseName.includes('🌔')?'🌔':(phaseName.includes('🌕')?'🌕':(phaseName.includes('🌖')?'🌖':(phaseName.includes('🌗')?'🌗':'🌘'))))));
    document.getElementById('speed-mult').innerText = speed.toFixed(2);
    document.getElementById('realtime-badge').innerText = (Math.abs(speed-1.0)<0.01) ? "Gerçek Zaman" : "Simülasyon Zamanı";
}

export function initControls(callbacks) {
    const { 
        onPlayPause, onReset, onRewind, onForward, 
        onSpeedChange, onScaleToggle, onGridToggle, 
        onDateChange, onApollo, onJuneSolstice, onCameraTargetChange 
    } = callbacks;

    const playPause = document.getElementById('playPauseBtn');
    playPause.onclick = () => {
        const isPlaying = onPlayPause();
        playPause.innerText = isPlaying ? "⏸️ Duraklat" : "▶️ Başlat";
    };

    document.getElementById('resetNowBtn').onclick = onReset;
    document.getElementById('rewindBtn').onclick = onRewind;
    document.getElementById('forwardBtn').onclick = onForward;

    const speedSlider = document.getElementById('speedSlider');
    speedSlider.oninput = (e) => {
        const val = parseFloat(e.target.value);
        const timeScale = Math.pow(10, val);
        document.getElementById('speedValue').innerText = timeScale.toExponential(2);
        onSpeedChange(timeScale);
    };

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.onclick = () => {
            let speed = parseFloat(btn.getAttribute('data-speed'));
            const logVal = Math.log10(speed);
            speedSlider.value = logVal;
            document.getElementById('speedValue').innerText = speed.toExponential(2);
            onSpeedChange(speed);
        };
    });

    const toggleScale = document.getElementById('toggleScaleBtn');
    toggleScale.onclick = () => {
        visualScale = !visualScale;
        onScaleToggle(visualScale);
        toggleScale.innerText = visualScale ? "🌐 Görsel Ölçek" : "⚛️ Gerçek Ölçek";
    };
    document.getElementById('toggleGridBtn').onclick = onGridToggle;

    const datePicker = document.getElementById('datePicker');
    datePicker.onchange = () => {
        const newDate = new Date(datePicker.value + "T12:00:00Z");
        if (!isNaN(newDate)) onDateChange(newDate.getTime());
    };

    document.getElementById('jumpToApollo').onclick = onApollo;
    document.getElementById('juneSolstice').onclick = onJuneSolstice;

    // Klavye kısayolları
    window.addEventListener('keydown', (e) => {
        if (e.target.id === 'datePicker') return; // Don't trigger on date input

        if (e.code === 'Space') { playPause.click(); e.preventDefault(); }
        if (e.code === 'KeyR') { onReset(); }
        if (e.code === 'KeyC') { onCameraTargetChange(); }
        if (e.code >= 'Digit1' && e.code <= 'Digit9') {
            const speeds = [0.1, 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
            const idx = parseInt(e.code.slice(-1)) - 1;
            if(speeds[idx]) {
                const speed = speeds[idx];
                const logVal = Math.log10(speed);
                speedSlider.value = logVal;
                document.getElementById('speedValue').innerText = speed.toExponential(2);
                onSpeedChange(speed);
            }
        }
    });
}
