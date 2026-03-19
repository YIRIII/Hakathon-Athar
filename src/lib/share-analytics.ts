const STORAGE_KEY = 'athar_share_events';

export interface ShareEvent {
  platform: string;
  siteId: string;
  type: 'site' | 'certificate';
  timestamp: number;
}

export interface ShareStats {
  totalShares: number;
  byPlatform: Record<string, number>;
  bySite: Record<string, number>;
  byType: Record<string, number>;
  recentShares: ShareEvent[];
}

function getEvents(): ShareEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShareEvent[]) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: ShareEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function trackShare(
  platform: string,
  siteId: string,
  type: 'site' | 'certificate',
): void {
  const events = getEvents();
  events.push({ platform, siteId, type, timestamp: Date.now() });
  // Keep at most the last 500 events to avoid bloating storage
  if (events.length > 500) events.splice(0, events.length - 500);
  saveEvents(events);
}

export function getShareStats(): ShareStats {
  const events = getEvents();

  const byPlatform: Record<string, number> = {};
  const bySite: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const ev of events) {
    byPlatform[ev.platform] = (byPlatform[ev.platform] ?? 0) + 1;
    bySite[ev.siteId] = (bySite[ev.siteId] ?? 0) + 1;
    byType[ev.type] = (byType[ev.type] ?? 0) + 1;
  }

  return {
    totalShares: events.length,
    byPlatform,
    bySite,
    byType,
    recentShares: events.slice(-10).reverse(),
  };
}
