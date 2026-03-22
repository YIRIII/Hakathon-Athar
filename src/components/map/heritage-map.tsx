'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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
import { haversineKm } from '@/lib/geo';
import type { MapViewHandle } from './map-view';

const NEAR_ME_RADIUS_KM = 2;

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

export type GpsStatus = 'idle' | 'loading' | 'active' | 'denied' | 'error';

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface SiteWithDistance extends HeritageSite {
  distance?: number;
}

interface HeritageMapProps {
  focusSiteId?: string;
}

export function HeritageMap({ focusSiteId }: HeritageMapProps = {}) {
  const locale = useLocale();
  const tMap = useTranslations('map');
  const isAr = locale === 'ar';

  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('');

  // GPS state
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>('idle');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearMeActive, setNearMeActive] = useState(false);

  // Map ref for flyTo
  const mapRef = useRef<MapViewHandle | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const filteredSites = useMemo(() => {
    return allSites.filter((site) => {
      if (cityFilter !== 'all' && site.city !== cityFilter) return false;
      if (typeFilter && site.type !== typeFilter) return false;
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

  // Sites with distance and optional near-me filtering
  const displaySites: SiteWithDistance[] = useMemo(() => {
    if (!userLocation) return filteredSites;

    const withDist = filteredSites.map((site) => ({
      ...site,
      distance: haversineKm(userLocation, site.coordinates),
    }));

    const sorted = withDist.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    if (nearMeActive) {
      return sorted.filter((s) => (s.distance ?? Infinity) <= NEAR_ME_RADIUS_KM);
    }

    return sorted;
  }, [filteredSites, userLocation, nearMeActive]);

  const handleNearMe = useCallback(() => {
    // If already active, toggle off
    if (nearMeActive) {
      setNearMeActive(false);
      setGpsStatus('idle');
      setUserLocation(null);
      return;
    }

    if (!navigator.geolocation) {
      setGpsStatus('error');
      return;
    }

    setGpsStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc: UserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(loc);
        setNearMeActive(true);
        setGpsStatus('active');
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGpsStatus('denied');
        } else {
          setGpsStatus('error');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [nearMeActive]);

  const handleShowAll = useCallback(() => {
    setNearMeActive(false);
  }, []);

  /** Fly to the selected site on the map and open its popup */
  const handleSiteClick = useCallback((site: HeritageSite) => {
    mapRef.current?.flyToSite(site.coordinates);
    setSelectedSiteId(site.id);
  }, []);

  // Auto-focus on a site when arriving from featured sites link
  useEffect(() => {
    if (!focusSiteId) return;
    const site = allSites.find((s) => s.id === focusSiteId);
    if (!site) return;
    // Small delay to ensure map is loaded
    const timer = setTimeout(() => {
      mapRef.current?.flyToSite(site.coordinates);
    }, 800);
    return () => clearTimeout(timer);
  }, [focusSiteId]);

  const sidebarContent = (
    <MapSidebar
      sites={displaySites}
      search={search}
      onSearchChange={setSearch}
      cityFilter={cityFilter}
      onCityFilter={setCityFilter}
      typeFilter={typeFilter}
      onTypeFilter={setTypeFilter}
      onSiteClick={handleSiteClick}
      onNearMe={handleNearMe}
      onShowAll={handleShowAll}
      gpsStatus={gpsStatus}
      nearMeActive={nearMeActive}
    />
  );

  return (
    <div className="relative flex h-[calc(100dvh-3.5rem)] w-full">
      {/* Desktop sidebar */}
      <aside
        className="relative z-10 hidden w-80 shrink-0 border-e border-border md:block"
      >
        {sidebarContent}
      </aside>

      {/* Map */}
      <div className="relative min-h-0 flex-1">
        <MapView
          ref={mapRef}
          sites={displaySites}
          onSelectSite={handleSiteClick}
          userLocation={userLocation}
          selectedSiteId={selectedSiteId}
        />

        {/* Mobile floating filter button */}
        <div className="absolute start-4 top-4 z-[999] md:hidden">
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
