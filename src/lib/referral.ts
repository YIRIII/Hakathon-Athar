const REFERRAL_KEY = 'athar_referral_source';

export interface ReferralParams {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  ref: string | null;
}

/**
 * Generate a shareable URL with UTM and referral params.
 */
export function buildShareUrl(
  path: string,
  options?: {
    userId?: string;
    medium?: 'site' | 'certificate';
  },
): string {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://athar.app';

  const url = new URL(path, base);
  url.searchParams.set('utm_source', 'share');
  url.searchParams.set('utm_medium', options?.medium ?? 'site');
  url.searchParams.set('utm_campaign', 'referral');
  if (options?.userId) {
    url.searchParams.set('ref', options.userId);
  }
  return url.toString();
}

/**
 * Parse referral / UTM params from the current page URL.
 */
export function parseReferralParams(
  search?: string,
): ReferralParams {
  const params = new URLSearchParams(
    search ?? (typeof window !== 'undefined' ? window.location.search : ''),
  );

  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    ref: params.get('ref'),
  };
}

/**
 * Store referral source in localStorage (if present in URL).
 * Call once on initial page load.
 */
export function captureReferral(): void {
  if (typeof window === 'undefined') return;

  const referral = parseReferralParams();

  if (referral.utmSource || referral.ref) {
    try {
      localStorage.setItem(
        REFERRAL_KEY,
        JSON.stringify({ ...referral, capturedAt: Date.now() }),
      );
    } catch {
      // silently ignore
    }
  }
}

/**
 * Retrieve stored referral source, if any.
 */
export function getStoredReferral(): (ReferralParams & { capturedAt: number }) | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(REFERRAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
