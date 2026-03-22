'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Navigation, Search, Loader2, X } from 'lucide-react';
import type { HeritageSite } from '@/data/sites';
import type { GpsStatus, SiteWithDistance } from './heritage-map';

const typeColors: Record<HeritageSite['type'], string> = {
  religious: '#2D6A4F',
  archaeological: '#B8956A',
  cultural: '#C8A45C',
  museum: '#4A3728',
};

const cityKeys = ['all', 'makkah', 'madinah'] as const;
const typeKeys: HeritageSite['type'][] = ['religious', 'archaeological', 'cultural', 'museum'];

interface MapSidebarProps {
  sites: SiteWithDistance[];
  search: string;
  onSearchChange: (val: string) => void;
  cityFilter: string;
  onCityFilter: (val: string) => void;
  typeFilter: string;
  onTypeFilter: (val: string) => void;
  onSiteClick: (site: HeritageSite) => void;
  onNearMe: () => void;
  onShowAll: () => void;
  gpsStatus: GpsStatus;
  nearMeActive: boolean;
}

export function MapSidebar({
  sites,
  search,
  onSearchChange,
  cityFilter,
  onCityFilter,
  typeFilter,
  onTypeFilter,
  onSiteClick,
  onNearMe,
  onShowAll,
  gpsStatus,
  nearMeActive,
}: MapSidebarProps) {
  const locale = useLocale();
  const t = useTranslations('sites');
  const tMap = useTranslations('map');
  const tCommon = useTranslations('common');
  const isAr = locale === 'ar';

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder={tCommon('search')}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ps-9"
          />
        </div>
      </div>

      {/* City filters */}
      <div className="flex gap-1.5 px-4 pb-2">
        {cityKeys.map((c) => {
          const isActive = cityFilter === c;
          return (
            <Button
              key={c}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className="h-7 text-xs"
              onClick={() => onCityFilter(c)}
            >
              {c === 'all' ? tMap('all') : t(c)}
            </Button>
          );
        })}
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        {typeKeys.map((type) => {
          const isActive = typeFilter === type;
          return (
            <button
              key={type}
              className="inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: isActive ? typeColors[type] : 'transparent',
                color: isActive ? 'white' : typeColors[type],
                borderColor: typeColors[type],
              }}
              onClick={() => onTypeFilter(isActive ? '' : type)}
            >
              {t(type)}
            </button>
          );
        })}
      </div>

      {/* Near me */}
      <div className="px-4 pb-2">
        <Button
          variant={nearMeActive ? 'default' : 'outline'}
          size="sm"
          className="h-7 w-full gap-1.5 text-xs"
          onClick={onNearMe}
          disabled={gpsStatus === 'loading'}
        >
          {gpsStatus === 'loading' ? (
            <Loader2 className="size-3 animate-spin" />
          ) : nearMeActive ? (
            <X className="size-3" />
          ) : (
            <Navigation className="size-3" />
          )}
          {gpsStatus === 'loading'
            ? tMap('gpsLoading')
            : nearMeActive
              ? tMap('nearMeOff')
              : tCommon('nearMe')}
        </Button>
      </div>

      {/* GPS status messages */}
      {gpsStatus === 'denied' && (
        <div className="mx-4 mb-2 rounded-md bg-destructive/10 p-2.5 text-xs text-destructive">
          {tMap('gpsDenied')}
        </div>
      )}
      {gpsStatus === 'error' && (
        <div className="mx-4 mb-2 rounded-md bg-destructive/10 p-2.5 text-xs text-destructive">
          {tMap('gpsError')}
        </div>
      )}

      <Separator />

      {/* Sites list */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {/* No nearby sites message */}
          {nearMeActive && sites.length === 0 && (
            <div className="flex flex-col items-center gap-3 px-3 py-6 text-center">
              <p className="text-muted-foreground text-sm">
                {tMap('noNearbySites')}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={onShowAll}
              >
                {tMap('showAll')}
              </Button>
            </div>
          )}

          {/* Regular no results */}
          {!nearMeActive && sites.length === 0 && (
            <p className="text-muted-foreground px-3 py-6 text-center text-sm">
              {tMap('noResults')}
            </p>
          )}

          {sites.map((site) => {
            const name = isAr ? site.name_ar : site.name_en;
            return (
              <button
                key={site.id}
                className="hover:bg-muted flex items-start gap-2 rounded-lg p-2.5 text-start transition-colors"
                onClick={() => onSiteClick(site)}
              >
                <MapPin
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: typeColors[site.type] }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    <Badge
                      variant="secondary"
                      className="h-4 text-[10px]"
                      style={{
                        backgroundColor: typeColors[site.type] + '18',
                        color: typeColors[site.type],
                      }}
                    >
                      {t(site.type)}
                    </Badge>
                    <Badge variant="outline" className="h-4 text-[10px]">
                      {t(site.city)}
                    </Badge>
                    {site.distance !== undefined && (
                      <span className="text-[10px] text-muted-foreground">
                        {site.distance < 1
                          ? `${Math.round(site.distance * 1000)} m`
                          : `${site.distance.toFixed(1)} ${tCommon('km')}`}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
