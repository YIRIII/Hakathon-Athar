import { sites } from '@/data/sites';

export interface ParsedQR {
  valid: boolean;
  siteId?: string;
  section?: string;
  type?: 'entry' | 'internal';
  error?: string;
}

/** Known site IDs for fast lookup */
const VALID_SITE_IDS = new Set(sites.map((s) => s.id));

/**
 * Parse a scanned QR code and determine whether it is a valid Athar heritage
 * link.  Accepted formats:
 *
 *  - Full URL:  https://athar.app/ar/sites/cave-hira
 *  - Full URL with section: https://athar.app/ar/sites/cave-hira?section=full-story
 *  - Relative path: /ar/sites/cave-hira  or  /en/sites/cave-hira
 *  - Plain site ID: cave-hira
 *
 * Returns a ParsedQR object describing the result.
 */
export function parseAtharQR(data: string): ParsedQR {
  if (!data || typeof data !== 'string') {
    return { valid: false, error: 'empty' };
  }

  const trimmed = data.trim();

  // ── 1. Try to parse as a URL ──────────────────────────────────────────
  try {
    // Handle both absolute URLs and paths that start with /
    const url = trimmed.startsWith('http')
      ? new URL(trimmed)
      : trimmed.startsWith('/')
        ? new URL(trimmed, 'https://athar.app')
        : null;

    if (url) {
      // Match /[locale]/sites/[id]
      const pathSegments = url.pathname
        .split('/')
        .filter(Boolean);

      const sitesIdx = pathSegments.indexOf('sites');
      if (sitesIdx !== -1 && pathSegments[sitesIdx + 1]) {
        const siteId = pathSegments[sitesIdx + 1];
        if (VALID_SITE_IDS.has(siteId)) {
          const section = url.searchParams.get('section') ?? undefined;
          return {
            valid: true,
            siteId,
            section,
            type: section ? 'internal' : 'entry',
          };
        }
        return { valid: false, error: 'unknown-site' };
      }

      // URL exists but doesn't contain /sites/ — not an Athar QR
      return { valid: false, error: 'not-athar' };
    }
  } catch {
    // Not a valid URL — fall through to plain-ID check
  }

  // ── 2. Try as a bare site ID ──────────────────────────────────────────
  if (VALID_SITE_IDS.has(trimmed)) {
    return { valid: true, siteId: trimmed, type: 'entry' };
  }

  // ── 3. Nothing matched ───────────────────────────────────────────────
  return { valid: false, error: 'not-athar' };
}
