'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface TimelineEvent {
  year_ar: string;
  year_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  siteId?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year_ar: '٦١٠ م',
    year_en: '610 CE',
    title_ar: 'بدء الوحي في غار حراء',
    title_en: 'First Revelation at Cave Hira',
    description_ar: 'نزلت أولى آيات القرآن الكريم على النبي محمد ﷺ في غار حراء بجبل النور، لتبدأ رسالة الإسلام التي غيّرت مجرى التاريخ.',
    description_en: 'The first verses of the Quran were revealed to Prophet Muhammad ﷺ in Cave Hira atop Jabal al-Nour, marking the dawn of Islam.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80',
    siteId: 'cave-hira',
  },
  {
    year_ar: '٦٢٢ م',
    year_en: '622 CE',
    title_ar: 'الهجرة النبوية وغار ثور',
    title_en: 'The Hijra & Cave Thawr',
    description_ar: 'لجأ النبي ﷺ وصاحبه أبو بكر رضي الله عنه إلى غار ثور ثلاث ليالٍ أثناء الهجرة من مكة إلى المدينة.',
    description_en: 'The Prophet ﷺ and Abu Bakr took refuge in Cave Thawr for three nights during the momentous migration from Makkah to Madinah.',
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80',
    siteId: 'cave-thawr',
  },
  {
    year_ar: '٦٢٢ م',
    year_en: '622 CE',
    title_ar: 'بناء مسجد قباء — أول مسجد في الإسلام',
    title_en: 'Quba Mosque — The First Mosque in Islam',
    description_ar: 'عند وصوله إلى المدينة، أسّس النبي ﷺ مسجد قباء ليكون أول مسجد يُبنى في الإسلام.',
    description_en: 'Upon arriving in Madinah, the Prophet ﷺ established Quba Mosque — the very first mosque built in Islamic history.',
    image: 'https://images.unsplash.com/photo-1545167496-5a4f5a3f0e72?w=600&q=80',
    siteId: 'quba-mosque',
  },
  {
    year_ar: '٦٢٤ م',
    year_en: '624 CE',
    title_ar: 'تحويل القبلة في مسجد القبلتين',
    title_en: 'The Qibla Changed at Qiblatain Mosque',
    description_ar: 'نزل الأمر الإلهي بتحويل القبلة من بيت المقدس إلى المسجد الحرام أثناء الصلاة، في لحظة فارقة بتاريخ الإسلام.',
    description_en: 'The divine command changed the prayer direction from Jerusalem to Makkah mid-prayer — a defining moment in Islamic history.',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c159?w=600&q=80',
    siteId: 'qiblatain-mosque',
  },
  {
    year_ar: '٦٢٥ م',
    year_en: '625 CE',
    title_ar: 'غزوة أحد عند جبل أحد',
    title_en: 'Battle of Uhud at Mount Uhud',
    description_ar: 'عند سفح جبل أحد، وقعت ثاني المعارك الكبرى في الإسلام واستُشهد سبعون صحابيًا، في مقدمتهم حمزة بن عبد المطلب.',
    description_en: 'At the foot of Mount Uhud, seventy companions were martyred in the second major battle, including Hamzah, the Lion of God.',
    image: 'https://images.unsplash.com/photo-1565018054866-968e244671af?w=600&q=80',
    siteId: 'uhud-mountain',
  },
  {
    year_ar: '٦٢٧ م',
    year_en: '627 CE',
    title_ar: 'غزوة الخندق — الابتكار في الدفاع',
    title_en: 'Battle of the Trench — Innovation in Defense',
    description_ar: 'بفكرة من سلمان الفارسي، حُفر خندق دفاعي أحبط حصار عشرة آلاف مقاتل من الأحزاب المتحالفة.',
    description_en: 'On Salman al-Farisi\'s suggestion, a defensive trench was dug that thwarted the siege of 10,000 Confederate fighters.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80',
    siteId: 'al-khandaq',
  },
];

export function HeritageTimeline() {
  const t = useTranslations('home');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {t('timelineTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {t('timelineSubtitle')}
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-primary/30" />
            <span className="size-1.5 rotate-45 bg-primary/50" />
            <span className="h-px w-10 bg-primary/30" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute start-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:start-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute start-4 z-10 flex size-3 -translate-x-[5px] items-center justify-center md:start-1/2 md:-translate-x-1.5">
                    <div className="size-3 rounded-full bg-primary shadow-md shadow-primary/30" />
                    <div className="absolute size-6 animate-ping rounded-full bg-primary/20 [animation-duration:3s]" style={{ animationDelay: `${idx * 500}ms` }} />
                  </div>

                  {/* Content */}
                  <div className={`ms-10 w-full md:ms-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:me-auto md:pe-8' : 'md:ms-auto md:ps-8'}`}>
                    <div className="group rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/5 transition-all duration-300 hover:shadow-md hover:ring-primary/20">
                      {/* Year badge */}
                      <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {isAr ? event.year_ar : event.year_en}
                      </div>

                      {/* Image */}
                      <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                          src={event.image}
                          alt={isAr ? event.title_ar : event.title_en}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      <h3 className="mb-1.5 text-base font-bold text-foreground">
                        {isAr ? event.title_ar : event.title_en}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {isAr ? event.description_ar : event.description_en}
                      </p>

                      {event.siteId && (
                        <Link
                          href={`/sites/${event.siteId}`}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          {isAr ? 'اكتشف الموقع' : 'Explore site'}
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
