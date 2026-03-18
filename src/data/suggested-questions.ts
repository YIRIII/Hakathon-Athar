export interface SuggestedQuestion {
  id: string;
  text_ar: string;
  text_en: string;
}

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'sq-1',
    text_ar: 'ما قصة نزول الوحي في غار حراء؟',
    text_en: 'What is the story of the first revelation at Cave Hira?',
  },
  {
    id: 'sq-2',
    text_ar: 'ما أهمية مسجد قباء في التاريخ الإسلامي؟',
    text_en: 'What is the significance of Quba Mosque in Islamic history?',
  },
  {
    id: 'sq-3',
    text_ar: 'أخبرني عن معركة أحد وموقعها',
    text_en: 'Tell me about the Battle of Uhud and its site',
  },
  {
    id: 'sq-4',
    text_ar: 'كيف تحوّلت القبلة من القدس إلى مكة؟',
    text_en: 'How was the Qibla changed from Jerusalem to Makkah?',
  },
  {
    id: 'sq-5',
    text_ar: 'من هم أبرز المدفونين في مقبرة البقيع؟',
    text_en: 'Who are the most notable figures buried in Al-Baqi Cemetery?',
  },
  {
    id: 'sq-6',
    text_ar: 'ما الدروس المستفادة من غزوة الخندق؟',
    text_en: 'What lessons can be learned from the Battle of the Trench?',
  },
];
