'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { HeritageSite } from '@/data/sites';
import { Link } from '@/i18n/routing';

const typeColors: Record<HeritageSite['type'], string> = {
  religious: '#2D6A4F',
  archaeological: '#B8956A',
  cultural: '#C8A45C',
  museum: '#4A3728',
};

export function SitePopupContent({ site }: { site: HeritageSite }) {
  const locale = useLocale();
  const t = useTranslations('sites');
  const tCommon = useTranslations('common');
  const isAr = locale === 'ar';
  const name = isAr ? site.name_ar : site.name_en;
  const brief = isAr ? site.brief_ar : site.brief_en;
  const color = typeColors[site.type];

  return (
    <div
      className="min-w-[200px] max-w-[280px]"
      dir={isAr ? 'rtl' : 'ltr'}
      style={{ fontFamily: 'inherit' }}
    >
      <h3 className="mb-1 text-sm font-bold" style={{ color: '#1a1410' }}>
        {name}
      </h3>
      <span
        className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {t(site.type)}
      </span>
      <p className="mb-2 text-xs leading-relaxed" style={{ color: '#555' }}>
        {brief.slice(0, 120)}
        {brief.length > 120 ? '...' : ''}
      </p>
      <Link
        href={`/sites/${site.id}` as any}
        className="inline-block rounded-md px-3 py-1 text-xs font-medium text-white transition-colors hover:opacity-90"
        style={{ backgroundColor: '#C8A45C' }}
      >
        {tCommon('viewDetails')}
      </Link>
    </div>
  );
}
