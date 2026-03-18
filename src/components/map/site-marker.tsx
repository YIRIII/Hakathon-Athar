'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { HeritageSite } from '@/data/sites';
import { SitePopupContent } from './site-popup';

const typeColors: Record<HeritageSite['type'], string> = {
  religious: '#2D6A4F',
  archaeological: '#B8956A',
  cultural: '#C8A45C',
  museum: '#4A3728',
};

function createCircleIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

export function SiteMarker({
  site,
  onSelect,
}: {
  site: HeritageSite;
  onSelect?: (site: HeritageSite) => void;
}) {
  const color = typeColors[site.type];
  const icon = createCircleIcon(color);

  return (
    <Marker
      position={[site.coordinates.lat, site.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect?.(site),
      }}
    >
      <Popup maxWidth={300} minWidth={200}>
        <SitePopupContent site={site} />
      </Popup>
    </Marker>
  );
}
