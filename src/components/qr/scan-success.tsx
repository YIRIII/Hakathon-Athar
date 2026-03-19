'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { HeritageSite } from '@/data/sites';

interface ScanSuccessProps {
  site: HeritageSite;
  /** Called when the user should be navigated to the site page. */
  onNavigate?: () => void;
}

export default function ScanSuccess({ site, onNavigate }: ScanSuccessProps) {
  const t = useTranslations('scan');
  const locale = useLocale();
  const [phase, setPhase] = useState<'ripple' | 'reveal' | 'ready'>('ripple');
  const [alreadyHadStamp, setAlreadyHadStamp] = useState(false);
  const [stampProcessed, setStampProcessed] = useState(false);

  // Earn stamp via Dexie on mount
  useEffect(() => {
    let cancelled = false;
    async function processStamp() {
      if (typeof window === 'undefined') return;
      const { hasStamp, earnStamp } = await import('@/lib/stamp-db');
      const had = await hasStamp(site.id);
      if (cancelled) return;
      setAlreadyHadStamp(had);
      if (!had) {
        await earnStamp(site.id);
      }
      setStampProcessed(true);
    }
    processStamp();
    return () => { cancelled = true; };
  }, [site.id]);

  // Auto-navigate after animation
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 400);
    const t2 = setTimeout(() => setPhase('ready'), 900);
    const t3 = setTimeout(() => onNavigate?.(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onNavigate]);

  return (
    <Card className="mb-6 overflow-hidden border-primary/30">
      <CardHeader className="relative text-center">
        {/* Ripple background */}
        <div className="mx-auto mb-2 flex size-20 items-center justify-center">
          <div className="absolute">
            {/* Ripple rings */}
            <div className="animate-scan-ripple-1 absolute -inset-4 rounded-full border-2 border-primary/30" />
            <div className="animate-scan-ripple-2 absolute -inset-8 rounded-full border-2 border-primary/20" />
            <div className="animate-scan-ripple-3 absolute -inset-12 rounded-full border-2 border-primary/10" />
          </div>
          {/* Gold checkmark circle */}
          <div
            className={`relative flex size-20 items-center justify-center rounded-full bg-primary/10 transition-transform duration-500 ${
              phase !== 'ripple' ? 'scale-100' : 'scale-0'
            }`}
          >
            <svg
              className={`size-10 text-primary transition-all duration-500 ${
                phase !== 'ripple' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        <CardTitle
          className={`text-lg text-primary transition-all duration-500 ${
            phase !== 'ripple' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {t('scanSuccess')}
        </CardTitle>
      </CardHeader>

      <CardContent
        className={`text-center transition-all duration-500 delay-200 ${
          phase === 'ready' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Site name */}
        <p className="mb-1 text-xl font-bold text-foreground">
          {locale === 'ar' ? site.name_ar : site.name_en}
        </p>

        {/* Stamp earned badge */}
        {stampProcessed && !alreadyHadStamp && (
          <div className="mb-4 flex items-center justify-center gap-2">
            <svg
              className="size-5 text-primary animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <p className="text-sm font-medium text-primary">
              {t('stampEarned')}
            </p>
          </div>
        )}

        {stampProcessed && alreadyHadStamp && (
          <p className="mb-4 text-sm text-muted-foreground">
            {t('alreadyVisited')}
          </p>
        )}

        <Link href={`/sites/${site.id}`}>
          <Button className="w-full">{t('viewSite')}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
