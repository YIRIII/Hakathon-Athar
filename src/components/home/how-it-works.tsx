'use client';

import { useTranslations } from 'next-intl';
import { QrCode, BookOpen, Stamp, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {t('howItWorks')}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-primary/30" />
            <span className="size-1.5 rotate-45 bg-primary/50" />
            <span className="h-px w-10 bg-primary/30" />
          </div>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting dotted line — desktop only */}
          <div
            className="pointer-events-none absolute top-14 hidden h-px w-full border-t-2 border-dashed border-primary/20 md:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative flex flex-col items-center text-center">
                {/* Step number circle */}
                <div className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>

                <Card className="w-full border-0 bg-card shadow-none">
                  <CardContent className="flex flex-col items-center gap-3 pt-2">
                    <Icon className="size-8 text-primary" strokeWidth={1.5} />
                    <h3 className="text-base font-semibold text-foreground">
                      {t(step.key)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`${step.key}Desc`)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
