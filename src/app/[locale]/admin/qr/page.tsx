'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type QRCodeStyling from 'qr-code-styling';
import { sites } from '@/data/sites';
import { qrCodes, type QRCode } from '@/data/qr-codes';
import { renderQRToElement, downloadQR } from '@/lib/qr-generator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  QrCodeIcon,
  DownloadIcon,
  PrinterIcon,
  FilterIcon,
} from 'lucide-react';

type QRTypeFilter = 'all' | 'entry' | 'internal';
type CityFilter = 'all' | 'makkah' | 'madinah';

export default function AdminQRPage() {
  const t = useTranslations('qr');
  const tSites = useTranslations('sites');
  const locale = useLocale();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeQR, setActiveQR] = useState<QRCode | null>(null);
  const [qrInstance, setQrInstance] = useState<QRCodeStyling | null>(null);
  const [generating, setGenerating] = useState(false);
  const [typeFilter, setTypeFilter] = useState<QRTypeFilter>('all');
  const [cityFilter, setCityFilter] = useState<CityFilter>('all');

  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Build a site lookup map
  const siteMap = useMemo(() => {
    const map = new Map<string, (typeof sites)[0]>();
    for (const site of sites) {
      map.set(site.id, site);
    }
    return map;
  }, []);

  // Filter QR codes
  const filteredQRCodes = useMemo(() => {
    return qrCodes.filter((qr) => {
      if (typeFilter !== 'all' && qr.type !== typeFilter) return false;
      if (cityFilter !== 'all') {
        const site = siteMap.get(qr.siteId);
        if (!site || site.city !== cityFilter) return false;
      }
      return true;
    });
  }, [typeFilter, cityFilter, siteMap]);

  // Group QR codes by site for display
  const groupedBySite = useMemo(() => {
    const groups = new Map<string, QRCode[]>();
    for (const qr of filteredQRCodes) {
      const existing = groups.get(qr.siteId) ?? [];
      existing.push(qr);
      groups.set(qr.siteId, existing);
    }
    return groups;
  }, [filteredQRCodes]);

  const handleGenerateQR = useCallback(
    async (qr: QRCode) => {
      setActiveQR(qr);
      setDialogOpen(true);
      setGenerating(true);

      // Wait for dialog to mount and ref to be available
      await new Promise((r) => setTimeout(r, 150));

      if (qrContainerRef.current) {
        const baseUrl = 'https://athar.sa';
        const instance = await renderQRToElement(qrContainerRef.current, {
          url: `${baseUrl}${qr.url}`,
          size: 300,
        });
        setQrInstance(instance);
      }
      setGenerating(false);
    },
    []
  );

  const handleDownloadPNG = useCallback(async () => {
    if (!qrInstance || !activeQR) return;
    const site = siteMap.get(activeQR.siteId);
    const filename = `athar-qr-${activeQR.id}`;
    // Reset to standard size before download
    qrInstance.update({ width: 300, height: 300 });
    await new Promise((r) => setTimeout(r, 50));
    await downloadQR(qrInstance, filename);
  }, [qrInstance, activeQR, siteMap]);

  const handleDownloadPrint = useCallback(async () => {
    if (!qrInstance || !activeQR) return;
    const filename = `athar-qr-print-${activeQR.id}`;
    await downloadQR(qrInstance, filename, 1200);
    // Reset back to display size
    qrInstance.update({ width: 300, height: 300 });
  }, [qrInstance, activeQR]);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setActiveQR(null);
    setQrInstance(null);
  }, []);

  const getSiteName = (siteId: string) => {
    const site = siteMap.get(siteId);
    if (!site) return siteId;
    return locale === 'ar' ? site.name_ar : site.name_en;
  };

  const getQRLabel = (qr: QRCode) => {
    return locale === 'ar' ? qr.label_ar : qr.label_en;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {t('filterByType')}:
          </span>
          <Tabs
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as QRTypeFilter)}
          >
            <TabsList>
              <TabsTrigger value="all">{t('allTypes')}</TabsTrigger>
              <TabsTrigger value="entry">{t('entryQR')}</TabsTrigger>
              <TabsTrigger value="internal">{t('internalQR')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t('filterByCity')}:
          </span>
          <Tabs
            value={cityFilter}
            onValueChange={(v) => setCityFilter(v as CityFilter)}
          >
            <TabsList>
              <TabsTrigger value="all">{t('allCities')}</TabsTrigger>
              <TabsTrigger value="makkah">{tSites('makkah')}</TabsTrigger>
              <TabsTrigger value="madinah">{tSites('madinah')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex gap-4 text-sm text-muted-foreground">
        <span>
          {t('totalQRCodes')}: <strong>{filteredQRCodes.length}</strong>
        </span>
        <span>
          {t('sitesCount')}:{' '}
          <strong>{groupedBySite.size}</strong>
        </span>
      </div>

      {/* Site Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from(groupedBySite.entries()).map(([siteId, siteQRs]) => {
          const site = siteMap.get(siteId);
          if (!site) return null;

          return (
            <Card key={siteId}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCodeIcon className="size-5 text-primary" />
                  <span className="truncate">
                    {locale === 'ar' ? site.name_ar : site.name_en}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="outline">{tSites(site.city)}</Badge>
                  <Badge variant="secondary">{tSites(site.type)}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {siteQRs.map((qr) => (
                    <div
                      key={qr.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border/50 p-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-foreground">
                          {getQRLabel(qr)}
                        </p>
                        <Badge
                          variant={
                            qr.type === 'entry' ? 'default' : 'secondary'
                          }
                          className="mt-1"
                        >
                          {qr.type === 'entry'
                            ? t('entryQR')
                            : t('internalQR')}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateQR(qr)}
                      >
                        <QrCodeIcon className="size-3.5" />
                        <span>{t('generate')}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {groupedBySite.size === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          {t('noResults')}
        </div>
      )}

      {/* QR Preview Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeQR ? getQRLabel(activeQR) : t('qrPreview')}
            </DialogTitle>
            <DialogDescription>
              {activeQR && getSiteName(activeQR.siteId)}
            </DialogDescription>
          </DialogHeader>

          {/* QR Code Container */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div
              ref={qrContainerRef}
              className="flex min-h-[300px] items-center justify-center"
            >
              {generating && (
                <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              )}
            </div>

            {activeQR && (
              <p className="text-center text-xs text-muted-foreground break-all">
                {`https://athar.sa${activeQR.url}`}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDownloadPNG}
              disabled={!qrInstance}
            >
              <DownloadIcon className="size-4" />
              <span>{t('downloadPNG')}</span>
            </Button>
            <Button onClick={handleDownloadPrint} disabled={!qrInstance}>
              <PrinterIcon className="size-4" />
              <span>{t('downloadPrint')}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
