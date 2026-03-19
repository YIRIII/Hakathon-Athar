import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const site = searchParams.get('site') ?? 'أثر';
  const type = searchParams.get('type') ?? 'religious';
  const locale = searchParams.get('locale') ?? 'ar';

  const isAr = locale === 'ar';
  const tagline = isAr
    ? 'اكتشف تراث مكة والمدينة'
    : 'Discover the heritage of Makkah & Madinah';
  const brandName = isAr ? 'أثر' : 'Athar';

  const typeLabels: Record<string, { ar: string; en: string }> = {
    religious: { ar: 'ديني', en: 'Religious' },
    archaeological: { ar: 'أثري', en: 'Archaeological' },
    cultural: { ar: 'ثقافي', en: 'Cultural' },
    museum: { ar: 'متحف', en: 'Museum' },
  };
  const typeLabel =
    typeLabels[type]?.[isAr ? 'ar' : 'en'] ?? typeLabels.religious[isAr ? 'ar' : 'en'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A1410 0%, #2D1F12 30%, #3D2A18 60%, #1A1410 100%)',
          fontFamily: 'sans-serif',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            border: '2px solid rgba(200, 164, 92, 0.4)',
            borderRadius: '16px',
            display: 'flex',
          }}
        />

        {/* Inner decorative frame */}
        <div
          style={{
            position: 'absolute',
            inset: '28px',
            border: '1px solid rgba(200, 164, 92, 0.2)',
            borderRadius: '12px',
            display: 'flex',
          }}
        />

        {/* Top ornament */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'rgba(200, 164, 92, 0.6)', display: 'flex' }} />
          <div
            style={{
              width: '10px',
              height: '10px',
              border: '1px solid rgba(200, 164, 92, 0.6)',
              transform: 'rotate(45deg)',
              display: 'flex',
            }}
          />
          <div style={{ width: '40px', height: '1px', background: 'rgba(200, 164, 92, 0.6)', display: 'flex' }} />
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(200, 164, 92, 0.8)',
            letterSpacing: '4px',
            marginBottom: '32px',
            display: 'flex',
          }}
        >
          {brandName}
        </div>

        {/* Type badge */}
        <div
          style={{
            fontSize: '16px',
            color: '#C8A45C',
            padding: '6px 20px',
            border: '1px solid rgba(200, 164, 92, 0.4)',
            borderRadius: '999px',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          {typeLabel}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          {site}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
          }}
        >
          {tagline}
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'rgba(200, 164, 92, 0.6)', display: 'flex' }} />
          <div
            style={{
              width: '10px',
              height: '10px',
              border: '1px solid rgba(200, 164, 92, 0.6)',
              transform: 'rotate(45deg)',
              display: 'flex',
            }}
          />
          <div style={{ width: '40px', height: '1px', background: 'rgba(200, 164, 92, 0.6)', display: 'flex' }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
