'use client';

import { useTranslations } from 'next-intl';
import { Map, Award, MessageCircle } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';

const features = [
  { key: 'explore', Icon: Map },
  { key: 'collect', Icon: Award },
  { key: 'learn', Icon: MessageCircle },
] as const;

export function StatsSection() {
  const t = useTranslations('home.stats');

  return (
    <section className="relative overflow-hidden bg-secondary/50 py-16 md:py-24">
      {/* Subtle Islamic pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(30deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(60deg, rgba(200,164,92,1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,1) 75%),
            linear-gradient(60deg, rgba(200,164,92,1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,1) 75%)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <AnimateOnScroll key={feature.key} variant="scale-up" delay={idx * 0.15}>
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-background/60 p-6 text-center backdrop-blur-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <feature.Icon className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t(`${feature.key}Title`)}
                </h3>
                {/* Gold underline decoration */}
                <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`${feature.key}Desc`)}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
