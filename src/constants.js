// ============================================================
//  ASTronomik ve Simülasyon Sabitleri
// ============================================================

// --- Astronomik Sabitler ---
export const YEAR_SECONDS = 365.25 * 86400;      // saniye
export const MOON_PERIOD_SECONDS = 27.3 * 86400; // 27.3 gün
export const EARTH_ROTATION_PERIOD = 86400;      // 24 saat
export const AU_KM = 149597870.7;                // 1 AU km

// --- Yörünge Yarıçapları ---
export const EARTH_ORBIT_RADIUS_AU = 1.0;
export const MOON_ORBIT_RADIUS_KM = 384400;      // km

// --- Görsel Ölçeklendirme Sabitleri ---
export const VISUAL_SCALE = {
    EARTH_RADIUS: 0.9,
    MOON_RADIUS: 0.25,
    SUN_RADIUS: 0.9,
    EARTH_ORBIT_RADIUS: 7.5,
    MOON_ORBIT_RADIUS: 1.3
};

// --- Gerçekçi Ölçeklendirme Sabitleri ---
export const REALISTIC_SCALE = {
    EARTH_RADIUS: 6371 / 200000,
    MOON_RADIUS: 1737 / 200000,
    SUN_RADIUS: 6.96e5 / 2e6,
    EARTH_ORBIT_RADIUS: 2.2,
    MOON_ORBIT_RADIUS: (384400 / (AU_KM * 1.3)) * 1.5
};

// --- Eksen Eğikliği ---
export const EARTH_AXIAL_TILT = 23.44 * Math.PI / 180; // radyan
