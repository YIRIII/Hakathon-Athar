'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { sites } from '@/data/sites';
import type { StampRecord } from '@/lib/stamp-db';

export default function PassportPage() {
  const t = useTranslations('passport');
  const locale = useLocale();

  const [earnedStamps, setEarnedStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [certificateSiteId, setCertificateSiteId] = useState<string | null>(
    null
  );
  const [certificateBlob, setCertificateBlob] = useState<Blob | null>(null);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // Load stamps from Dexie
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;
    async function load() {
      const { getEarnedStamps } = await import('@/lib/stamp-db');
      const stamps = await getEarnedStamps();
      if (!cancelled) {
        setEarnedStamps(stamps);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalSites = sites.length;
  const earnedCount = earnedStamps.length;
  const progressPercent =
    totalSites > 0 ? Math.round((earnedCount / totalSites) * 100) : 0;

  const isEarned = (siteId: string) =>
    earnedStamps.some((s) => s.siteId === siteId);
  const getStamp = (siteId: string) =>
    earnedStamps.find((s) => s.siteId === siteId);

  const formatDate = useCallback(
    (iso: string) => {
      const date = new Date(iso);
      return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
    [locale]
  );

  // Clean up certificate object URL on unmount or change
  useEffect(() => {
    return () => {
      if (certificateUrl) URL.revokeObjectURL(certificateUrl);
    };
  }, [certificateUrl]);

  const handleGenerateCertificate = useCallback(
    async (siteId: string) => {
      setCertificateSiteId(siteId);
      setCertificateDialogOpen(true);
      setGenerating(true);
      setCertificateBlob(null);
      if (certificateUrl) URL.revokeObjectURL(certificateUrl);
      setCertificateUrl(null);

      try {
        const site = sites.find((s) => s.id === siteId);
        const stamp = earnedStamps.find((s) => s.siteId === siteId);
        if (!site || !stamp) return;

        const { generateCertificate } = await import(
          '@/lib/certificate-generator'
        );
        const blob = await generateCertificate({
          visitorName:
            locale === 'ar' ? 'مستكشف التراث' : 'Heritage Explorer',
          siteName: locale === 'ar' ? site.name_ar : site.name_en,
          date: formatDate(stamp.earnedAt),
          locale: locale as 'ar' | 'en',
        });

        setCertificateBlob(blob);
        setCertificateUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error('Certificate generation failed:', err);
      } finally {
        setGenerating(false);
      }
    },
    [earnedStamps, locale, certificateUrl, formatDate]
  );

  const handleDownloadCertificate = useCallback(() => {
    if (!certificateBlob || !certificateSiteId) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(certificateBlob);
    a.download = `athar-certificate-${certificateSiteId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, [certificateBlob, certificateSiteId]);

  const certificateSite = certificateSiteId
    ? sites.find((s) => s.id === certificateSiteId)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Progress section */}
      <div className="mb-8">
        <p className="mb-3 text-sm text-muted-foreground">
          {t('progress', { earned: earnedCount, total: totalSites })}
        </p>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>{totalSites}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center py-4">
            <span className="text-3xl font-bold text-primary">
              {earnedCount}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('stampsCollected')}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center py-4">
            <span className="text-3xl font-bold text-primary">
              {earnedCount}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('sitesVisited')}
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      {/* Stamp Collection */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {t('stampCollection')}
      </h2>

      {loading ? (
        <div className="mb-8 flex items-center justify-center py-12">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {sites.map((site) => {
            const earned = isEarned(site.id);
            const stamp = getStamp(site.id);

            return (
              <Card
                key={site.id}
                className={`transition-all ${
                  earned
                    ? 'border-primary/40 ring-2 ring-primary/20'
                    : 'opacity-60 grayscale'
                }`}
              >
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  {/* Stamp icon or lock */}
                  {earned ? (
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        className="size-6 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                      <svg
                        className="size-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Site name */}
                  <p className="text-xs font-medium leading-tight text-foreground">
                    {locale === 'ar' ? site.name_ar : site.name_en}
                  </p>

                  {/* Earned date or locked text */}
                  {earned && stamp ? (
                    <>
                      <p className="text-[10px] text-muted-foreground">
                        {t('earnedOn')} {formatDate(stamp.earnedAt)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1 h-7 text-[10px]"
                        onClick={() => handleGenerateCertificate(site.id)}
                      >
                        {t('viewCertificate')}
                      </Button>
                    </>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">
                      {t('locked')}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Certificate Dialog */}
      <Dialog
        open={certificateDialogOpen}
        onOpenChange={setCertificateDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('certificatePreview')}</DialogTitle>
            <DialogDescription>
              {certificateSite
                ? locale === 'ar'
                  ? certificateSite.name_ar
                  : certificateSite.name_en
                : ''}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4">
            {generating && (
              <div className="flex items-center justify-center py-12">
                <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}

            {certificateUrl && !generating && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={certificateUrl}
                alt={t('certificateTitle')}
                className="w-full rounded-lg"
                style={{ maxHeight: '60vh', objectFit: 'contain' }}
              />
            )}

            {certificateBlob && !generating && (
              <div className="flex w-full gap-2">
                <Button className="flex-1" onClick={handleDownloadCertificate}>
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  {t('downloadCertificate')}
                </Button>
                {typeof navigator !== 'undefined' && navigator.share && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={async () => {
                      if (!certificateBlob) return;
                      const file = new File(
                        [certificateBlob],
                        `athar-certificate-${certificateSiteId}.png`,
                        { type: 'image/png' }
                      );
                      try {
                        await navigator.share({ files: [file] });
                      } catch {
                        // User cancelled or share failed
                      }
                    }}
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                      />
                    </svg>
                    {t('shareCertificate')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
