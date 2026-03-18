'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { sites } from '@/data/sites';
import { stamps } from '@/data/stamps';

export default function PassportPage() {
  const t = useTranslations('passport');
  const locale = useLocale();

  const earnedStamps = stamps.filter((s) => s.earned);
  const totalSites = stamps.length;
  const earnedCount = earnedStamps.length;
  const progressPercent = Math.round((earnedCount / totalSites) * 100);

  const getSiteForStamp = (siteId: string) => sites.find((s) => s.id === siteId);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleShareCertificate = () => {
    alert(t('comingSoon'));
  };

  // Pick the first earned stamp for the certificate preview
  const certificateSite = earnedStamps[0]
    ? getSiteForStamp(earnedStamps[0].siteId)
    : null;
  const certificateDate = earnedStamps[0]?.earnedAt
    ? formatDate(earnedStamps[0].earnedAt)
    : '';

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
            <span className="text-3xl font-bold text-primary">{earnedCount}</span>
            <span className="text-xs text-muted-foreground">{t('stampsCollected')}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center py-4">
            <span className="text-3xl font-bold text-primary">{earnedCount}</span>
            <span className="text-xs text-muted-foreground">{t('sitesVisited')}</span>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      {/* Stamp Collection */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">{t('stampCollection')}</h2>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {stamps.map((stamp) => {
          const site = getSiteForStamp(stamp.siteId);
          if (!site) return null;

          return (
            <Card
              key={stamp.siteId}
              className={`transition-all ${
                stamp.earned
                  ? 'border-primary/40 ring-2 ring-primary/20'
                  : 'opacity-60 grayscale'
              }`}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                {/* Stamp icon or lock */}
                {stamp.earned ? (
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
                {stamp.earned && stamp.earnedAt ? (
                  <p className="text-[10px] text-muted-foreground">
                    {t('earnedOn')} {formatDate(stamp.earnedAt)}
                  </p>
                ) : (
                  <p className="text-[10px] text-muted-foreground">{t('locked')}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="mb-8" />

      {/* Certificate Preview */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {t('certificatePreview')}
      </h2>

      <div className="mx-auto max-w-sm">
        {/* Certificate card - tall aspect ratio like Instagram Stories */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/5 via-card to-primary/5 ring-2 ring-primary/30">
          {/* Top geometric border */}
          <div className="h-3 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          {/* Decorative corner patterns */}
          <div
            className="pointer-events-none absolute inset-4 border-2 border-primary/20 rounded-xl"
            aria-hidden="true"
          />

          <div className="relative px-6 py-8">
            {/* Top ornament */}
            <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-8 bg-primary/40" />
              <span className="size-2 rotate-45 border border-primary/40" />
              <span className="h-px w-8 bg-primary/40" />
            </div>

            {/* Bismillah ornament */}
            <p className="mb-6 text-center font-serif text-lg text-primary/70">
              &#x2756;
            </p>

            {/* Certificate title */}
            <h3 className="mb-6 text-center text-xl font-bold text-foreground">
              {t('certificateTitle')}
            </h3>

            {/* Subtitle */}
            <p className="mb-2 text-center text-sm text-muted-foreground">
              {t('certificateSubtitle')}
            </p>

            {/* Name */}
            <p className="mb-4 text-center text-lg font-semibold text-primary">
              {t('certificateName')}
            </p>

            {/* Visited */}
            <p className="mb-2 text-center text-sm text-muted-foreground">
              {t('certificateVisited')}
            </p>

            {/* Site name */}
            {certificateSite && (
              <p className="mb-6 text-center text-lg font-bold text-foreground">
                {locale === 'ar' ? certificateSite.name_ar : certificateSite.name_en}
              </p>
            )}

            {/* Date */}
            <div className="mb-6 text-center">
              <p className="text-xs text-muted-foreground">{t('certificateDate')}</p>
              <p className="text-sm font-medium text-foreground">{certificateDate}</p>
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-8 bg-primary/40" />
              <span className="size-2 rotate-45 border border-primary/40" />
              <span className="h-px w-8 bg-primary/40" />
            </div>
          </div>

          {/* Bottom geometric border */}
          <div className="h-3 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
        </div>

        {/* Share button */}
        <Button
          onClick={handleShareCertificate}
          className="mt-4 w-full"
          variant="outline"
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
      </div>
    </div>
  );
}
