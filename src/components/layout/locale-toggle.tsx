'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleToggle() {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="text-xs font-medium"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}
