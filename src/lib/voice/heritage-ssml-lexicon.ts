/**
 * SSML Pronunciation Lexicon for Islamic Heritage Terminology
 *
 * Maps heritage-specific terms to SSML pronunciation hints.
 * Used by Azure Neural TTS to correctly pronounce Islamic terms,
 * historical site names, and Arabic heritage vocabulary.
 *
 * Note: These entries use SSML <sub> tags for pronunciation aliases.
 * For production, IPA phonemes via <phoneme> tags should be validated
 * with native Arabic speakers.
 */

export interface SSMLLexiconEntry {
  /** The term as it appears in text */
  term: string;
  /** SSML substitution for correct pronunciation (Arabic) */
  subAr?: string;
  /** SSML substitution for correct pronunciation (English) */
  subEn?: string;
}

/**
 * Heritage terminology lexicon — terms that TTS commonly mispronounces.
 *
 * Categories:
 * 1. Sacred sites in Makkah and Madinah
 * 2. Islamic honorifics and phrases
 * 3. Historical figures and events
 * 4. Pilgrimage terminology
 */
export const HERITAGE_LEXICON: SSMLLexiconEntry[] = [
  // Sacred sites — Makkah
  { term: 'غار حراء', subEn: 'Ghar Hiraa' },
  { term: 'غار ثور', subEn: 'Ghar Thawr' },
  { term: 'جبل النور', subEn: 'Jabal al-Noor' },
  { term: 'المسجد الحرام', subEn: 'Al-Masjid al-Haram' },
  { term: 'الكعبة المشرفة', subEn: 'Al-Kaaba al-Musharrafa' },
  { term: 'بئر زمزم', subEn: 'Bir Zamzam' },
  { term: 'مقام إبراهيم', subEn: 'Maqam Ibrahim' },
  { term: 'الحجر الأسود', subEn: 'Al-Hajar al-Aswad' },
  { term: 'الصفا والمروة', subEn: 'Al-Safa wa al-Marwa' },

  // Sacred sites — Madinah
  { term: 'المسجد النبوي', subEn: 'Al-Masjid an-Nabawi' },
  { term: 'الروضة الشريفة', subEn: 'Al-Rawda ash-Shareefa' },
  { term: 'جبل أحد', subEn: 'Jabal Uhud' },
  { term: 'مسجد قباء', subEn: 'Masjid Qubaa' },
  { term: 'مسجد القبلتين', subEn: 'Masjid al-Qiblatayn' },
  { term: 'البقيع', subEn: 'Al-Baqee' },

  // Pilgrimage terms
  { term: 'الطواف', subEn: 'Al-Tawaf' },
  { term: 'السعي', subEn: "Al-Sa'y" },
  { term: 'الحج', subEn: 'Al-Hajj' },
  { term: 'العمرة', subEn: "Al-'Umrah" },
  { term: 'الإحرام', subEn: 'Al-Ihram' },
  { term: 'يوم عرفة', subEn: 'Yawm Arafah' },

  // Honorifics (these should be spoken naturally, not spelled out)
  { term: 'صلى الله عليه وسلم', subEn: 'Peace and blessings be upon him' },
  { term: 'عليه السلام', subEn: 'Peace be upon him' },
  { term: 'رضي الله عنه', subEn: 'May Allah be pleased with him' },
  { term: 'رضي الله عنها', subEn: 'May Allah be pleased with her' },
];

/**
 * Apply SSML pronunciation substitutions to text.
 * Wraps heritage terms in <sub> tags for correct TTS pronunciation.
 */
export function applyHeritagePronunciation(text: string, lang: 'ar' | 'en'): string {
  let processed = text;

  for (const entry of HERITAGE_LEXICON) {
    const sub = lang === 'ar' ? entry.subAr : entry.subEn;
    if (!sub) continue;

    // Escape regex special chars in the term
    const escaped = entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    processed = processed.replace(
      new RegExp(escaped, 'g'),
      `<sub alias="${sub}">${entry.term}</sub>`,
    );
  }

  return processed;
}
