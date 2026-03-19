import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sites } from '@/data/sites';
import { SiteDetail } from '@/components/home/site-detail';

export function generateStaticParams() {
  return sites.map((site) => ({ id: site.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const site = sites.find((s) => s.id === id);

  if (!site) return {};

  const isAr = locale === 'ar';
  const name = isAr ? site.name_ar : site.name_en;
  const description = isAr ? site.brief_ar : site.brief_en;
  const ogImageUrl = `/api/og?site=${encodeURIComponent(name)}&type=${encodeURIComponent(site.type)}&locale=${locale}`;

  return {
    title: `${name} — ${isAr ? 'أثر' : 'Athar'}`,
    description,
    openGraph: {
      title: name,
      description,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [ogImageUrl],
    },
  };
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
