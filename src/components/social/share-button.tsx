'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ShareDialog } from '@/components/social/share-dialog';
import { trackShare } from '@/lib/share-analytics';
import { Share2Icon } from 'lucide-react';

interface ShareButtonProps {
  /** Display title for the shared content */
  title: string;
  /** Short description text */
  text: string;
  /** Full URL to share */
  url: string;
  /** Site ID for analytics */
  siteId: string;
  /** What is being shared */
  shareType: 'site' | 'certificate';
  /** Optional custom label — defaults to i18n share.share */
  label?: string;
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Extra class names */
  className?: string;
}

export function ShareButton({
  title,
  text,
  url,
  siteId,
  shareType,
  label,
  variant = 'outline',
  size = 'default',
  className,
}: ShareButtonProps) {
  const t = useTranslations('share');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleShare = useCallback(async () => {
    // Try native Web Share API first
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        trackShare('native', siteId, shareType);
        return;
      } catch (err: unknown) {
        // User cancelled or API failed — fall through to dialog
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }

    // Fallback: open share dialog
    setDialogOpen(true);
  }, [title, text, url, siteId, shareType]);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleShare}
        className={className}
      >
        <Share2Icon className="size-4" />
        {size !== 'icon' && (label ?? t('share'))}
      </Button>

      <ShareDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={title}
        text={text}
        url={url}
        siteId={siteId}
        shareType={shareType}
      />
    </>
  );
}
