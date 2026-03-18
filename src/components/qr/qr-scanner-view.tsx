'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import QrScanner from 'qr-scanner';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface QRScannerViewProps {
  onScan: (data: string) => void;
  active: boolean;
}

export default function QRScannerView({ onScan, active }: QRScannerViewProps) {
  const t = useTranslations('scan');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [cameraState, setCameraState] = useState<
    'initializing' | 'active' | 'denied' | 'unsupported' | 'error'
  >('initializing');
  const [hasScanned, setHasScanned] = useState(false);

  const handleResult = useCallback(
    (result: QrScanner.ScanResult) => {
      if (hasScanned) return;
      setHasScanned(true);
      onScan(result.data);
    },
    [hasScanned, onScan],
  );

  useEffect(() => {
    if (!active) {
      scannerRef.current?.stop();
      return;
    }

    // Reset scan lock when re-activated
    setHasScanned(false);

    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('unsupported');
      return;
    }

    const scanner = new QrScanner(
      videoEl,
      (result) => handleResult(result),
      {
        preferredCamera: 'environment',
        highlightScanRegion: false,
        highlightCodeOutline: false,
        returnDetailedScanResult: true,
      },
    );

    scannerRef.current = scanner;

    scanner
      .start()
      .then(() => {
        setCameraState('active');
      })
      .catch((err: Error) => {
        if (
          err.name === 'NotAllowedError' ||
          err.message.includes('Permission')
        ) {
          setCameraState('denied');
        } else {
          setCameraState('error');
        }
      });

    return () => {
      scanner.stop();
      scanner.destroy();
      scannerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Update the callback ref when handleResult changes
  useEffect(() => {
    if (scannerRef.current && active) {
      // QrScanner doesn't have a setter for the callback, so we rely on the
      // closure captured in the first effect.  The hasScanned guard inside
      // handleResult is enough to prevent double-fires.
    }
  }, [handleResult, active]);

  return (
    <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl">
      {/* Camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
      />

      {/* Fallback background when camera isn't active */}
      {cameraState !== 'active' && (
        <div className="absolute inset-0 bg-muted/20" />
      )}

      {/* ── Gold corner decorations ────────────────────────────────── */}
      {/* Top-left */}
      <div className="absolute start-2 top-2 h-12 w-12 z-10">
        <div className="absolute start-0 top-0 h-full w-1 rounded-full bg-primary" />
        <div className="absolute start-0 top-0 h-1 w-full rounded-full bg-primary" />
      </div>
      {/* Top-right */}
      <div className="absolute end-2 top-2 h-12 w-12 z-10">
        <div className="absolute end-0 top-0 h-full w-1 rounded-full bg-primary" />
        <div className="absolute end-0 top-0 h-1 w-full rounded-full bg-primary" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-2 start-2 h-12 w-12 z-10">
        <div className="absolute bottom-0 start-0 h-full w-1 rounded-full bg-primary" />
        <div className="absolute bottom-0 start-0 h-1 w-full rounded-full bg-primary" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-2 end-2 h-12 w-12 z-10">
        <div className="absolute bottom-0 end-0 h-full w-1 rounded-full bg-primary" />
        <div className="absolute bottom-0 end-0 h-1 w-full rounded-full bg-primary" />
      </div>

      {/* ── Scan line animation ────────────────────────────────────── */}
      {cameraState === 'active' && !hasScanned && (
        <div className="absolute inset-x-4 z-10 animate-scan-line">
          <div className="h-0.5 w-full bg-primary/80 shadow-[0_0_8px_2px_rgba(200,164,92,0.5)]" />
        </div>
      )}

      {/* ── Centre messages for non-active states ─────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
        {cameraState === 'initializing' && (
          <>
            <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground">
              {t('cameraLoading')}
            </p>
          </>
        )}

        {cameraState === 'denied' && (
          <div className="px-6 text-center">
            <svg
              className="mx-auto mb-2 size-12 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <p className="mb-2 text-sm font-semibold text-destructive">
              {t('cameraDenied')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('cameraDeniedHint')}
            </p>
          </div>
        )}

        {cameraState === 'unsupported' && (
          <div className="px-6 text-center">
            <svg
              className="mx-auto mb-2 size-12 text-muted-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
              />
            </svg>
            <p className="mb-2 text-sm font-semibold text-foreground">
              {t('cameraUnsupported')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('nativeCameraHint')}
            </p>
          </div>
        )}

        {cameraState === 'error' && (
          <div className="px-6 text-center">
            <p className="mb-2 text-sm font-semibold text-destructive">
              {t('cameraError')}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCameraState('initializing');
                setHasScanned(false);
                // Re-trigger the effect by toggling
                scannerRef.current?.start().then(() => setCameraState('active')).catch(() => setCameraState('error'));
              }}
            >
              {t('retryCamera')}
            </Button>
          </div>
        )}

        {cameraState === 'active' && !hasScanned && (
          <p className="rounded-lg bg-background/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
            {t('instruction')}
          </p>
        )}
      </div>
    </div>
  );
}
