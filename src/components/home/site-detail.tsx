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
import { MapPinIcon, QrCodeIcon, ClockIcon, AccessibilityIcon } from 'lucide-react';

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
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

  function handleComingSoon() {
    alert(t('common.comingSoon'));
  }

  return (
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

          {/* Visitor Info Card */}
          <Card>
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
            <Button size="lg" onClick={handleComingSoon} className="gap-2">
              <MapPinIcon className="size-4" />
              {t('common.getDirections')}
            </Button>
            <Button size="lg" variant="outline" onClick={handleComingSoon} className="gap-2">
              <QrCodeIcon className="size-4" />
              {t('common.scanQR')}
            </Button>
          </div>
        </div>

        {/* Right column — sidebar */}
        <aside className="space-y-6">
          <NearbySites currentSite={site} />
        </aside>
      </div>
    </div>
  );
}
