/**
 * Platform-Aware Navigation Deep Links
 *
 * Opens the user's preferred maps app with directions to a heritage site.
 * Detects platform (iOS/Android/desktop) and opens the correct app:
 * - iOS: Apple Maps (falls back to Google Maps web)
 * - Android: Google Maps app (falls back to Google Maps web)
 * - Desktop: Google Maps web
 *
 * No API keys required — uses deep link URLs only.
 */

interface NavigationOptions {
  lat: number;
  lng: number;
  /** Destination name (used in maps label) */
  name?: string;
  /** Navigation mode */
  mode?: 'driving' | 'walking' | 'transit';
}

type Platform = 'ios' | 'android' | 'desktop';

/**
 * Detect the user's platform for navigation deep linking.
 */
function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop';

  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'desktop';
}

/**
 * Build a Google Maps directions URL.
 */
function googleMapsUrl(opts: NavigationOptions): string {
  const params = new URLSearchParams({
    api: '1',
    destination: `${opts.lat},${opts.lng}`,
    travelmode: opts.mode || 'walking',
  });

  if (opts.name) {
    params.set('destination_place_id', '');
    // Use query param for named destination
    return `https://www.google.com/maps/dir/?${params.toString()}&destination=${encodeURIComponent(opts.name)}+@${opts.lat},${opts.lng}`;
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Build an Apple Maps directions URL.
 */
function appleMapsUrl(opts: NavigationOptions): string {
  const params = new URLSearchParams({
    daddr: `${opts.lat},${opts.lng}`,
    dirflg: opts.mode === 'driving' ? 'd' : opts.mode === 'transit' ? 'r' : 'w',
  });

  if (opts.name) {
    params.set('daddr', `${opts.name}@${opts.lat},${opts.lng}`);
  }

  return `https://maps.apple.com/?${params.toString()}`;
}

/**
 * Build a Waze directions URL.
 */
function wazeUrl(opts: NavigationOptions): string {
  return `https://waze.com/ul?ll=${opts.lat},${opts.lng}&navigate=yes`;
}

/**
 * Open directions in the user's preferred maps app.
 * Auto-detects platform for the best experience.
 */
export function openDirections(opts: NavigationOptions): void {
  const platform = detectPlatform();

  let url: string;

  switch (platform) {
    case 'ios':
      // Apple Maps is the default on iOS
      url = appleMapsUrl(opts);
      break;
    case 'android':
      // Google Maps is the default on Android
      url = googleMapsUrl(opts);
      break;
    default:
      // Desktop: Google Maps web
      url = googleMapsUrl(opts);
      break;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Get all available navigation options for UI display.
 * Returns URLs for each maps provider.
 */
export function getNavigationOptions(opts: NavigationOptions) {
  return {
    googleMaps: googleMapsUrl(opts),
    appleMaps: appleMapsUrl(opts),
    waze: wazeUrl(opts),
  };
}
