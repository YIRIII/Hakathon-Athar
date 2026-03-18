export interface QRCode {
  id: string;
  siteId: string;
  type: 'entry' | 'internal';
  label_ar: string;
  label_en: string;
  url: string;
  /** For internal QR — which section/story of the site */
  section?: string;
}

export const qrCodes: QRCode[] = [
  // ──────────────────── ENTRY QRs (one per site, 12 total) ────────────────────

  // Makkah sites
  {
    id: 'qr-cave-hira-entry',
    siteId: 'cave-hira',
    type: 'entry',
    label_ar: 'غار حراء — مدخل الموقع',
    label_en: 'Cave Hira — Site Entry',
    url: '/ar/sites/cave-hira',
  },
  {
    id: 'qr-cave-thawr-entry',
    siteId: 'cave-thawr',
    type: 'entry',
    label_ar: 'غار ثور — مدخل الموقع',
    label_en: 'Cave Thawr — Site Entry',
    url: '/ar/sites/cave-thawr',
  },
  {
    id: 'qr-makkah-museum-entry',
    siteId: 'makkah-museum',
    type: 'entry',
    label_ar: 'متحف مكة المكرمة — مدخل الموقع',
    label_en: 'Makkah Museum — Site Entry',
    url: '/ar/sites/makkah-museum',
  },
  {
    id: 'qr-jabal-al-rahmah-entry',
    siteId: 'jabal-al-rahmah',
    type: 'entry',
    label_ar: 'جبل الرحمة — مدخل الموقع',
    label_en: 'Jabal al-Rahmah — Site Entry',
    url: '/ar/sites/jabal-al-rahmah',
  },
  {
    id: 'qr-al-mualla-cemetery-entry',
    siteId: 'al-mualla-cemetery',
    type: 'entry',
    label_ar: 'مقبرة المعلاة — مدخل الموقع',
    label_en: 'Al-Mualla Cemetery — Site Entry',
    url: '/ar/sites/al-mualla-cemetery',
  },
  {
    id: 'qr-mina-landmarks-entry',
    siteId: 'mina-landmarks',
    type: 'entry',
    label_ar: 'مشاعر منى — مدخل الموقع',
    label_en: 'Mina Landmarks — Site Entry',
    url: '/ar/sites/mina-landmarks',
  },

  // Madinah sites
  {
    id: 'qr-quba-mosque-entry',
    siteId: 'quba-mosque',
    type: 'entry',
    label_ar: 'مسجد قباء — مدخل الموقع',
    label_en: 'Quba Mosque — Site Entry',
    url: '/ar/sites/quba-mosque',
  },
  {
    id: 'qr-al-baqi-cemetery-entry',
    siteId: 'al-baqi-cemetery',
    type: 'entry',
    label_ar: 'مقبرة البقيع — مدخل الموقع',
    label_en: 'Al-Baqi Cemetery — Site Entry',
    url: '/ar/sites/al-baqi-cemetery',
  },
  {
    id: 'qr-uhud-mountain-entry',
    siteId: 'uhud-mountain',
    type: 'entry',
    label_ar: 'جبل أحد — مدخل الموقع',
    label_en: 'Uhud Mountain — Site Entry',
    url: '/ar/sites/uhud-mountain',
  },
  {
    id: 'qr-qiblatain-mosque-entry',
    siteId: 'qiblatain-mosque',
    type: 'entry',
    label_ar: 'مسجد القبلتين — مدخل الموقع',
    label_en: 'Qiblatain Mosque — Site Entry',
    url: '/ar/sites/qiblatain-mosque',
  },
  {
    id: 'qr-dar-al-madinah-museum-entry',
    siteId: 'dar-al-madinah-museum',
    type: 'entry',
    label_ar: 'دار المدينة — مدخل الموقع',
    label_en: 'Dar Al Madinah Museum — Site Entry',
    url: '/ar/sites/dar-al-madinah-museum',
  },
  {
    id: 'qr-al-khandaq-entry',
    siteId: 'al-khandaq',
    type: 'entry',
    label_ar: 'موقع الخندق — مدخل الموقع',
    label_en: 'Al-Khandaq — Site Entry',
    url: '/ar/sites/al-khandaq',
  },

  // ──────── INTERNAL QRs (2-3 per first 3 sites) ────────

  // Cave Hira — internal QRs
  {
    id: 'qr-cave-hira-revelation',
    siteId: 'cave-hira',
    type: 'internal',
    label_ar: 'غار حراء — قصة الوحي',
    label_en: 'Cave Hira — The Revelation Story',
    url: '/ar/sites/cave-hira#revelation',
    section: 'revelation',
  },
  {
    id: 'qr-cave-hira-climb',
    siteId: 'cave-hira',
    type: 'internal',
    label_ar: 'غار حراء — مسار الصعود',
    label_en: 'Cave Hira — The Climbing Path',
    url: '/ar/sites/cave-hira#climb',
    section: 'climb',
  },
  {
    id: 'qr-cave-hira-panorama',
    siteId: 'cave-hira',
    type: 'internal',
    label_ar: 'غار حراء — البانوراما',
    label_en: 'Cave Hira — Panoramic View',
    url: '/ar/sites/cave-hira#panorama',
    section: 'panorama',
  },

  // Cave Thawr — internal QRs
  {
    id: 'qr-cave-thawr-hijra',
    siteId: 'cave-thawr',
    type: 'internal',
    label_ar: 'غار ثور — قصة الهجرة',
    label_en: 'Cave Thawr — The Hijra Story',
    url: '/ar/sites/cave-thawr#hijra',
    section: 'hijra',
  },
  {
    id: 'qr-cave-thawr-spider',
    siteId: 'cave-thawr',
    type: 'internal',
    label_ar: 'غار ثور — معجزة العنكبوت',
    label_en: 'Cave Thawr — The Spider Miracle',
    url: '/ar/sites/cave-thawr#spider',
    section: 'spider',
  },

  // Makkah Museum — internal QRs
  {
    id: 'qr-makkah-museum-manuscripts',
    siteId: 'makkah-museum',
    type: 'internal',
    label_ar: 'متحف مكة — قسم المخطوطات',
    label_en: 'Makkah Museum — Manuscripts Gallery',
    url: '/ar/sites/makkah-museum#manuscripts',
    section: 'manuscripts',
  },
  {
    id: 'qr-makkah-museum-haram-models',
    siteId: 'makkah-museum',
    type: 'internal',
    label_ar: 'متحف مكة — نماذج المسجد الحرام',
    label_en: 'Makkah Museum — Haram Architectural Models',
    url: '/ar/sites/makkah-museum#haram-models',
    section: 'haram-models',
  },
  {
    id: 'qr-makkah-museum-hajj',
    siteId: 'makkah-museum',
    type: 'internal',
    label_ar: 'متحف مكة — جناح الحج والعمرة',
    label_en: 'Makkah Museum — Hajj & Umrah Wing',
    url: '/ar/sites/makkah-museum#hajj',
    section: 'hajj',
  },
];
