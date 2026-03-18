'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sites } from '@/data/sites';

export default function ScanPage() {
  const t = useTranslations('scan');
  const locale = useLocale();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedSite, setScannedSite] = useState<(typeof sites)[0] | null>(null);

  const handleSimulateScan = () => {
    setScanState('scanning');
    // Pick a random site
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    setTimeout(() => {
      setScannedSite(randomSite);
      setScanState('success');
    }, 1500);
  };

  const handleReset = () => {
    setScanState('idle');
    setScannedSite(null);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Page title */}
      <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
        {t('title')}
      </h1>

      {/* Camera viewport placeholder */}
      <div className="relative mx-auto mb-6 aspect-square max-w-sm">
        {/* Dashed border camera area */}
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20" />

        {/* Decorative gold corners */}
        {/* Top-left */}
        <div className="absolute start-0 top-0 h-12 w-12">
          <div className="absolute start-0 top-0 h-full w-1 rounded-full bg-primary" />
          <div className="absolute start-0 top-0 h-1 w-full rounded-full bg-primary" />
        </div>
        {/* Top-right */}
        <div className="absolute end-0 top-0 h-12 w-12">
          <div className="absolute end-0 top-0 h-full w-1 rounded-full bg-primary" />
          <div className="absolute end-0 top-0 h-1 w-full rounded-full bg-primary" />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-0 start-0 h-12 w-12">
          <div className="absolute bottom-0 start-0 h-full w-1 rounded-full bg-primary" />
          <div className="absolute bottom-0 start-0 h-1 w-full rounded-full bg-primary" />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-0 end-0 h-12 w-12">
          <div className="absolute bottom-0 end-0 h-full w-1 rounded-full bg-primary" />
          <div className="absolute bottom-0 end-0 h-1 w-full rounded-full bg-primary" />
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {scanState === 'idle' && (
            <>
              {/* QR icon */}
              <svg
                className="size-16 text-muted-foreground/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                />
              </svg>
              <p className="px-8 text-center text-sm text-muted-foreground">
                {t('instruction')}
              </p>
            </>
          )}

          {scanState === 'scanning' && (
            <>
              {/* Scanning animation */}
              <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm font-medium text-primary">{t('scanning')}</p>
            </>
          )}
        </div>
      </div>

      {/* Scan result */}
      {scanState === 'success' && scannedSite && (
        <Card className="mb-6 border-primary/30">
          <CardHeader className="text-center">
            {/* Success checkmark */}
            <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                className="size-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <CardTitle className="text-lg text-green-700 dark:text-green-400">
              {t('scanSuccess')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-1 text-xl font-bold text-foreground">
              {locale === 'ar' ? scannedSite.name_ar : scannedSite.name_en}
            </p>
            <div className="mb-4 flex items-center justify-center gap-2">
              {/* Stamp icon */}
              <svg
                className="size-5 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <p className="text-sm font-medium text-primary">{t('stampEarned')}</p>
            </div>
            <Link href={`/sites/${scannedSite.id}`}>
              <Button className="w-full">{t('viewSite')}</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Action button */}
      <div className="text-center">
        {scanState === 'idle' && (
          <Button size="lg" onClick={handleSimulateScan} className="w-full max-w-sm">
            {t('simulateScan')}
          </Button>
        )}
        {scanState === 'success' && (
          <Button variant="outline" onClick={handleReset} className="w-full max-w-sm">
            {t('simulateScan')}
          </Button>
        )}
      </div>
    </div>
  );
}
