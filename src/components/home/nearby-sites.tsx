import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { sites, type HeritageSite } from '@/data/sites';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { haversineKm } from '@/lib/geo';

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
};

interface NearbySitesProps {
  currentSite: HeritageSite;
}

export function NearbySites({ currentSite }: NearbySitesProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  // Get sites in the same city, excluding the current one, sorted by distance
  const nearby = sites
    .filter((s) => s.city === currentSite.city && s.id !== currentSite.id)
    .map((s) => ({
      ...s,
      distance: haversineKm(currentSite.coordinates, s.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  if (nearby.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-foreground">
        {t('sites.nearbySites')}
      </h2>
      <div className="flex flex-col gap-4">
        {nearby.map((site) => (
          <Link key={site.id} href={`/sites/${site.id}`} className="group block">
            <Card size="sm" className="overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:ring-primary/30 group-hover:shadow-md">
              {/* Thumbnail image */}
              {site.images[0]?.startsWith('http') && (
                <div className="relative h-28 w-full overflow-hidden">
                  <Image
                    src={site.images[0]}
                    alt={isAr ? site.name_ar : site.name_en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={typeColorMap[site.type]}>
                    {t(`sites.${site.type}`)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {site.distance.toFixed(1)} {t('common.km')}
                  </span>
                </div>
                <CardTitle className="mt-1 text-base leading-snug">
                  {isAr ? site.name_ar : site.name_en}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full">
                  {t('common.viewDetails')}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
