export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content_ar: string;
  content_en: string;
}

/**
 * Mock conversation 1: User asks about Cave Hira
 */
export const conversationCaveHira: ChatMessage[] = [
  {
    id: 'msg-1a',
    role: 'user',
    content_ar: 'أخبرني عن غار حراء',
    content_en: 'Tell me about Cave Hira',
  },
  {
    id: 'msg-1b',
    role: 'assistant',
    content_ar:
      'غار حراء هو أحد أهم المواقع الدينية في الإسلام، يقع في قمة جبل النور شمال شرق مكة المكرمة على ارتفاع يقارب 634 مترًا فوق مستوى سطح البحر.\n\nكان النبي محمد صلى الله عليه وسلم يتعبّد في هذا الغار ويخلو فيه بنفسه للتأمل قبل البعثة النبوية. وفي هذا المكان المبارك نزلت أولى آيات القرآن الكريم من سورة العلق: "اقرأ باسم ربك الذي خلق"، وذلك في شهر رمضان عام 610 ميلادي تقريبًا.\n\nيبلغ طول الغار نحو أربعة أمتار وعرضه متر وثلاثة أرباع، ويتطلب الوصول إليه صعودًا جبليًا يستغرق ساعة إلى ساعتين. الموقع مفتوح على مدار الساعة، لكن يُنصح بالصعود في الأوقات المعتدلة تجنبًا لحرارة الشمس.',
    content_en:
      'Cave Hira is one of the most significant religious sites in Islam, located at the summit of Jabal al-Nour (the Mountain of Light), northeast of Makkah, at an elevation of approximately 634 meters above sea level.\n\nThe Prophet Muhammad, peace be upon him, would retreat to this cave for contemplation and worship before the commencement of his prophethood. It was in this blessed place that the first verses of the Quran were revealed from Surah al-Alaq: "Read in the name of your Lord who created," in approximately the month of Ramadan, 610 CE.\n\nThe cave measures roughly four meters in length and one and three-quarter meters in width. Reaching it requires a mountain climb of one to two hours. The site is open around the clock, though visitors are advised to ascend during cooler hours to avoid the midday heat.',
  },
];

/**
 * Mock conversation 2: User asks about important sites in Madinah
 */
export const conversationMadinahSites: ChatMessage[] = [
  {
    id: 'msg-2a',
    role: 'user',
    content_ar: 'ما أهم المواقع التراثية في المدينة المنورة؟',
    content_en: 'What are the most important heritage sites in Madinah?',
  },
  {
    id: 'msg-2b',
    role: 'assistant',
    content_ar:
      'تزخر المدينة المنورة بمواقع تراثية ذات قيمة تاريخية وروحية عظيمة. إليك أبرز هذه المواقع:\n\n1. **مسجد قباء** — أول مسجد بُني في الإسلام، أسسه النبي صلى الله عليه وسلم عند وصوله إلى المدينة. ورد في الحديث أن الصلاة فيه تعدل عمرة.\n\n2. **جبل أحد** — موقع معركة أحد الشهيرة عام 625 ميلادي، ويضم مقبرة شهداء أحد. قال عنه النبي صلى الله عليه وسلم: "أحد جبل يحبنا ونحبه".\n\n3. **مقبرة البقيع** — المقبرة الرئيسية بجوار المسجد النبوي، تضم رفات آلاف الصحابة وأهل بيت النبي صلى الله عليه وسلم.\n\n4. **مسجد القبلتين** — المسجد الذي تحوّلت فيه القبلة من بيت المقدس إلى المسجد الحرام أثناء الصلاة.\n\n5. **موقع الخندق** — مكان حفر الخنادق الدفاعية خلال غزوة الأحزاب، بالقرب من جبل سلع.\n\n6. **دار المدينة** — أول متحف متخصص في تراث المدينة المنورة وتاريخها الحضاري.\n\nأنصحك بالبدء بمسجد قباء وجبل أحد لأهميتهما الدينية البالغة.',
    content_en:
      'Madinah is rich with heritage sites of immense historical and spiritual significance. Here are the most notable:\n\n1. **Quba Mosque** — The first mosque built in Islam, established by the Prophet, peace be upon him, upon his arrival in Madinah. It is reported that praying therein is equivalent in reward to performing an Umrah.\n\n2. **Uhud Mountain** — The site of the famous Battle of Uhud in 625 CE, which includes the Uhud Martyrs\' Cemetery. The Prophet, peace be upon him, said: "Uhud is a mountain that loves us and that we love."\n\n3. **Al-Baqi Cemetery** — The principal cemetery adjacent to the Prophet\'s Mosque, containing the remains of thousands of Companions and members of the Prophet\'s household.\n\n4. **Qiblatain Mosque** — The mosque where the direction of prayer was changed from Jerusalem to the Sacred Mosque in Makkah mid-prayer.\n\n5. **Al-Khandaq Site** — The location where defensive trenches were dug during the Battle of the Confederates, near Jabal Sal\'.\n\n6. **Dar Al Madinah Museum** — The first museum dedicated to the heritage and civilizational history of Madinah.\n\nI recommend beginning with Quba Mosque and Uhud Mountain, given their profound religious significance.',
  },
];

/** All mock conversations for easy iteration */
export const allConversations = [
  conversationCaveHira,
  conversationMadinahSites,
];
