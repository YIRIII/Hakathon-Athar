'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import type { HeritageSite } from '@/data/sites';
import type { UserLocation } from './heritage-map';
import { SiteMarker } from './site-marker';

export interface MapViewHandle {
  flyToSite: (coords: { lat: number; lng: number }) => void;
}

interface MapViewProps {
  sites: HeritageSite[];
  onSelectSite?: (site: HeritageSite) => void;
  userLocation?: UserLocation | null;
}

// Blue pulsing dot icon for user location
const userLocationIcon = L.divIcon({
  className: '',
  html: `<div style="position:relative;width:20px;height:20px;">
    <div style="
      position:absolute;
      inset:0;
      border-radius:50%;
      background:rgba(59,130,246,0.3);
      animation:pulse-ring 1.5s ease-out infinite;
    "></div>
    <div style="
      position:absolute;
      top:4px;left:4px;
      width:12px;height:12px;
      border-radius:50%;
      background:#3B82F6;
      border:2.5px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
    "></div>
  </div>
  <style>
    @keyframes pulse-ring {
      0% { transform:scale(1); opacity:1; }
      100% { transform:scale(2.2); opacity:0; }
    }
  </style>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/** Custom cluster icon with heritage gold styling */
function createClusterIcon(cluster: { getChildCount(): number }) {
  const count = cluster.getChildCount();
  let size = 36;
  let fontSize = 13;
  if (count >= 10) {
    size = 44;
    fontSize = 14;
  }
  if (count >= 20) {
    size = 52;
    fontSize = 15;
  }

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C8A45C 0%, #B8944C 100%);
      border: 3px solid rgba(255,255,255,0.9);
      box-shadow: 0 3px 10px rgba(74,55,40,0.35), 0 0 0 4px rgba(200,164,92,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: ${fontSize}px;
      font-family: system-ui, sans-serif;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      transition: transform 0.2s ease;
    ">${count}</div>`,
    className: 'heritage-cluster-icon',
    iconSize: L.point(size, size),
    iconAnchor: L.point(size / 2, size / 2),
  });
}

/** Fly to user location when it changes */
function FlyToUser({ location }: { location: UserLocation }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([location.lat, location.lng], 14, { duration: 1.2 });
  }, [map, location.lat, location.lng]);
  return null;
}

/** Expose map instance to allow parent to trigger flyTo */
function MapController({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(
  function MapView({ sites, onSelectSite, userLocation }, ref) {
    const mapRef = { current: null as L.Map | null };

    const handleMapReady = useCallback((map: L.Map) => {
      mapRef.current = map;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        flyToSite(coords: { lat: number; lng: number }) {
          mapRef.current?.flyTo([coords.lat, coords.lng], 15, {
            duration: 1.0,
            easeLinearity: 0.25,
          });
        },
      }),
      [],
    );

    return (
      <MapContainer
        center={[23.0, 39.7]}
        zoom={8}
        className="h-full w-full"
        zoomControl={true}
        scrollWheelZoom={true}
        zoomSnap={0.5}
        zoomDelta={0.5}
        wheelDebounceTime={80}
        // Keep popup inside map viewport
        closePopupOnClick={true}
      >
        <MapController onMapReady={handleMapReady} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={50}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          animate={true}
          animateAddingMarkers={true}
          disableClusteringAtZoom={16}
        >
          {sites.map((site) => (
            <SiteMarker key={site.id} site={site} onSelect={onSelectSite} />
          ))}
        </MarkerClusterGroup>

        {/* User location marker */}
        {userLocation && (
          <>
            <FlyToUser location={userLocation} />
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userLocationIcon}
              zIndexOffset={1000}
            >
              <Popup>
                <span className="text-sm font-medium">📍</span>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    );
  },
);

export default MapView;
