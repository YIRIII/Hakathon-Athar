'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Branding */}
          <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-1">
            <span className="text-2xl font-bold text-primary">أثر</span>
            <span className="text-sm text-muted-foreground">
              {t('tagline')}
            </span>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">{t('features')}</span>
            <nav className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <Link href="/map" className="transition-colors hover:text-foreground">
                {t('map')}
              </Link>
              <Link href="/passport" className="transition-colors hover:text-foreground">
                {t('passport')}
              </Link>
              <Link href="/chat" className="transition-colors hover:text-foreground">
                {t('chatbot')}
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">{t('about')}</span>
            <nav className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <Link href="/about" className="transition-colors hover:text-foreground">
                {t('about')}
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground">
                {t('privacy')}
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground">
                {t('termsOfUse')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">{t('contact')}</span>
            <nav className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <span>info@athar.sa</span>
            </nav>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-col items-center gap-1 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>{t('heritageCommission')}</span>
          <span>&copy; {new Date().getFullYear()} أثر — {t('copyright')}</span>
        </div>
      </div>
    </footer>
  );
}
