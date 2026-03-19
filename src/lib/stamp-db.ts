import Dexie from 'dexie';

export interface StampRecord {
  siteId: string;
  earnedAt: string; // ISO date
  qrScanned: boolean;
  synced: boolean;
}

class StampDatabase extends Dexie {
  stamps!: Dexie.Table<StampRecord, string>;

  constructor() {
    super('AtharHeritage');
    this.version(1).stores({
      stamps: 'siteId, earnedAt, synced',
    });
  }
}

export const stampDb = new StampDatabase();

export async function getEarnedStamps(): Promise<StampRecord[]> {
  return stampDb.stamps.toArray();
}

export async function earnStamp(siteId: string): Promise<void> {
  const existing = await stampDb.stamps.get(siteId);
  if (existing) return; // Already earned
  await stampDb.stamps.put({
    siteId,
    earnedAt: new Date().toISOString(),
    qrScanned: true,
    synced: false,
  });
}

export async function hasStamp(siteId: string): Promise<boolean> {
  const record = await stampDb.stamps.get(siteId);
  return !!record;
}
