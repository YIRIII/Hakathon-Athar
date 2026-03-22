'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { sites } from '@/data/sites';
import { parseAtharQR } from '@/lib/qr-parser';
import { useRouter } from '@/i18n/routing';
import ScanSuccess from '@/components/qr/scan-success';

// Dynamic import — qr-scanner uses browser-only APIs
const QRScannerView = dynamic(
  () => import('@/components/qr/qr-scanner-view'),
  { ssr: false },
);

type ScanState = 'idle' | 'camera' | 'scanning' | 'success' | 'error';

export default function ScanPage() {
  const t = useTranslations('scan');
  const locale = useLocale();
  const router = useRouter();

  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedSite, setScannedSite] = useState<(typeof sites)[0] | null>(null);
  const [scanError, setScanError] = useState<string>('');

  // ── Handle QR data from scanner ──────────────────────────────────────
  const handleQRData = useCallback(
    (data: string) => {
      const parsed = parseAtharQR(data);

      if (parsed.valid && parsed.siteId) {
        const site = sites.find((s) => s.id === parsed.siteId);
        if (site) {
          setScannedSite(site);
          setScanState('success');
          // Celebration!
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C8A45C', '#1a3a2a', '#DAA520', '#FFFFFF'],
          });
          toast.success(
            locale === 'ar' ? `تم جمع طابع ${site.name_ar}!` : `Stamp collected: ${site.name_en}!`,
            { duration: 4000 }
          );
          return;
        }
      }

      // Invalid QR
      setScanError(parsed.error ?? 'not-athar');
      setScanState('error');
    },
    [],
  );

  // ── Simulate scan (for desktop / testing) ────────────────────────────
  const handleSimulateScan = () => {
    setScanState('scanning');
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    setTimeout(() => {
      setScannedSite(randomSite);
      setScanState('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8A45C', '#1a3a2a', '#DAA520', '#FFFFFF'],
      });
      toast.success(
        locale === 'ar' ? `تم جمع طابع ${randomSite.name_ar}!` : `Stamp collected: ${randomSite.name_en}!`,
        { duration: 4000 }
      );
    }, 1500);
  };

  // ── Start camera ─────────────────────────────────────────────────────
  const handleStartCamera = () => {
    setScanState('camera');
    setScanError('');
    setScannedSite(null);
  };

  // ── Reset to idle ────────────────────────────────────────────────────
  const handleReset = () => {
    setScanState('idle');
    setScannedSite(null);
    setScanError('');
  };

  // ── Auto-navigate on success ─────────────────────────────────────────
  const handleNavigate = useCallback(() => {
    if (scannedSite) {
      router.push(`/sites/${scannedSite.id}`);
    }
  }, [scannedSite, router]);

  // ── Error message helper ─────────────────────────────────────────────
  const errorMessage = (() => {
    switch (scanError) {
      case 'unknown-site':
        return t('errorUnknownSite');
      case 'not-athar':
        return t('errorNotAthar');
      case 'empty':
        return t('errorEmpty');
      default:
        return t('errorNotAthar');
    }
  })();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Page title */}
      <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
        {t('title')}
      </h1>

      {/* ── Camera Scanner ──────────────────────────────────────────── */}
      {scanState === 'camera' && (
        <div className="mb-6">
          <QRScannerView onScan={handleQRData} active={scanState === 'camera'} />
        </div>
      )}

      {/* ── Idle state — show placeholder viewport ──────────────────── */}
      {scanState === 'idle' && (
        <div className="relative mx-auto mb-6 aspect-square max-w-sm">
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20" />

          {/* Gold corners */}
          <div className="absolute start-0 top-0 h-12 w-12">
            <div className="absolute start-0 top-0 h-full w-1 rounded-full bg-primary" />
            <div className="absolute start-0 top-0 h-1 w-full rounded-full bg-primary" />
          </div>
          <div className="absolute end-0 top-0 h-12 w-12">
            <div className="absolute end-0 top-0 h-full w-1 rounded-full bg-primary" />
            <div className="absolute end-0 top-0 h-1 w-full rounded-full bg-primary" />
          </div>
          <div className="absolute bottom-0 start-0 h-12 w-12">
            <div className="absolute bottom-0 start-0 h-full w-1 rounded-full bg-primary" />
            <div className="absolute bottom-0 start-0 h-1 w-full rounded-full bg-primary" />
          </div>
          <div className="absolute bottom-0 end-0 h-12 w-12">
            <div className="absolute bottom-0 end-0 h-full w-1 rounded-full bg-primary" />
            <div className="absolute bottom-0 end-0 h-1 w-full rounded-full bg-primary" />
          </div>

          {/* QR icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <svg
              className="size-16 text-muted-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
              />
            </svg>
            <p className="px-8 text-center text-sm text-muted-foreground">
              {t('instruction')}
            </p>
          </div>
        </div>
      )}

      {/* ── Scanning spinner (simulate mode) ────────────────────────── */}
      {scanState === 'scanning' && (
        <div className="relative mx-auto mb-6 aspect-square max-w-sm">
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-primary">{t('scanning')}</p>
          </div>
        </div>
      )}

      {/* ── Scan success card ───────────────────────────────────────── */}
      {scanState === 'success' && scannedSite && (
        <ScanSuccess site={scannedSite} onNavigate={handleNavigate} />
      )}

      {/* ── Error card ──────────────────────────────────────────────── */}
      {scanState === 'error' && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <svg
            className="mx-auto mb-3 size-12 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p className="mb-2 text-sm font-semibold text-destructive">
            {t('errorTitle')}
          </p>
          <p className="mb-4 text-xs text-muted-foreground">{errorMessage}</p>
          <Button variant="outline" size="sm" onClick={handleReset}>
            {t('tryAgain')}
          </Button>
        </div>
      )}

      {/* ── Action buttons ──────────────────────────────────────────── */}
      <div className="space-y-3 text-center">
        {scanState === 'idle' && (
          <>
            <Button
              size="lg"
              onClick={handleStartCamera}
              className="w-full max-w-sm"
            >
              {t('startCamera')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSimulateScan}
              className="w-full max-w-sm"
            >
              {t('simulateScan')}
            </Button>
          </>
        )}

        {scanState === 'camera' && (
          <Button variant="outline" onClick={handleReset} className="w-full max-w-sm">
            {t('stopCamera')}
          </Button>
        )}

        {scanState === 'success' && (
          <Button variant="outline" onClick={handleReset} className="w-full max-w-sm">
            {t('scanAnother')}
          </Button>
        )}
      </div>
    </div>
  );
}
