'use client';

import { useTranslations } from 'next-intl';
import { Map, MessageCircle, Award, QrCode } from 'lucide-react';

const features = [
  { key: 'feature1', Icon: Map },
  { key: 'feature2', Icon: MessageCircle },
  { key: 'feature3', Icon: Award },
  { key: 'feature4', Icon: QrCode },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Title */}
      <h1 className="mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
        {t('title')}
      </h1>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-primary">{t('mission')}</h2>
        <p className="leading-relaxed text-muted-foreground">{t('missionText')}</p>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-primary">{t('vision')}</h2>
        <p className="leading-relaxed text-muted-foreground">{t('visionText')}</p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="mb-8 text-center text-xl font-semibold text-primary">{t('whatWeDo')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <feature.Icon className="size-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {t(`${feature.key}Title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`${feature.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
