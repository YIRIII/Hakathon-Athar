/**
 * Umami Analytics — Custom Event Tracking
 *
 * Cookie-less, PDPL-compliant analytics via Umami.
 * Only active when NEXT_PUBLIC_UMAMI_WEBSITE_ID is configured.
 *
 * Usage:
 *   trackEvent('qr_scan', { siteId: 'cave-hira', method: 'camera' });
 *   trackEvent('chat_message', { locale: 'ar', siteId: 'masjid-nabawi' });
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
  }
}

/**
 * Track a custom analytics event.
 * No-op if Umami is not loaded or not configured.
 */
export function trackEvent(
  name: string,
  data?: Record<string, string | number>,
): void {
  if (typeof window === 'undefined') return;
  window.umami?.track(name, data);
}

// Pre-defined event names for consistency
export const AnalyticsEvents = {
  // QR System
  QR_SCAN: 'qr_scan',
  QR_SCAN_SUCCESS: 'qr_scan_success',
  QR_SCAN_ERROR: 'qr_scan_error',

  // Chatbot
  CHAT_MESSAGE: 'chat_message',
  CHAT_VOICE_INPUT: 'chat_voice_input',
  CHAT_VOICE_OUTPUT: 'chat_voice_output',

  // Heritage Passport
  STAMP_EARNED: 'stamp_earned',
  CERTIFICATE_GENERATED: 'certificate_generated',
  CERTIFICATE_SHARED: 'certificate_shared',

  // Navigation
  GET_DIRECTIONS: 'get_directions',

  // Engagement
  SITE_VIEW: 'site_view',
  MAP_INTERACTION: 'map_interaction',
  GALLERY_VIEW: 'gallery_view',
} as const;
