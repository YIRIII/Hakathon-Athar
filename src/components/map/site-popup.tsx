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

const cityColors: Record<string, string> = {
  makkah: '#C8A45C',
  madinah: '#2D6A4F',
};

export function SitePopupContent({ site }: { site: HeritageSite }) {
  const locale = useLocale();
  const t = useTranslations('sites');
  const tCommon = useTranslations('common');
  const isAr = locale === 'ar';
  const name = isAr ? site.name_ar : site.name_en;
  const brief = isAr ? site.brief_ar : site.brief_en;
  const color = typeColors[site.type];
  const imageUrl = site.images[0];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      style={{ fontFamily: 'inherit' }}
    >
      {/* Site image - full width at top */}
      {imageUrl && (
        <div
          style={{
            height: 130,
            width: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px 12px 0 0',
          }}
        />
      )}

      {/* Gold accent bar */}
      <div
        style={{
          height: 3,
          background: 'linear-gradient(90deg, #C8A45C, #B8956A)',
        }}
      />

      {/* Content area with padding */}
      <div style={{ padding: '10px 14px 14px 14px' }}>
        <h3
          style={{
            color: '#1a1410',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.4,
            margin: '0 0 6px 0',
          }}
        >
          {name}
        </h3>

        {/* Badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          <span
            style={{
              display: 'inline-block',
              borderRadius: 9999,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 500,
              color: '#fff',
              backgroundColor: color,
            }}
          >
            {t(site.type)}
          </span>
          <span
            style={{
              display: 'inline-block',
              borderRadius: 9999,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 500,
              color: '#fff',
              backgroundColor: cityColors[site.city],
            }}
          >
            {t(site.city)}
          </span>
        </div>

        <p
          style={{
            color: '#555',
            fontSize: 12,
            lineHeight: isAr ? '1.7' : '1.5',
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {brief}
        </p>

        <Link
          href={`/sites/${site.id}` as any}
          style={{
            display: 'inline-block',
            borderRadius: 6,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #C8A45C 0%, #B8944C 100%)',
            boxShadow: '0 2px 4px rgba(200,164,92,0.3)',
            textDecoration: 'none',
            transition: 'filter 0.15s ease',
          }}
        >
          {tCommon('viewDetails')}
        </Link>
      </div>
    </div>
  );
}
