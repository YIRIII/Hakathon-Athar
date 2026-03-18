'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { stamps } from '@/data/stamps';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tc = useTranslations('common');
  const locale = useLocale();

  const earnedCount = stamps.filter((s) => s.earned).length;

  // Non-functional toggles
  const [newSiteAlerts, setNewSiteAlerts] = useState(true);
  const [stampReminders, setStampReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Profile header */}
      <div className="mb-8 flex flex-col items-center gap-4">
        {/* Avatar placeholder */}
        <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
          <svg
            className="size-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">{t('displayName')}</h1>
          <p className="text-sm text-muted-foreground">heritage.explorer@athar.app</p>
        </div>
      </div>

      {/* Visit Stats */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t('visitStats')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{earnedCount}</p>
              <p className="text-[11px] text-muted-foreground">{t('sitesVisited')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{earnedCount}</p>
              <p className="text-[11px] text-muted-foreground">{t('stampsCollected')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{earnedCount}</p>
              <p className="text-[11px] text-muted-foreground">{t('certificatesEarned')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Preference */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t('languagePref')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'العربية' : 'English'}
            </span>
            <Link href="/" locale={locale === 'ar' ? 'en' : 'ar'}>
              <Button variant="outline" size="sm">
                {tc('language')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t('notifications')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow
            label={t('newSiteAlerts')}
            checked={newSiteAlerts}
            onChange={setNewSiteAlerts}
          />
          <Separator />
          <ToggleRow
            label={t('stampReminders')}
            checked={stampReminders}
            onChange={setStampReminders}
          />
          <Separator />
          <ToggleRow
            label={t('weeklyDigest')}
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </CardContent>
      </Card>

      {/* Theme Preference */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t('themePref')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{tc('toggleTheme')}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-background shadow ring-0 transition-transform ${
            checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
