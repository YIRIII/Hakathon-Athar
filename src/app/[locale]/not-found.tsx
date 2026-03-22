'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CompassIcon, MapIcon, HomeIcon } from 'lucide-react';

export default function NotFound() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Islamic geometric background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
        <svg className="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo404" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo404)" className="text-primary" />
        </svg>
      </div>

      {/* Compass icon */}
      <div className="relative mb-8 flex size-24 items-center justify-center rounded-full bg-primary/10">
        <CompassIcon className="size-12 text-primary animate-[spin_8s_linear_infinite]" />
        <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/20 animate-[spin_12s_linear_infinite_reverse]" />
      </div>

      {/* 404 text */}
      <h1 className="mb-2 text-7xl font-bold text-primary/80">٤٠٤</h1>
      <h2 className="mb-3 text-2xl font-semibold text-foreground">
        {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        {isAr
          ? 'يبدو أنك ضللت الطريق في رحلتك التراثية. دعنا نعيدك إلى المسار الصحيح.'
          : 'It seems you\'ve wandered off the heritage trail. Let us guide you back.'}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={`/${locale}`}>
          <Button size="lg" className="gap-2">
            <HomeIcon className="size-4" />
            {isAr ? 'الصفحة الرئيسية' : 'Home'}
          </Button>
        </Link>
        <Link href={`/${locale}/map`}>
          <Button size="lg" variant="outline" className="gap-2">
            <MapIcon className="size-4" />
            {isAr ? 'خريطة المواقع' : 'Explore Map'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
