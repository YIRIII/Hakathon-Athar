import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sites, type HeritageSite } from '@/data/sites';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
};

// Simple distance calculation (Haversine) for mock display
function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

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
            <Card size="sm" className="transition-shadow duration-200 group-hover:ring-primary/30 group-hover:shadow-md">
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
