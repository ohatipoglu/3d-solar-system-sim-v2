// ============================================================
//  Yardımcı Fonksiyonlar Modülü
// ============================================================
import * as THREE from 'three';

export function getSeason(date) {
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    if ((month === 2 && day >= 21) || month === 3 || month === 4 || (month === 5 && day <= 20)) return "🌸 İlkbahar";
    if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) return "☀️ Yaz";
    if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) return "🍂 Sonbahar";
    return "❄️ Kış";
}

export function getMoonPhaseName(phase) {
    if (phase < 0.03) return "Yeni Ay 🌑";
    if (phase < 0.23) return "Hilal 🌒";
    if (phase < 0.27) return "İlk Dördün 🌓";
    if (phase < 0.48) return "Büyüyen Şişkin 🌔";
    if (phase < 0.52) return "Dolunay 🌕";
    if (phase < 0.73) return "Küçülen Şişkin 🌖";
    if (phase < 0.77) return "Son Dördün 🌗";
    return "Hilal 🌘";
}

export function computeMoonPhase(earthPos, moonRelPos) {
    // Güneş yönü (Dünya'dan Güneş'e vektör)
    const sunDir = new THREE.Vector3().subVectors(new THREE.Vector3(0,0,0), earthPos).normalize();
    const moonDir = moonRelPos.clone().normalize();
    const angle = sunDir.angleTo(moonDir);
    const phase = (1 - Math.cos(angle)) / 2;
    return phase;
}
