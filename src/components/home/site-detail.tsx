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
import { SiteChatWidget } from '@/components/home/site-chat-widget';
import { Storyteller } from '@/components/home/storyteller';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { buildShareUrl } from '@/lib/referral';
import Image from 'next/image';
import { MapPinIcon, QrCodeIcon, ClockIcon, AccessibilityIcon, NavigationIcon, ExternalLinkIcon, ImageIcon, ShieldCheckIcon, GlobeIcon, BookOpenIcon, BuildingIcon } from 'lucide-react';
import { openDirections } from '@/lib/navigation';
import { Link } from '@/i18n/routing';

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

  const imageCount = site.images.length;

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
      {/* Full-page site image background — like homepage mosque pattern */}
      {site.images[0] && (
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          {/* Actual site image covering the full viewport */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${site.images[0]})` }}
          />
          {/* Overlay: let image show through subtly — darker tint like homepage */}
          <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
          {/* Soft gradient fade: top is more transparent (image shows behind hero), bottom is more opaque (text readable) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Hero Section */}
        <section className="relative -mx-4 mb-8 overflow-hidden sm:-mx-6 md:mx-0 md:rounded-2xl">
          <div className={`relative aspect-[16/9] w-full bg-gradient-to-br sm:aspect-[21/9] ${heroGradient}`}>
            {site.images[0] && (
              site.images[0].startsWith('http') ? (
                <Image
                  src={site.images[0]}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.images[0]}
                  alt={name}
                  className="absolute inset-0 size-full object-cover"
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute end-4 top-4 z-10">
              <FavoriteButton siteId={site.id} className="border border-white/20 shadow-lg" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {name}
              </h1>
            </div>
          </div>
        </section>

        {/* Badges */}
        <AnimateOnScroll variant="fade-in">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge className={typeColorMap[site.type]}>
              {t(`sites.${site.type}`)}
            </Badge>
            <Badge variant="outline">
              {t(`sites.${site.city}`)}
            </Badge>
          </div>
        </AnimateOnScroll>

        {/* Main layout: content + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Left column — main content */}
          <div className="min-w-0 space-y-8">
            {/* Image Gallery with count badge */}
            <AnimateOnScroll variant="fade-up">
              <div className="relative">
                {imageCount > 0 && (
                  <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ImageIcon className="size-4" />
                    <span>
                      {imageCount} {isAr ? 'صور' : 'photos'}
                    </span>
                  </div>
                )}
                <ImageGallery siteName={name} images={site.images} />
              </div>
            </AnimateOnScroll>

            {/* Narrative Tabs — with gradient border at top */}
            <AnimateOnScroll variant="fade-up" delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-transparent bg-card/80 backdrop-blur-sm transition-all hover:border-primary/10">
                {/* Gradient top border */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="p-4 sm:p-6">
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
              </div>
            </AnimateOnScroll>

            {/* Visitor Info Card */}
            <AnimateOnScroll variant="fade-up" delay={0.2}>
              <Card className="border border-transparent bg-card/80 backdrop-blur-sm transition-all hover:border-primary/10">
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
            </AnimateOnScroll>

            {/* Official References */}
            {site.externalLinks.length > 0 && (
              <AnimateOnScroll variant="fade-up" delay={0.3}>
                <Card className="border border-transparent bg-card/80 backdrop-blur-sm transition-all hover:border-primary/10">
                  <CardHeader>
                    <CardTitle>{t('sites.officialReferences')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {site.externalLinks.map((link, idx) => {
                      const LinkIcon = link.type === 'government' ? ShieldCheckIcon
                        : link.type === 'tourism' ? GlobeIcon
                        : link.type === 'official' ? BuildingIcon
                        : BookOpenIcon;
                      const iconColor = link.type === 'government' ? 'text-green-600 dark:text-green-400'
                        : link.type === 'tourism' ? 'text-blue-600 dark:text-blue-400'
                        : 'text-amber-600 dark:text-amber-400';
                      return (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-lg border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/10"
                        >
                          <LinkIcon className={`size-4 shrink-0 ${iconColor}`} />
                          <span className="flex-1">{isAr ? link.label_ar : link.label_en}</span>
                          <ExternalLinkIcon className="size-3 shrink-0 text-muted-foreground" />
                        </a>
                      );
                    })}
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            )}

            {/* Divider above action buttons */}
            <div className="mx-auto h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Action Buttons */}
            <AnimateOnScroll variant="fade-up" delay={0.4}>
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
                <Storyteller
                  siteId={site.id}
                  siteName={isAr ? site.name_ar : site.name_en}
                  fallbackText={isAr ? site.full_ar : site.full_en}
                />
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
            </AnimateOnScroll>
          </div>

          {/* Right column — sidebar */}
          <aside className="space-y-6">
            <NearbySites currentSite={site} />
          </aside>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <SiteChatWidget siteId={site.id} />
    </div>
  );
}
