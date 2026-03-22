'use client';

import { useRef, useEffect } from 'react';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { HeritageSite } from '@/data/sites';
import { SitePopupContent } from './site-popup';

const typeColors: Record<HeritageSite['type'], string> = {
  religious: '#2D6A4F',
  archaeological: '#B8956A',
  cultural: '#C8A45C',
  museum: '#4A3728',
};

function createCardIcon(site: HeritageSite) {
  const color = typeColors[site.type];
  const imageUrl = site.images[0];
  const name = site.name_ar; // Always show Arabic on map for primary locale

  return L.divIcon({
    className: 'heritage-card-marker',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        filter: drop-shadow(0 3px 8px rgba(0,0,0,0.25));
      ">
        <div style="
          width: 140px;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid ${color}40;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        ">
          <div style="
            width: 100%;
            height: 70px;
            background-image: url(${imageUrl});
            background-size: cover;
            background-position: center;
          "></div>
          <div style="
            padding: 6px 8px;
            text-align: center;
          ">
            <div style="
              font-size: 11px;
              font-weight: 700;
              color: #1a1410;
              line-height: 1.3;
              direction: rtl;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            ">${name}</div>
            <div style="
              display: inline-block;
              margin-top: 3px;
              padding: 1px 6px;
              border-radius: 999px;
              font-size: 9px;
              font-weight: 600;
              color: white;
              background-color: ${color};
            ">${site.type === 'religious' ? 'ديني' : site.type === 'archaeological' ? 'أثري' : site.type === 'cultural' ? 'ثقافي' : 'متحف'}</div>
          </div>
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [140, 120],
    iconAnchor: [70, 120],
    popupAnchor: [0, -120],
  });
}

export function SiteMarker({
  site,
  onSelect,
  selected,
}: {
  site: HeritageSite;
  onSelect?: (site: HeritageSite) => void;
  selected?: boolean;
}) {
  const icon = createCardIcon(site);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (selected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [selected]);

  return (
    <Marker
      ref={markerRef}
      position={[site.coordinates.lat, site.coordinates.lng]}
      icon={icon}
    >
      <Popup maxWidth={320} minWidth={240}>
        <SitePopupContent site={site} />
      </Popup>
    </Marker>
  );
}
