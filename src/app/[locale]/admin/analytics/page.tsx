import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  QrCodeIcon,
  MessageCircleIcon,
  StampIcon,
  MapPinIcon,
  UsersIcon,
  TrendingUpIcon,
  ShareIcon,
  MicIcon,
} from 'lucide-react';

/**
 * Analytics Dashboard — Admin page showing key platform metrics.
 *
 * Currently displays mock data for the hackathon demo.
 * Will connect to Umami API + Supabase queries when backend is live.
 */

// Mock analytics data for demo
const mockStats = {
  totalScans: 1247,
  chatMessages: 3841,
  stampsEarned: 892,
  certificatesShared: 156,
  activeUsers: 423,
  voiceChats: 312,
  directionsOpened: 567,
  avgEngagementMin: 8.4,
};

const mockTopSites = [
  { name_ar: 'غار حراء', name_en: 'Cave of Hira', scans: 312, chats: 891 },
  { name_ar: 'المسجد النبوي', name_en: 'Al-Masjid an-Nabawi', scans: 287, chats: 724 },
  { name_ar: 'جبل أحد', name_en: 'Mount Uhud', scans: 198, chats: 456 },
  { name_ar: 'مسجد قباء', name_en: 'Quba Mosque', scans: 176, chats: 398 },
  { name_ar: 'بئر زمزم', name_en: 'Zamzam Well', scans: 154, chats: 367 },
];

export default function AnalyticsDashboard() {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t('admin.analyticsTitle')}</h1>
        <p className="text-muted-foreground">{t('admin.analyticsDescription')}</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('admin.totalScans')}
          value={mockStats.totalScans.toLocaleString()}
          icon={<QrCodeIcon className="size-5" />}
          trend="+12%"
        />
        <StatCard
          title={t('admin.chatMessages')}
          value={mockStats.chatMessages.toLocaleString()}
          icon={<MessageCircleIcon className="size-5" />}
          trend="+28%"
        />
        <StatCard
          title={t('admin.stampsEarned')}
          value={mockStats.stampsEarned.toLocaleString()}
          icon={<StampIcon className="size-5" />}
          trend="+18%"
        />
        <StatCard
          title={t('admin.certificatesShared')}
          value={mockStats.certificatesShared.toLocaleString()}
          icon={<ShareIcon className="size-5" />}
          trend="+45%"
        />
        <StatCard
          title={t('admin.activeUsers')}
          value={mockStats.activeUsers.toLocaleString()}
          icon={<UsersIcon className="size-5" />}
          trend="+8%"
        />
        <StatCard
          title={t('admin.voiceChats')}
          value={mockStats.voiceChats.toLocaleString()}
          icon={<MicIcon className="size-5" />}
          trend="+65%"
        />
        <StatCard
          title={t('admin.directionsOpened')}
          value={mockStats.directionsOpened.toLocaleString()}
          icon={<MapPinIcon className="size-5" />}
          trend="+22%"
        />
        <StatCard
          title={t('admin.avgEngagement')}
          value={`${mockStats.avgEngagementMin} min`}
          icon={<TrendingUpIcon className="size-5" />}
          trend="+3.2 min"
        />
      </div>

      {/* Top Sites Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.topSites')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-start font-medium text-muted-foreground">#</th>
                  <th className="py-3 text-start font-medium text-muted-foreground">{t('admin.siteName')}</th>
                  <th className="py-3 text-start font-medium text-muted-foreground">{t('admin.qrScans')}</th>
                  <th className="py-3 text-start font-medium text-muted-foreground">{t('admin.chatSessions')}</th>
                </tr>
              </thead>
              <tbody>
                {mockTopSites.map((site, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 font-medium">{site.name_ar}</td>
                    <td className="py-3">{site.scans.toLocaleString()}</td>
                    <td className="py-3">{site.chats.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
          <span className="text-xs font-medium text-green-600">{trend}</span>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
