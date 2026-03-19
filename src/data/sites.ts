export interface HeritageSite {
  id: string;
  name_ar: string;
  name_en: string;
  type: 'religious' | 'archaeological' | 'cultural' | 'museum';
  city: 'makkah' | 'madinah';
  coordinates: { lat: number; lng: number };
  brief_ar: string;
  brief_en: string;
  full_ar: string;
  full_en: string;
  images: string[];
  hours: string;
  hours_ar: string;
  accessibility: string;
  accessibility_ar: string;
  stamp_earned: boolean;
  externalLinks: { label_ar: string; label_en: string; url: string }[];
}

export const sites: HeritageSite[] = [
  // ──────────────────────────── MAKKAH SITES ────────────────────────────
  {
    id: 'cave-hira',
    name_ar: 'غار حراء',
    name_en: 'Cave Hira',
    type: 'religious',
    city: 'makkah',
    coordinates: { lat: 21.4575, lng: 39.8583 },
    brief_ar:
      'غار حراء يقع في جبل النور شمال شرق مكة المكرمة، وهو المكان الذي نزل فيه الوحي لأول مرة على النبي محمد صلى الله عليه وسلم.',
    brief_en:
      'Cave Hira is situated atop Jabal al-Nour, northeast of Makkah. It is the sacred site where the first Quranic revelation was received by the Prophet Muhammad, peace be upon him.',
    full_ar:
      'يُعدّ غار حراء من أبرز المواقع الدينية في الإسلام، إذ يقع على قمة جبل النور على ارتفاع يقارب 634 مترًا فوق مستوى سطح البحر. كان النبي محمد صلى الله عليه وسلم يتعبّد في هذا الغار قبل البعثة النبوية، حيث كان يخلو فيه بنفسه للتأمل والتحنّث لليالٍ ذوات العدد.\n\nفي هذا المكان المبارك نثرت أولى آيات القرآن الكريم من سورة العلق: "اقرأ باسم ربك الذي خلق"، وذلك في شهر رمضان من العام 610 ميلادي تقريبًا. ويُمثّل هذا الحدث بداية الرسالة الإسلامية التي غيّرت مجرى التاريخ البشري.\n\nيبلغ طول الغار نحو أربعة أمتار وعرضه متر وثلاثة أرباع المتر، ويتطلب الوصول إليه صعود درج جبلي وعر يستغرق قرابة ساعة إلى ساعتين. ورغم صعوبة الطريق، يحرص ملايين الزوار سنويًا على الصعود إلى الغار تبرّكًا بالمكان الذي شهد فجر الإسلام.',
    full_en:
      'Cave Hira holds a position of profound significance in Islamic history. Located at the summit of Jabal al-Nour (the Mountain of Light), approximately 634 meters above sea level, this modest cave served as a place of spiritual retreat for the Prophet Muhammad, peace be upon him, in the years preceding his prophethood. He would spend extended periods there in contemplation and devotion, seeking solitude from the society of Makkah.\n\nIt was within this cave, during the month of Ramadan in approximately 610 CE, that the first verses of the Quran were revealed through the Angel Jibreel (Gabriel): "Read in the name of your Lord who created" (Surah al-Alaq, 96:1). This momentous event marked the commencement of the prophetic mission and the dawn of Islam as a world-transforming faith.\n\nThe cave itself is relatively small, measuring roughly four meters in length and one and three-quarter meters in width. Reaching it requires a strenuous climb of approximately one to two hours along a steep, rocky path. Despite the physical challenge, millions of visitors ascend Jabal al-Nour each year, drawn by the desire to stand in the place where divine revelation first descended upon humanity.',
    images: [
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
      'https://images.unsplash.com/photo-1565018054866-968e244671af?w=800&q=80',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Not wheelchair accessible — steep rocky climb required',
    accessibility_ar: 'غير مهيأ لذوي الاحتياجات الخاصة — يتطلب صعودًا وعرًا',
    stamp_earned: true,
    externalLinks: [
      { label_ar: 'غار حراء — ويكيبيديا', label_en: 'Cave Hira — Wikipedia', url: 'https://ar.wikipedia.org/wiki/%D8%BA%D8%A7%D8%B1_%D8%AD%D8%B1%D8%A7%D8%A1' },
      { label_ar: 'جبل النور — ويكيبيديا', label_en: 'Jabal al-Nour — Wikipedia', url: 'https://en.wikipedia.org/wiki/Jabal_al-Nour' },
    ],
  },
  {
    id: 'cave-thawr',
    name_ar: 'غار ثور',
    name_en: 'Cave Thawr',
    type: 'religious',
    city: 'makkah',
    coordinates: { lat: 21.3761, lng: 39.8486 },
    brief_ar:
      'غار ثور يقع في جبل ثور جنوب مكة المكرمة، وهو المكان الذي اختبأ فيه النبي محمد صلى الله عليه وسلم وصاحبه أبو بكر الصديق رضي الله عنه أثناء الهجرة إلى المدينة.',
    brief_en:
      'Cave Thawr is located on Jabal Thawr in southern Makkah. It is the cave where the Prophet Muhammad, peace be upon him, and his companion Abu Bakr al-Siddiq took refuge during the Hijra to Madinah.',
    full_ar:
      'يحتل غار ثور مكانة عظيمة في السيرة النبوية، إذ يقع في جبل ثور على ارتفاع نحو 748 مترًا جنوب مكة المكرمة. في هذا الغار لجأ النبي محمد صلى الله عليه وسلم وصاحبه أبو بكر الصديق رضي الله عنه مدة ثلاث ليالٍ أثناء رحلة الهجرة من مكة إلى المدينة المنورة عام 622 ميلادي.\n\nتُشير المصادر التاريخية إلى أن المشركين طاردوا النبي صلى الله عليه وسلم وصاحبه حتى وصلوا إلى مدخل الغار، غير أن الله سبحانه وتعالى حماهما بقدرته. وقد ورد ذكر هذا الحدث في القرآن الكريم في سورة التوبة: "إذ يقول لصاحبه لا تحزن إن الله معنا".\n\nيبلغ ارتفاع الجبل قرابة 760 مترًا، ويتطلب الوصول إلى الغار صعودًا شاقًا يستغرق نحو ساعة ونصف. يتميز الغار بوجود فتحتين تسمحان بدخول الهواء والضوء. ويُعدّ هذا الموقع شاهدًا حيًّا على التضحية والإيمان في فجر الدعوة الإسلامية.',
    full_en:
      'Cave Thawr occupies an esteemed place in the Prophetic biography (Sirah). Situated on Jabal Thawr at an elevation of approximately 748 meters south of Makkah, this cave served as a critical hiding place during one of the most pivotal events in Islamic history. In 622 CE, the Prophet Muhammad, peace be upon him, accompanied by his closest companion Abu Bakr al-Siddiq, may Allah be pleased with him, sought shelter here for three nights during the Hijra — the migration from Makkah to Madinah.\n\nHistorical sources recount that Qurayshi pursuers tracked the two companions to the very entrance of the cave, yet by divine providence they were not discovered. This event is commemorated in the Quran in Surah al-Tawbah (9:40): "when he said to his companion, Do not grieve; indeed Allah is with us."\n\nThe mountain rises to roughly 760 meters, and reaching the cave requires a demanding climb of approximately ninety minutes over steep, uneven terrain. The cave features two natural openings that allow air and light to enter. Today, Jabal Thawr stands as a living testament to the sacrifices made and the unwavering faith demonstrated at the dawn of the Islamic mission.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
      'https://images.unsplash.com/photo-1545167496-5a4f5a3f0e72?w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Not wheelchair accessible — steep and rugged terrain',
    accessibility_ar: 'غير مهيأ لذوي الاحتياجات الخاصة — تضاريس وعرة وشديدة الانحدار',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'غار ثور — ويكيبيديا', label_en: 'Cave Thawr — Wikipedia', url: 'https://ar.wikipedia.org/wiki/%D8%BA%D8%A7%D8%B1_%D8%AB%D9%88%D8%B1' },
      { label_ar: 'الهجرة النبوية — ويكيبيديا', label_en: 'Hijra — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hijra_(Islam)' },
    ],
  },
  {
    id: 'makkah-museum',
    name_ar: 'متحف مكة المكرمة',
    name_en: 'Makkah Museum',
    type: 'museum',
    city: 'makkah',
    coordinates: { lat: 21.4225, lng: 39.8262 },
    brief_ar:
      'متحف مكة المكرمة يضم مجموعة واسعة من المقتنيات والمعروضات التي تروي تاريخ مكة المكرمة وتراثها الإسلامي العريق عبر العصور.',
    brief_en:
      'Makkah Museum houses an extensive collection of artifacts and exhibits chronicling the history of Makkah and its rich Islamic heritage across the centuries.',
    full_ar:
      'يقع متحف مكة المكرمة في قلب المدينة، ويُعدّ من أبرز المتاحف التراثية في المملكة العربية السعودية. يضم المتحف مجموعة شاملة من المعروضات التي تغطي حقبًا تاريخية متعددة، بدءًا من عصر ما قبل الإسلام مرورًا بفجر الرسالة المحمدية وصولًا إلى العصر الحديث.\n\nتشمل المعروضات قطعًا أثرية نادرة، ومخطوطات إسلامية قيّمة، ونماذج معمارية تُجسّد تطور عمارة المسجد الحرام عبر التاريخ. كما يحتوي المتحف على أقسام مخصصة لشعائر الحج والعمرة، تُقدّم للزائر تجربة تعليمية متكاملة عن هذه الشعائر العظيمة.\n\nيُوفر المتحف بيئة ملائمة لجميع الزوار بما في ذلك ذوي الاحتياجات الخاصة، ويستقبل زواره يوميًا من التاسعة صباحًا حتى التاسعة مساءً. ويُمثّل المتحف محطة ثقافية مهمة لكل من يرغب في التعرف على التاريخ العميق لأقدس بقاع الأرض.',
    full_en:
      'Makkah Museum, situated in the heart of the city, ranks among the most prominent heritage museums in the Kingdom of Saudi Arabia. The museum presents a comprehensive collection of exhibits spanning multiple historical periods, from the pre-Islamic era through the dawn of the Prophetic mission to the modern age.\n\nThe collection includes rare archaeological artifacts, valuable Islamic manuscripts, and architectural models that illustrate the evolution of the Grand Mosque (al-Masjid al-Haram) throughout history. Dedicated sections on the rituals of Hajj and Umrah provide visitors with an immersive educational experience about these sacred rites and their spiritual significance.\n\nThe museum offers a fully accessible environment for all visitors, including those with special needs, and welcomes guests daily from 9:00 AM to 9:00 PM. It serves as an essential cultural destination for anyone seeking to understand the deep history of the holiest site on earth.',
    images: [
      'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80',
    ],
    hours: '9:00 AM – 9:00 PM',
    hours_ar: 'من 9 صباحًا حتى 9 مساءً',
    accessibility: 'Fully wheelchair accessible',
    accessibility_ar: 'مهيأ بالكامل لذوي الاحتياجات الخاصة',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'مكة المكرمة — ويكيبيديا', label_en: 'Makkah — Wikipedia', url: 'https://ar.wikipedia.org/wiki/%D9%85%D9%83%D8%A9_%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9' },
      { label_ar: 'المتاحف في مكة — Visit Saudi', label_en: 'Makkah Museums — Visit Saudi', url: 'https://www.visitsaudi.com/en/see-do/destinations/makkah' },
    ],
  },
  {
    id: 'jabal-al-rahmah',
    name_ar: 'جبل الرحمة',
    name_en: 'Jabal al-Rahmah',
    type: 'religious',
    city: 'makkah',
    coordinates: { lat: 21.3549, lng: 39.9842 },
    brief_ar:
      'جبل الرحمة يقع في سهل عرفات شرق مكة المكرمة، وهو الموقع الذي يقف فيه الحجاج يوم عرفة في أعظم أركان الحج.',
    brief_en:
      'Jabal al-Rahmah (the Mount of Mercy) rises in the plain of Arafat east of Makkah. It is the site where pilgrims gather on the Day of Arafah, the most essential rite of Hajj.',
    full_ar:
      'يُعرف جبل الرحمة أيضًا بجبل عرفات، وهو تلة غرانيتية ترتفع نحو 70 مترًا في وسط سهل عرفات الفسيح. يحمل هذا الموقع أهمية بالغة في الإسلام، إذ يُعدّ الوقوف بعرفة الركن الأعظم من أركان الحج، كما جاء في الحديث النبوي الشريف: "الحج عرفة".\n\nتُشير الروايات الإسلامية إلى أن هذا الموقع هو المكان الذي التقى فيه آدم وحواء عليهما السلام بعد هبوطهما إلى الأرض. كما ألقى النبي محمد صلى الله عليه وسلم خطبة الوداع الشهيرة في هذا السهل المبارك خلال حجة الوداع عام 632 ميلادي، وهي الخطبة التي أرست مبادئ العدالة والمساواة في الإسلام.\n\nفي يوم التاسع من ذي الحجة من كل عام، يتجمع ملايين الحجاج في سهل عرفات من الظهر إلى غروب الشمس في مشهد إيماني مهيب يُعدّ من أعظم التجمعات البشرية على وجه الأرض. ويوجد في قمة الجبل عمود أبيض يُعرف بشاخص عرفات يُميّز الموقع.',
    full_en:
      'Jabal al-Rahmah, also known as the Mount of Arafat, is a granite hill rising approximately 70 meters above the expansive plain of Arafat. This site holds paramount importance in Islam, as standing at Arafat constitutes the most essential pillar of Hajj, as expressed in the Prophetic tradition: "Hajj is Arafah."\n\nIslamic tradition holds that this is the place where Adam and Hawwa (Eve), peace be upon them, were reunited after their descent to earth. Furthermore, it was in this blessed plain that the Prophet Muhammad, peace be upon him, delivered his renowned Farewell Sermon during his final pilgrimage in 632 CE — an address that established enduring principles of justice, equality, and human dignity.\n\nOn the ninth day of Dhul Hijjah each year, millions of pilgrims gather across the plain of Arafat from midday until sunset in a profoundly moving act of collective worship, constituting one of the largest human gatherings on earth. A white pillar known as the Arafat marker stands at the summit of the hill, identifying the location for pilgrims and visitors.',
    images: [
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&q=80',
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      'https://images.unsplash.com/photo-1537031934600-a570fcf26ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
      'https://images.unsplash.com/photo-1565018054866-968e244671af?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Partially accessible — paved paths at base, steep climb to summit',
    accessibility_ar: 'متاح جزئيًا — ممرات معبّدة عند القاعدة، صعود شديد نحو القمة',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'جبل عرفات — ويكيبيديا', label_en: 'Mount Arafat — Wikipedia', url: 'https://en.wikipedia.org/wiki/Mount_Arafat' },
      { label_ar: 'يوم عرفة — ويكيبيديا', label_en: 'Day of Arafah — Wikipedia', url: 'https://en.wikipedia.org/wiki/Day_of_Arafah' },
    ],
  },
  {
    id: 'al-mualla-cemetery',
    name_ar: 'مقبرة المعلاة',
    name_en: 'Al-Mualla Cemetery',
    type: 'archaeological',
    city: 'makkah',
    coordinates: { lat: 21.4307, lng: 39.8275 },
    brief_ar:
      'مقبرة المعلاة هي أقدم وأشهر مقابر مكة المكرمة، تضم رفات عدد من أقارب النبي صلى الله عليه وسلم وصحابته الكرام وكبار علماء المسلمين.',
    brief_en:
      'Al-Mualla Cemetery is the oldest and most renowned burial ground in Makkah, containing the remains of several relatives of the Prophet, peace be upon him, esteemed Companions, and prominent Muslim scholars.',
    full_ar:
      'تُعدّ مقبرة المعلاة من أعرق المقابر في التاريخ الإسلامي، وتقع في الجهة الشمالية من مكة المكرمة بالقرب من المسجد الحرام. يعود تاريخ هذه المقبرة إلى ما قبل الإسلام، وقد ازدادت أهميتها بعد البعثة النبوية لكونها مثوى عدد من أقرب الناس إلى النبي محمد صلى الله عليه وسلم.\n\nمن أبرز المدفونين في المقبرة السيدة خديجة بنت خويلد رضي الله عنها، زوجة النبي صلى الله عليه وسلم الأولى وأول من آمن به من النساء، وكذلك عبد المطلب جد النبي صلى الله عليه وسلم وأبو طالب عمه. كما تضم المقبرة رفات كثير من الصحابة والتابعين والعلماء على مرّ القرون.\n\nتستقبل المقبرة الزوار خلال ساعات النهار، ويمكن الوصول إليها بسهولة من مستوى الشارع. وتمثل المقبرة موقعًا تاريخيًا فريدًا يربط الزائر بالجيل الأول من المسلمين ويُذكّره بالتضحيات التي قدّمها رواد الإسلام الأوائل.',
    full_en:
      'Al-Mualla Cemetery stands as one of the most venerable burial grounds in Islamic history, situated in the northern part of Makkah in proximity to the Grand Mosque. The cemetery predates Islam and gained heightened significance following the Prophetic mission, as it became the resting place of individuals closely connected to the Prophet Muhammad, peace be upon him.\n\nAmong the most notable figures interred here are Lady Khadijah bint Khuwaylid, may Allah be pleased with her — the Prophet\'s first wife and the first woman to embrace Islam — as well as Abd al-Muttalib, the Prophet\'s grandfather, and Abu Talib, his uncle. Over the centuries, the cemetery has also received the remains of numerous Companions, successors (Tabi\'in), and scholars of distinction.\n\nThe cemetery is open to visitors during daylight hours and is accessible at street level. It represents a unique historical site that connects visitors to the earliest generation of Muslims and serves as a poignant reminder of the sacrifices made by the pioneers of the Islamic faith.',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    ],
    hours: 'Daylight hours',
    hours_ar: 'ساعات النهار',
    accessibility: 'Street-level accessible',
    accessibility_ar: 'متاح من مستوى الشارع',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'مقبرة المعلاة — ويكيبيديا', label_en: 'Al-Mualla Cemetery — Wikipedia', url: 'https://en.wikipedia.org/wiki/Jannat_al-Mu%27alla' },
      { label_ar: 'السيدة خديجة — ويكيبيديا', label_en: 'Khadijah bint Khuwaylid — Wikipedia', url: 'https://en.wikipedia.org/wiki/Khadija_bint_Khuwaylid' },
    ],
  },
  {
    id: 'mina-landmarks',
    name_ar: 'مشاعر منى',
    name_en: 'Mina Landmarks',
    type: 'religious',
    city: 'makkah',
    coordinates: { lat: 21.4137, lng: 39.8933 },
    brief_ar:
      'منى هي المشعر المقدس الذي يبيت فيه الحجاج أيام التشريق ويؤدون فيه شعيرة رمي الجمرات، وتضم جسر الجمرات ومخيمات الحجاج.',
    brief_en:
      'Mina is the sacred site where pilgrims stay during the Days of Tashreeq and perform the ritual of stoning the Jamarat pillars. It encompasses the Jamarat Bridge and the vast pilgrim encampments.',
    full_ar:
      'تقع منى في وادٍ ضيق بين مكة المكرمة ومزدلفة، وتُعدّ من أهم المشاعر المقدسة المرتبطة بمناسك الحج. يمتد وادي منى على مساحة تقارب 20 كيلومترًا مربعًا، ويستضيف سنويًا ملايين الحجاج خلال أيام التشريق الثلاثة (الحادي عشر والثاني عشر والثالث عشر من ذي الحجة).\n\nأبرز معالم منى جسر الجمرات الذي أُعيد بناؤه بتصميم هندسي حديث متعدد الطوابق ليستوعب أعدادًا كبيرة من الحجاج بأمان. يرمي الحجاج الجمرات الثلاث — الصغرى والوسطى والكبرى — إحياءً لسنة النبي إبراهيم عليه السلام الذي رجم الشيطان في هذا الموضع وفق الرواية الإسلامية.\n\nتتميز منى بمدينة الخيام البيضاء التي تُنصب لإيواء الحجاج، وهي مجهزة بأنظمة مقاومة للحريق ومرافق خدمية متكاملة. وتُجسّد منى روح التآخي والمساواة في الإسلام، حيث يجتمع المسلمون من جميع أنحاء العالم في مكان واحد لأداء الشعائر ذاتها.',
    full_en:
      'Mina occupies a narrow valley situated between Makkah and Muzdalifah and constitutes one of the most significant sacred sites associated with the rites of Hajj. The valley of Mina extends over an area of approximately 20 square kilometers and annually hosts millions of pilgrims during the three Days of Tashreeq (the 11th, 12th, and 13th of Dhul Hijjah).\n\nThe most prominent landmark in Mina is the Jamarat Bridge, which has been reconstructed with a modern multi-level engineering design to safely accommodate the vast numbers of pilgrims. Pilgrims cast pebbles at three pillars — al-Jamrah al-Sughra (the smallest), al-Jamrah al-Wusta (the middle), and al-Jamrah al-Kubra (the largest) — reenacting the tradition of the Prophet Ibrahim (Abraham), peace be upon him, who stoned the devil at this location according to Islamic tradition.\n\nMina is characterized by its expansive city of white tents erected to shelter pilgrims, equipped with fire-resistant systems and comprehensive service facilities. The site embodies the Islamic principles of brotherhood and equality, as Muslims from every corner of the globe converge in one place to perform the same sacred rites.',
    images: [
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&q=80',
      'https://images.unsplash.com/photo-1537031934600-a570fcf26ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1545167496-5a4f5a3f0e72?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=800&q=80',
    ],
    hours: 'Open during Hajj season',
    hours_ar: 'مفتوح خلال موسم الحج',
    accessibility: 'Accessible — modern infrastructure with ramps and elevators',
    accessibility_ar: 'مهيأ للوصول — بنية تحتية حديثة مع منحدرات ومصاعد',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'منى — ويكيبيديا', label_en: 'Mina — Wikipedia', url: 'https://en.wikipedia.org/wiki/Mina,_Saudi_Arabia' },
      { label_ar: 'رمي الجمرات — ويكيبيديا', label_en: 'Stoning of the Devil — Wikipedia', url: 'https://en.wikipedia.org/wiki/Stoning_of_the_Devil' },
    ],
  },

  // ──────────────────────────── MADINAH SITES ────────────────────────────
  {
    id: 'quba-mosque',
    name_ar: 'مسجد قباء',
    name_en: 'Quba Mosque',
    type: 'religious',
    city: 'madinah',
    coordinates: { lat: 24.4397, lng: 39.6172 },
    brief_ar:
      'مسجد قباء هو أول مسجد أُسّس في الإسلام، بناه النبي محمد صلى الله عليه وسلم عند وصوله إلى المدينة المنورة مهاجرًا من مكة.',
    brief_en:
      'Quba Mosque is the first mosque ever established in Islam, built by the Prophet Muhammad, peace be upon him, upon his arrival in Madinah during the Hijra from Makkah.',
    full_ar:
      'يحتل مسجد قباء مكانة فريدة في التاريخ الإسلامي بوصفه أول مسجد بُني في الإسلام. أسسه النبي محمد صلى الله عليه وسلم عند وصوله إلى ضاحية قباء جنوب المدينة المنورة في ربيع الأول من السنة الأولى للهجرة (622 ميلادي)، قبل أن يواصل طريقه إلى وسط المدينة.\n\nوردت فضائل هذا المسجد في القرآن الكريم والسنة النبوية، إذ يُشار إلى أنه المسجد الذي "أُسّس على التقوى من أول يوم" كما جاء في سورة التوبة. وكان النبي صلى الله عليه وسلم يزور مسجد قباء كل سبت راكبًا أو ماشيًا، وذكر أن الصلاة فيه تعدل عمرة.\n\nشهد المسجد توسعات متعددة عبر التاريخ الإسلامي، وخضع لمشروع توسعة ضخم في عهد خادم الحرمين الشريفين. يتميز المسجد بتصميمه المعماري الأنيق بقبابه البيضاء ومآذنه الشامخة، ويستقبل المصلين والزوار على مدار الساعة. ويُعدّ من أكثر المواقع زيارةً في المدينة المنورة بعد المسجد النبوي الشريف.',
    full_en:
      'Quba Mosque holds a singular distinction in Islamic history as the first mosque ever constructed in Islam. It was founded by the Prophet Muhammad, peace be upon him, upon his arrival at the suburb of Quba, south of Madinah, in the month of Rabi al-Awwal of the first year of the Hijra (622 CE), before he continued his journey to the center of the city.\n\nThe virtues of this mosque are established in both the Quran and the Prophetic traditions. It is widely identified as the mosque "founded on piety from the first day," as referenced in Surah al-Tawbah (9:108). The Prophet, peace be upon him, would visit Quba Mosque every Saturday, whether riding or on foot, and stated that praying therein is equivalent in reward to performing an Umrah.\n\nThe mosque has undergone numerous expansions throughout Islamic history, including a major expansion project under the Custodian of the Two Holy Mosques. Distinguished by its elegant architectural design featuring white domes and soaring minarets, the mosque welcomes worshippers and visitors around the clock. It stands as one of the most frequently visited sites in Madinah after the Prophet\'s Mosque itself.',
    images: [
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80',
      'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=800&q=80',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Fully wheelchair accessible',
    accessibility_ar: 'مهيأ بالكامل لذوي الاحتياجات الخاصة',
    stamp_earned: true,
    externalLinks: [
      { label_ar: 'مسجد قباء — ويكيبيديا', label_en: 'Quba Mosque — Wikipedia', url: 'https://en.wikipedia.org/wiki/Quba_Mosque' },
      { label_ar: 'مسجد قباء — Visit Saudi', label_en: 'Quba Mosque — Visit Saudi', url: 'https://www.visitsaudi.com/en/see-do/destinations/madinah' },
    ],
  },
  {
    id: 'al-baqi-cemetery',
    name_ar: 'مقبرة البقيع',
    name_en: 'Al-Baqi Cemetery',
    type: 'archaeological',
    city: 'madinah',
    coordinates: { lat: 24.4677, lng: 39.6138 },
    brief_ar:
      'مقبرة البقيع هي المقبرة الرئيسية في المدينة المنورة، تقع بجوار المسجد النبوي وتضم رفات آلاف الصحابة وأهل بيت النبي صلى الله عليه وسلم.',
    brief_en:
      'Al-Baqi Cemetery is the principal burial ground of Madinah, located adjacent to the Prophet\'s Mosque. It contains the remains of thousands of Companions and members of the Prophet\'s household, peace be upon him.',
    full_ar:
      'تُعدّ مقبرة البقيع، المعروفة أيضًا ببقيع الغرقد، من أقدس المقابر في العالم الإسلامي. تقع في الجهة الجنوبية الشرقية من المسجد النبوي الشريف في المدينة المنورة، وتمتد على مساحة واسعة تضم رفات ما يُقدّر بعشرات الآلاف من المسلمين الأوائل.\n\nيرقد في البقيع عدد كبير من أهل بيت النبي صلى الله عليه وسلم وصحابته الكرام، منهم عثمان بن عفان رضي الله عنه ثالث الخلفاء الراشدين، والعباس بن عبد المطلب عم النبي صلى الله عليه وسلم، والحسن بن علي رضي الله عنهما، وعدد من أمهات المؤمنين وبنات النبي صلى الله عليه وسلم.\n\nكانت المقبرة تضم بناءات وقباب عديدة فوق القبور عبر التاريخ، إلا أنها أُزيلت لاحقًا. يُفتح البقيع للزوار بعد الصلوات، ويمكن الوصول إليه بسهولة من مستوى الشارع. ويحرص زوار المدينة المنورة على زيارة البقيع اقتداءً بسنة النبي صلى الله عليه وسلم الذي كان يزور أهل البقيع ويدعو لهم.',
    full_en:
      'Al-Baqi Cemetery, also known as Baqi al-Gharqad, ranks among the most sacred burial grounds in the Islamic world. Located to the southeast of the Prophet\'s Mosque in Madinah, it extends over a substantial area containing the remains of an estimated tens of thousands of early Muslims.\n\nAmong the most notable figures resting in al-Baqi are Uthman ibn Affan, may Allah be pleased with him, the third Rightly Guided Caliph; al-Abbas ibn Abd al-Muttalib, the Prophet\'s uncle; al-Hasan ibn Ali, may Allah be pleased with them; and several of the Mothers of the Believers and daughters of the Prophet, peace be upon him.\n\nHistorically, the cemetery featured numerous structures and domes over the graves, which were later removed. Al-Baqi is open to visitors after prayer times and is accessible at street level. Visitors to Madinah customarily include al-Baqi in their itinerary, following the practice of the Prophet, peace be upon him, who would visit the people of al-Baqi and supplicate for them.',
    images: [
      'https://images.unsplash.com/photo-1545167496-5a4f5a3f0e72?w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
      'https://images.unsplash.com/photo-1565018054866-968e244671af?w=800&q=80',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
      'https://images.unsplash.com/photo-1537031934600-a570fcf26ffa?w=800&q=80',
    ],
    hours: 'After prayer times',
    hours_ar: 'بعد أوقات الصلاة',
    accessibility: 'Street-level accessible',
    accessibility_ar: 'متاح من مستوى الشارع',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'البقيع — ويكيبيديا', label_en: 'Al-Baqi Cemetery — Wikipedia', url: 'https://en.wikipedia.org/wiki/Al-Baqi%27' },
      { label_ar: 'الصحابة المدفونون في البقيع', label_en: 'Companions buried at Al-Baqi', url: 'https://ar.wikipedia.org/wiki/%D8%A8%D9%82%D9%8A%D8%B9_%D8%A7%D9%84%D8%BA%D8%B1%D9%82%D8%AF' },
    ],
  },
  {
    id: 'uhud-mountain',
    name_ar: 'جبل أحد',
    name_en: 'Uhud Mountain',
    type: 'religious',
    city: 'madinah',
    coordinates: { lat: 24.5064, lng: 39.6144 },
    brief_ar:
      'جبل أحد يقع شمال المدينة المنورة، وهو موقع غزوة أحد الشهيرة في السنة الثالثة للهجرة، ويضم مقبرة شهداء أحد.',
    brief_en:
      'Uhud Mountain lies north of Madinah and is the site of the renowned Battle of Uhud in the third year of Hijra. It includes the Uhud Martyrs\' Cemetery.',
    full_ar:
      'يُعدّ جبل أحد من أبرز المعالم الطبيعية والتاريخية في المدينة المنورة، إذ يمتد بطول سبعة كيلومترات تقريبًا ويرتفع نحو 1077 مترًا فوق مستوى سطح البحر. يحمل هذا الجبل مكانة خاصة في قلوب المسلمين، وقد ورد في الحديث النبوي الشريف: "أحد جبل يحبنا ونحبه".\n\nفي شوال من السنة الثالثة للهجرة (625 ميلادي) وقعت عند سفح هذا الجبل معركة أحد، وهي ثاني معركة كبرى في تاريخ الإسلام بعد بدر. شارك في المعركة النبي صلى الله عليه وسلم بنفسه وأُصيب فيها، واستُشهد فيها سبعون من الصحابة الكرام، في مقدمتهم حمزة بن عبد المطلب رضي الله عنه عم النبي صلى الله عليه وسلم الملقّب بأسد الله.\n\nيقع عند سفح الجبل مقبرة شهداء أحد التي تضم رفات الشهداء السبعين. ويزور هذا الموقع سنويًا أعداد كبيرة من المسلمين للتأمل في دروس هذه المعركة والدعاء للشهداء. ويُوفّر الموقع ممرات معبّدة في الأجزاء السفلية تُسهّل الوصول جزئيًا.',
    full_en:
      'Uhud Mountain stands as one of the most prominent natural and historical landmarks in Madinah, stretching approximately seven kilometers in length and rising to about 1,077 meters above sea level. The mountain holds a special place in the hearts of Muslims, as expressed in the Prophetic tradition: "Uhud is a mountain that loves us and that we love."\n\nIn the month of Shawwal of the third year of Hijra (625 CE), the Battle of Uhud took place at the foot of this mountain — the second major military engagement in Islamic history after the Battle of Badr. The Prophet Muhammad, peace be upon him, participated personally and was wounded during the battle. Seventy Companions were martyred, foremost among them Hamzah ibn Abd al-Muttalib, may Allah be pleased with him, the Prophet\'s uncle known as the Lion of God.\n\nAt the base of the mountain lies the Uhud Martyrs\' Cemetery, containing the remains of the seventy martyrs. The site attracts large numbers of Muslim visitors annually who come to reflect on the lessons of this battle and offer supplications for the martyrs. Paved pathways in the lower sections of the site provide partial accessibility for visitors.',
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&q=80',
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Partially accessible — paved paths at base level',
    accessibility_ar: 'متاح جزئيًا — ممرات معبّدة عند مستوى القاعدة',
    stamp_earned: true,
    externalLinks: [
      { label_ar: 'غزوة أحد — ويكيبيديا', label_en: 'Battle of Uhud — Wikipedia', url: 'https://en.wikipedia.org/wiki/Battle_of_Uhud' },
      { label_ar: 'جبل أحد — ويكيبيديا', label_en: 'Mount Uhud — Wikipedia', url: 'https://en.wikipedia.org/wiki/Mount_Uhud' },
    ],
  },
  {
    id: 'qiblatain-mosque',
    name_ar: 'مسجد القبلتين',
    name_en: 'Qiblatain Mosque',
    type: 'religious',
    city: 'madinah',
    coordinates: { lat: 24.4803, lng: 39.5922 },
    brief_ar:
      'مسجد القبلتين هو المسجد الذي تحوّلت فيه قبلة المسلمين من بيت المقدس إلى المسجد الحرام في مكة المكرمة أثناء الصلاة.',
    brief_en:
      'Qiblatain Mosque is the mosque where the direction of prayer (Qibla) was changed from Jerusalem to the Sacred Mosque in Makkah during a congregational prayer.',
    full_ar:
      'يتميز مسجد القبلتين بمكانة تاريخية فريدة في الإسلام، إذ شهد حدثًا محوريًا غيّر وجه العبادة الإسلامية إلى الأبد. يقع المسجد في الجهة الشمالية الغربية من المدينة المنورة، وسُمّي بهذا الاسم لأنه المسجد الوحيد الذي صلّى فيه المسلمون تجاه قبلتين مختلفتين في صلاة واحدة.\n\nففي شهر رجب أو شعبان من السنة الثانية للهجرة (624 ميلادي تقريبًا)، وأثناء صلاة الظهر، نزل الأمر الإلهي بتحويل القبلة من بيت المقدس إلى المسجد الحرام في مكة المكرمة، كما ورد في سورة البقرة: "فولّ وجهك شطر المسجد الحرام". فاستدار المصلون من اتجاه القدس إلى اتجاه مكة أثناء الصلاة ذاتها.\n\nخضع المسجد لعمليات ترميم وتوسعة عديدة، أحدثها في عهد خادم الحرمين الشريفين، حيث أصبح تحفة معمارية تجمع بين الأصالة والحداثة. يتميز المسجد بقبتيه المتجاورتين اللتين ترمزان إلى القبلتين. وهو مهيأ بالكامل لذوي الاحتياجات الخاصة ويستقبل المصلين في أوقات الصلاة.',
    full_en:
      'Qiblatain Mosque possesses a uniquely distinguished place in Islamic history, having witnessed a pivotal event that permanently altered the direction of Islamic worship. Located in the northwestern part of Madinah, the mosque derives its name — meaning "the Mosque of the Two Qiblas" — from being the only mosque where Muslims prayed toward two different directions in a single prayer.\n\nIn the month of Rajab or Sha\'ban of the second year of Hijra (approximately 624 CE), during the Dhuhr (noon) prayer, the divine command was revealed to change the Qibla from Jerusalem (Bayt al-Maqdis) to the Sacred Mosque in Makkah, as stated in Surah al-Baqarah (2:144): "So turn your face toward al-Masjid al-Haram." The worshippers turned mid-prayer from facing Jerusalem to facing Makkah.\n\nThe mosque has undergone several restorations and expansions, most recently under the Custodian of the Two Holy Mosques, transforming it into an architectural masterpiece that blends tradition with modernity. The mosque is distinguished by its two adjacent domes, symbolizing the two Qiblas. It is fully accessible for visitors with special needs and welcomes worshippers during prayer times.',
    images: [
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      'https://images.unsplash.com/photo-1545167496-5a4f5a3f0e72?w=800&q=80',
    ],
    hours: 'Prayer times',
    hours_ar: 'أوقات الصلاة',
    accessibility: 'Fully wheelchair accessible',
    accessibility_ar: 'مهيأ بالكامل لذوي الاحتياجات الخاصة',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'مسجد القبلتين — ويكيبيديا', label_en: 'Qiblatain Mosque — Wikipedia', url: 'https://en.wikipedia.org/wiki/Masjid_al-Qiblatayn' },
      { label_ar: 'تحويل القبلة — ويكيبيديا', label_en: 'Change of Qibla — Wikipedia', url: 'https://en.wikipedia.org/wiki/Qibla#Change_of_direction' },
    ],
  },
  {
    id: 'dar-al-madinah-museum',
    name_ar: 'دار المدينة',
    name_en: 'Dar Al Madinah Museum',
    type: 'museum',
    city: 'madinah',
    coordinates: { lat: 24.4753, lng: 39.6103 },
    brief_ar:
      'دار المدينة هو أول متحف متخصص في تراث المدينة المنورة وتاريخها الحضاري، يعرض مقتنيات نادرة ونماذج معمارية توثّق تطور المدينة عبر القرون.',
    brief_en:
      'Dar Al Madinah is the first museum dedicated to the heritage and civilizational history of Madinah, featuring rare artifacts and architectural models documenting the city\'s evolution over centuries.',
    full_ar:
      'يُعدّ متحف دار المدينة أول وأكبر متحف متخصص في التراث المديني، ويقع في حي العنبرية بالمدينة المنورة. أُسّس المتحف بهدف حفظ وتوثيق التراث الغني للمدينة المنورة وتقديمه للأجيال المعاصرة بأسلوب تعليمي تفاعلي.\n\nيضم المتحف مجموعة فريدة من المعروضات تشمل نماذج مصغرة للمسجد النبوي في مراحل تطوره المختلفة، ومقتنيات أثرية تعود لعصور إسلامية متعددة، وصور تاريخية نادرة للمدينة المنورة، فضلًا عن أدوات الحياة اليومية التي كان يستخدمها سكان المدينة قديمًا. كما يحتوي على قسم مخصص لعرض الحِرف والصناعات التقليدية المدينية.\n\nيستقبل المتحف زواره في فترتين: صباحية من التاسعة حتى الثانية عشرة ظهرًا، ومسائية من الخامسة حتى التاسعة مساءً. وهو مهيأ بالكامل لذوي الاحتياجات الخاصة ويُقدّم جولات إرشادية بعدة لغات. ويُمثّل المتحف وجهة مثالية لمن يرغب في فهم التحولات الحضارية التي شهدتها المدينة المنورة منذ العصر النبوي وحتى العصر الحديث.',
    full_en:
      'Dar Al Madinah Museum stands as the first and largest museum dedicated to Madinah\'s heritage, located in the al-Anbariyyah district of the city. The museum was established with the mission of preserving and documenting the rich heritage of Madinah and presenting it to contemporary audiences through an interactive educational approach.\n\nThe museum houses a remarkable collection of exhibits, including miniature models of the Prophet\'s Mosque at various stages of its historical development, archaeological artifacts from multiple Islamic eras, rare historical photographs of Madinah, and everyday tools and implements used by the city\'s inhabitants in centuries past. A dedicated section showcases traditional Madinan crafts and industries.\n\nThe museum welcomes visitors in two sessions: mornings from 9:00 AM to 12:00 PM, and evenings from 5:00 PM to 9:00 PM. It is fully accessible for visitors with special needs and offers guided tours in multiple languages. The museum serves as an ideal destination for those wishing to understand the civilizational transformations Madinah has undergone from the Prophetic era to the modern age.',
    images: [
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
      'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=800&q=80',
    ],
    hours: '9:00 AM – 12:00 PM, 5:00 PM – 9:00 PM',
    hours_ar: 'من 9 صباحًا حتى 12 ظهرًا، ومن 5 مساءً حتى 9 مساءً',
    accessibility: 'Fully wheelchair accessible',
    accessibility_ar: 'مهيأ بالكامل لذوي الاحتياجات الخاصة',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'المدينة المنورة — Visit Saudi', label_en: 'Madinah — Visit Saudi', url: 'https://www.visitsaudi.com/en/see-do/destinations/madinah' },
      { label_ar: 'المدينة المنورة — ويكيبيديا', label_en: 'Medina — Wikipedia', url: 'https://en.wikipedia.org/wiki/Medina' },
    ],
  },
  {
    id: 'al-khandaq',
    name_ar: 'موقع الخندق',
    name_en: 'Al-Khandaq',
    type: 'archaeological',
    city: 'madinah',
    coordinates: { lat: 24.4894, lng: 39.6022 },
    brief_ar:
      'موقع الخندق هو المكان الذي حُفرت فيه الخنادق الدفاعية حول المدينة المنورة خلال غزوة الأحزاب في السنة الخامسة للهجرة.',
    brief_en:
      'Al-Khandaq marks the site where defensive trenches were dug around Madinah during the Battle of the Trench (Confederates) in the fifth year of Hijra.',
    full_ar:
      'يقع موقع الخندق في الجهة الشمالية الغربية من المدينة المنورة، بالقرب من جبل سلع. يُخلّد هذا الموقع ذكرى غزوة الخندق — المعروفة أيضًا بغزوة الأحزاب — التي وقعت في شوال من السنة الخامسة للهجرة (627 ميلادي)، وتُعدّ من أخطر المواجهات العسكرية في تاريخ الإسلام المبكر.\n\nجاءت فكرة حفر الخندق من الصحابي سلمان الفارسي رضي الله عنه الذي اقترح على النبي صلى الله عليه وسلم هذا الأسلوب الدفاعي الذي لم يكن معروفًا عند العرب آنذاك. فحُفر خندق عميق في الجهة الشمالية المكشوفة من المدينة لمنع جيوش الأحزاب المتحالفة — التي بلغ تعدادها نحو عشرة آلاف مقاتل — من اقتحام المدينة.\n\nنجحت هذه الاستراتيجية في إرباك الأحزاب وإفشال حصارهم الذي دام قرابة شهر، وانسحبوا في نهاية المطاف دون تحقيق هدفهم. يُعدّ الموقع اليوم منطقة مفتوحة يمكن زيارتها على مدار الساعة، وتُوجد بالقرب منه عدة مساجد صغيرة تُعرف بمساجد الفتح. ويُمثّل الموقع درسًا تاريخيًا حيًّا في الابتكار والتخطيط الاستراتيجي.',
    full_en:
      'The Al-Khandaq site is located in the northwestern part of Madinah, near Jabal Sal\'. It commemorates the Battle of the Trench — also known as the Battle of the Confederates (Ghazwat al-Ahzab) — which took place in Shawwal of the fifth year of Hijra (627 CE) and stands as one of the most critical military confrontations in early Islamic history.\n\nThe concept of digging the trench originated with the Companion Salman al-Farisi (the Persian), may Allah be pleased with him, who suggested this defensive technique — previously unknown among the Arabs — to the Prophet Muhammad, peace be upon him. A deep trench was excavated along the exposed northern approach to Madinah to prevent the allied Confederate forces, numbering approximately ten thousand fighters, from breaching the city\'s defenses.\n\nThis strategy proved successful in confounding the Confederates and thwarting their siege, which lasted nearly a month, ultimately forcing their withdrawal without achieving their objective. Today, the site is an open area accessible around the clock, with several small mosques nearby known as the Mosques of Victory (Masajid al-Fath). The site stands as a living historical lesson in innovation and strategic planning.',
    images: [
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
      'https://images.unsplash.com/photo-1565018054866-968e244671af?w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&q=80',
    ],
    hours: 'Open 24 hours',
    hours_ar: 'مفتوح على مدار الساعة',
    accessibility: 'Open area — generally accessible',
    accessibility_ar: 'منطقة مفتوحة — متاحة بشكل عام',
    stamp_earned: false,
    externalLinks: [
      { label_ar: 'غزوة الخندق — ويكيبيديا', label_en: 'Battle of the Trench — Wikipedia', url: 'https://en.wikipedia.org/wiki/Battle_of_the_Trench' },
      { label_ar: 'سلمان الفارسي — ويكيبيديا', label_en: 'Salman al-Farisi — Wikipedia', url: 'https://en.wikipedia.org/wiki/Salman_the_Persian' },
    ],
  },
];
