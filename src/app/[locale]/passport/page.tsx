'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { sites } from '@/data/sites';
import { stamps as demoStampsData } from '@/data/stamps';
import type { StampRecord } from '@/lib/stamp-db';
import type { CertificateTemplate } from '@/lib/certificate-generator';

const TEMPLATES: {
  key: CertificateTemplate;
  bg: string;
  accent: string;
  textColor: string;
  label_ar: string;
}[] = [
  {
    key: 'classic',
    bg: 'linear-gradient(135deg, #1a3a2a 0%, #0f2b1e 50%, #1a3a2a 100%)',
    accent: '#C8A45C',
    textColor: '#FFFFFF',
    label_ar: 'كلاسيكي',
  },
  {
    key: 'makkah',
    bg: 'linear-gradient(135deg, #3D2B1A 0%, #2A1D10 50%, #3D2B1A 100%)',
    accent: '#DAA520',
    textColor: '#FFF8E7',
    label_ar: 'مكة المكرمة',
  },
  {
    key: 'madinah',
    bg: 'linear-gradient(135deg, #0D1B2A 0%, #091420 50%, #0D1B2A 100%)',
    accent: '#C0C0C0',
    textColor: '#E8E8E8',
    label_ar: 'المدينة المنورة',
  },
  {
    key: 'modern',
    bg: 'linear-gradient(135deg, #FAFAFA 0%, #F5F0E8 50%, #FAFAFA 100%)',
    accent: '#C8A45C',
    textColor: '#1A1410',
    label_ar: 'عصري',
  },
];

export default function PassportPage() {
  const t = useTranslations('passport');
  const locale = useLocale();

  const [earnedStamps, setEarnedStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [certificateSiteId, setCertificateSiteId] = useState<string | null>(null);
  const [certificateBlob, setCertificateBlob] = useState<Blob | null>(null);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // Template picker state
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate>('classic');
  const [visitorName, setVisitorName] = useState('');
  const [pendingSiteId, setPendingSiteId] = useState<string | null>(null);

  // Load stamps from Dexie, pre-seeding demo stamps if DB is empty
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;
    async function load() {
      const { getEarnedStamps, stampDb } = await import('@/lib/stamp-db');
      let stamps = await getEarnedStamps();

      // Pre-seed demo stamps on first visit so the certificate feature is discoverable
      if (stamps.length === 0) {
        const demoSeeds = demoStampsData.filter((s) => s.earned && s.earnedAt);
        for (const seed of demoSeeds) {
          await stampDb.stamps.put({
            siteId: seed.siteId,
            earnedAt: seed.earnedAt!,
            qrScanned: true,
            synced: false,
          });
        }
        stamps = await getEarnedStamps();
      }

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

  // Show template picker first
  const handleRequestCertificate = (siteId: string) => {
    setPendingSiteId(siteId);
    setSelectedTemplate('classic');
    setVisitorName('');
    setShowTemplatePicker(true);
  };

  const handleGenerateCertificate = useCallback(
    async () => {
      if (!pendingSiteId) return;
      setShowTemplatePicker(false);
      setCertificateSiteId(pendingSiteId);
      setCertificateDialogOpen(true);
      setGenerating(true);
      setCertificateBlob(null);
      if (certificateUrl) URL.revokeObjectURL(certificateUrl);
      setCertificateUrl(null);

      try {
        const site = sites.find((s) => s.id === pendingSiteId);
        const stamp = earnedStamps.find((s) => s.siteId === pendingSiteId);
        if (!site || !stamp) return;

        const { generateCertificate } = await import(
          '@/lib/certificate-generator'
        );
        const name = visitorName.trim() || (locale === 'ar' ? 'مستكشف التراث' : 'Heritage Explorer');
        const blob = await generateCertificate({
          visitorName: name,
          siteName: locale === 'ar' ? site.name_ar : site.name_en,
          date: formatDate(stamp.earnedAt),
          locale: locale as 'ar' | 'en',
          template: selectedTemplate,
        });

        setCertificateBlob(blob);
        setCertificateUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error('Certificate generation failed:', err);
      } finally {
        setGenerating(false);
      }
    },
    [earnedStamps, locale, certificateUrl, formatDate, pendingSiteId, selectedTemplate, visitorName]
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
                        onClick={() => handleRequestCertificate(site.id)}
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

      {/* Template Picker Dialog */}
      <Dialog open={showTemplatePicker} onOpenChange={setShowTemplatePicker}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('chooseTemplate')}</DialogTitle>
            <DialogDescription>
              {pendingSiteId && (() => {
                const s = sites.find((x) => x.id === pendingSiteId);
                return s ? (locale === 'ar' ? s.name_ar : s.name_en) : '';
              })()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name input */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('enterName')}
              </label>
              <Input
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder={locale === 'ar' ? 'مستكشف التراث' : 'Heritage Explorer'}
              />
            </div>

            {/* Template grid */}
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate === tmpl.key;
                return (
                  <button
                    key={tmpl.key}
                    type="button"
                    onClick={() => setSelectedTemplate(tmpl.key)}
                    className={`group relative overflow-hidden rounded-xl border-2 p-3 text-center transition-all ${
                      isSelected
                        ? 'border-transparent shadow-lg scale-[1.02]'
                        : 'border-border hover:border-primary/30 hover:shadow-md'
                    }`}
                    style={isSelected ? { boxShadow: `0 0 0 3px ${tmpl.accent}40, 0 4px 20px ${tmpl.accent}30` } : undefined}
                  >
                    {/* Mini certificate preview */}
                    <div
                      className="relative mx-auto mb-2.5 flex h-24 w-[4.5rem] flex-col items-center justify-between overflow-hidden rounded-lg p-2 shadow-sm transition-transform group-hover:scale-105"
                      style={{ background: tmpl.bg }}
                    >
                      {/* Top ornament line */}
                      <div
                        className="h-px w-8 rounded-full opacity-60"
                        style={{ backgroundColor: tmpl.accent }}
                      />
                      {/* Star icon */}
                      <svg
                        className="size-5 opacity-80"
                        viewBox="0 0 24 24"
                        fill={tmpl.accent}
                      >
                        <path d="M12 2l2.09 4.26L19 7.27l-3.5 3.41.82 4.82L12 13.4l-4.32 2.1.82-4.82L5 7.27l4.91-.71L12 2z" />
                      </svg>
                      {/* Fake text lines */}
                      <div className="flex w-full flex-col items-center gap-0.5">
                        <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: tmpl.accent, opacity: 0.7 }} />
                        <div className="h-[2px] w-6 rounded-full" style={{ backgroundColor: tmpl.textColor, opacity: 0.5 }} />
                        <div className="h-[2px] w-10 rounded-full" style={{ backgroundColor: tmpl.textColor, opacity: 0.4 }} />
                      </div>
                      {/* Bottom ornament line */}
                      <div
                        className="h-px w-6 rounded-full opacity-40"
                        style={{ backgroundColor: tmpl.accent }}
                      />
                    </div>

                    {/* Template name */}
                    <p className={`text-xs font-semibold transition-colors ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {t(`template${tmpl.key.charAt(0).toUpperCase() + tmpl.key.slice(1)}` as any)}
                    </p>

                    {/* Selected check badge */}
                    {isSelected && (
                      <div
                        className="absolute end-1.5 top-1.5 flex size-5 items-center justify-center rounded-full"
                        style={{ backgroundColor: tmpl.accent }}
                      >
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Button className="w-full" onClick={handleGenerateCertificate}>
              {t('downloadCertificate')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Preview Dialog */}
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
