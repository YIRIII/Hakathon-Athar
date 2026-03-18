export interface Stamp {
  siteId: string;
  earned: boolean;
  earnedAt?: string; // ISO date
}

export const stamps: Stamp[] = [
  {
    siteId: 'cave-hira',
    earned: true,
    earnedAt: '2026-03-10T14:23:00Z',
  },
  {
    siteId: 'cave-thawr',
    earned: false,
  },
  {
    siteId: 'makkah-museum',
    earned: false,
  },
  {
    siteId: 'jabal-al-rahmah',
    earned: false,
  },
  {
    siteId: 'al-mualla-cemetery',
    earned: false,
  },
  {
    siteId: 'mina-landmarks',
    earned: false,
  },
  {
    siteId: 'quba-mosque',
    earned: true,
    earnedAt: '2026-03-12T09:45:00Z',
  },
  {
    siteId: 'al-baqi-cemetery',
    earned: false,
  },
  {
    siteId: 'uhud-mountain',
    earned: true,
    earnedAt: '2026-03-14T16:10:00Z',
  },
  {
    siteId: 'qiblatain-mosque',
    earned: false,
  },
  {
    siteId: 'dar-al-madinah-museum',
    earned: false,
  },
  {
    siteId: 'al-khandaq',
    earned: false,
  },
];
