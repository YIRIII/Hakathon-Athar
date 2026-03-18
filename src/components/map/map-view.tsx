'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { HeritageSite } from '@/data/sites';
import { SiteMarker } from './site-marker';

interface MapViewProps {
  sites: HeritageSite[];
  onSelectSite?: (site: HeritageSite) => void;
}

export default function MapView({ sites, onSelectSite }: MapViewProps) {
  return (
    <MapContainer
      center={[23.0, 39.7]}
      zoom={8}
      className="h-full w-full"
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site) => (
        <SiteMarker key={site.id} site={site} onSelect={onSelectSite} />
      ))}
    </MapContainer>
  );
}
