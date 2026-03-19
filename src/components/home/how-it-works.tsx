'use client';

import { useTranslations } from 'next-intl';
import { QrCode, BookOpen, Stamp, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { IslamicDivider } from '@/components/ui/islamic-divider';

const steps = [
  { key: 'step1', icon: QrCode },
  { key: 'step2', icon: BookOpen },
  { key: 'step3', icon: Stamp },
  { key: 'step4', icon: Share2 },
] as const;

export function HowItWorks() {
  const t = useTranslations('home');

  return (
    <section id="how-it-works" className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <AnimateOnScroll variant="fade-up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t('howItWorks')}
            </h2>
            <IslamicDivider className="mt-4" />
          </div>
        </AnimateOnScroll>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting gradient line — desktop only */}
          <div
            className="pointer-events-none absolute top-[1.75rem] hidden h-0.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimateOnScroll key={step.key} variant="fade-up" delay={index * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number circle with gold ring */}
                  <div className="relative z-10 mb-4 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>

                  <Card className="w-full border border-transparent bg-card/80 shadow-none backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                    <CardContent className="flex flex-col items-center gap-3 pt-4">
                      {/* Icon with gradient background circle */}
                      <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/10">
                        <Icon className="size-7 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {t(step.key)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`${step.key}Desc`)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
