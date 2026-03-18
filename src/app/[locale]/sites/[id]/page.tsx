import { notFound } from 'next/navigation';
import { sites } from '@/data/sites';
import { SiteDetail } from '@/components/home/site-detail';

export function generateStaticParams() {
  return sites.map((site) => ({ id: site.id }));
}

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const site = sites.find((s) => s.id === id);

  if (!site) {
    notFound();
  }

  return (
    <div className="pt-6 md:pt-10">
      <SiteDetail site={site} />
    </div>
  );
}
