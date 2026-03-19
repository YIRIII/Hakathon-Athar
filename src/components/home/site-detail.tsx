'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { HeritageSite } from '@/data/sites';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ImageGallery } from '@/components/home/image-gallery';
import { NearbySites } from '@/components/home/nearby-sites';
import { ShareButton } from '@/components/social/share-button';
import { buildShareUrl } from '@/lib/referral';
import { MapPinIcon, QrCodeIcon, ClockIcon, AccessibilityIcon, NavigationIcon } from 'lucide-react';
import { openDirections } from '@/lib/navigation';
import { Link } from '@/i18n/routing';

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
};

/**
 * Atmospheric CSS gradient backgrounds per site type.
 * Light mode uses warm, subtle tones; dark mode uses deeper versions.
 */
const typeBgGradientMap: Record<string, { light: string; dark: string }> = {
  religious: {
    light: 'linear-gradient(135deg, #C8A45C 0%, #E8D5B7 40%, #F5EDE0 70%)',
    dark: 'linear-gradient(135deg, #5C4A28 0%, #3D3020 40%, #1A1410 70%)',
  },
  archaeological: {
    light: 'linear-gradient(135deg, #D4B896 0%, #E8D5B7 35%, #F0E6D4 65%)',
    dark: 'linear-gradient(135deg, #4A3728 0%, #3D3020 35%, #1A1410 65%)',
  },
  cultural: {
    light: 'linear-gradient(135deg, #2D6A4F 0%, #6FCF97 30%, #E6F4EA 60%)',
    dark: 'linear-gradient(135deg, #1A3D2F 0%, #2D4A3F 30%, #1A1410 60%)',
  },
  museum: {
    light: 'linear-gradient(135deg, #6B5744 0%, #B8956A 35%, #EDE3D3 65%)',
    dark: 'linear-gradient(135deg, #2C2218 0%, #4A3728 35%, #1A1410 65%)',
  },
};

// Gradient for hero
const heroGradient = 'from-primary/60 via-accent/30 to-primary/50';

interface SiteDetailProps {
  site: HeritageSite;
}

export function SiteDetail({ site }: SiteDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  const name = isAr ? site.name_ar : site.name_en;
  const brief = isAr ? site.brief_ar : site.brief_en;
  const full = isAr ? site.full_ar : site.full_en;
  const hours = isAr ? site.hours_ar : site.hours;
  const accessibility = isAr ? site.accessibility_ar : site.accessibility;

  const bgGradient = typeBgGradientMap[site.type] ?? typeBgGradientMap.religious;

  function handleGetDirections() {
    openDirections({
      lat: site.coordinates.lat,
      lng: site.coordinates.lng,
      name: isAr ? site.name_ar : site.name_en,
      mode: 'walking',
    });
  }

  return (
    <div className="relative min-h-screen">
      {/* Atmospheric background — light mode */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30 dark:opacity-0"
        style={{ background: bgGradient.light }}
        aria-hidden="true"
      />
      {/* Atmospheric background — dark mode */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-0 dark:opacity-40"
        style={{ background: bgGradient.dark }}
        aria-hidden="true"
      />
      {/* Fade-out overlay: transparent at top, solid background at bottom */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Hero Section */}
        <section className="relative -mx-4 mb-8 overflow-hidden sm:-mx-6 md:mx-0 md:rounded-2xl">
          <div className={`aspect-[21/9] w-full bg-gradient-to-br ${heroGradient}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {name}
              </h1>
            </div>
          </div>
        </section>

        {/* Badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge className={typeColorMap[site.type]}>
            {t(`sites.${site.type}`)}
          </Badge>
          <Badge variant="outline">
            {t(`sites.${site.city}`)}
          </Badge>
        </div>

        {/* Main layout: content + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Left column — main content */}
          <div className="min-w-0 space-y-8">
            {/* Image Gallery */}
            <ImageGallery siteName={name} images={site.images} />

            {/* Narrative Tabs */}
            <div className="rounded-lg bg-card/80 p-4 backdrop-blur-sm sm:p-6">
              <Tabs defaultValue={0}>
                <TabsList>
                  <TabsTrigger value={0}>{t('sites.brief')}</TabsTrigger>
                  <TabsTrigger value={1}>{t('sites.fullStory')}</TabsTrigger>
                </TabsList>
                <TabsContent value={0} className="mt-4">
                  <p className="leading-relaxed text-foreground/90">
                    {brief}
                  </p>
                </TabsContent>
                <TabsContent value={1} className="mt-4">
                  <div className="space-y-4">
                    {full.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Visitor Info Card */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t('sites.visitorInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t('sites.hours')}
                    </p>
                    <p className="text-sm text-muted-foreground">{hours}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <AccessibilityIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t('sites.accessibility')}
                    </p>
                    <p className="text-sm text-muted-foreground">{accessibility}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={handleGetDirections} className="gap-2">
                <NavigationIcon className="size-4" />
                {t('common.getDirections')}
              </Button>
              <Link href="/scan">
                <Button size="lg" variant="outline" className="gap-2 bg-card/80 backdrop-blur-sm">
                  <QrCodeIcon className="size-4" />
                  {t('common.scanQR')}
                </Button>
              </Link>
              <ShareButton
                title={name}
                text={`${name} — ${brief}`}
                url={buildShareUrl(`/${locale}/sites/${site.id}`, { medium: 'site' })}
                siteId={site.id}
                shareType="site"
                size="lg"
                className="gap-2 bg-card/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right column — sidebar */}
          <aside className="space-y-6">
            <NearbySites currentSite={site} />
          </aside>
        </div>
      </div>
    </div>
  );
}
