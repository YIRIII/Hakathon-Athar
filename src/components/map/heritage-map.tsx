'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { sites as allSites, type HeritageSite } from '@/data/sites';
import { MapSidebar } from './map-sidebar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

const MapView = dynamic(() => import('./map-view'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/50">
      <div className="text-muted-foreground flex flex-col items-center gap-2">
        <div className="size-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
        <span className="text-sm">Loading map...</span>
      </div>
    </div>
  ),
});

export function HeritageMap() {
  const locale = useLocale();
  const tMap = useTranslations('map');
  const isAr = locale === 'ar';

  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredSites = useMemo(() => {
    return allSites.filter((site) => {
      // City filter
      if (cityFilter !== 'all' && site.city !== cityFilter) return false;
      // Type filter
      if (typeFilter && site.type !== typeFilter) return false;
      // Search filter
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return (
          site.name_ar.toLowerCase().includes(q) ||
          site.name_en.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, cityFilter, typeFilter]);

  const handleNearMe = useCallback(() => {
    alert(tMap('gpsComingSoon'));
  }, [tMap]);

  const handleSiteClick = useCallback((_site: HeritageSite) => {
    // Could pan to site on map; for now the list click is just UX feedback
  }, []);

  const sidebarContent = (
    <MapSidebar
      sites={filteredSites}
      search={search}
      onSearchChange={setSearch}
      cityFilter={cityFilter}
      onCityFilter={setCityFilter}
      typeFilter={typeFilter}
      onTypeFilter={setTypeFilter}
      onSiteClick={handleSiteClick}
      onNearMe={handleNearMe}
    />
  );

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] w-full">
      {/* Desktop sidebar */}
      <aside
        className="hidden w-80 shrink-0 border-e border-border md:block"
      >
        {sidebarContent}
      </aside>

      {/* Map */}
      <div className="relative flex-1">
        <MapView sites={filteredSites} onSelectSite={handleSiteClick} />

        {/* Mobile floating filter button */}
        <div className="absolute start-4 top-4 z-[1000] md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90">
                <Filter className="size-4" />
                {tMap('filters')}
            </SheetTrigger>
            <SheetContent
              side={isAr ? 'right' : 'left'}
              className="w-80 p-0"
            >
              <SheetHeader className="px-4 pt-4">
                <SheetTitle>{tMap('filters')}</SheetTitle>
              </SheetHeader>
              {sidebarContent}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
