'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Branding */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-lg font-bold text-primary">أثر</span>
            <span className="text-xs text-muted-foreground">
              {t('tagline')}
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {t('about')}
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              {t('privacy')}
            </Link>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="mt-6 flex flex-col items-center gap-1 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{t('heritageCommission')}</span>
          <span>&copy; {new Date().getFullYear()} أثر — {t('copyright')}</span>
        </div>
      </div>
    </footer>
  );
}
