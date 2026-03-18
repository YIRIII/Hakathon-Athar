'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background">
      {/* Islamic geometric CSS pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(60deg, var(--primary) 25%, transparent 25.5%, transparent 75%, var(--primary) 75%, var(--primary)),
            linear-gradient(60deg, var(--primary) 25%, transparent 25.5%, transparent 75%, var(--primary) 75%, var(--primary))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          opacity: 0.05,
        }}
      />

      {/* Subtle radial gradient for depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Decorative line */}
        <div className="mb-8 flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-12 bg-primary/40" />
          <span className="size-2 rotate-45 border border-primary/40" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {t('heroTitle')}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          {t('heroSubtitle')}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/map"
            className={cn(buttonVariants({ size: 'lg' }), 'px-6 text-base')}
          >
            {t('exploreSites')}
          </Link>
          <a
            href="#how-it-works"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'px-6 text-base'
            )}
          >
            {t('howItWorks')}
          </a>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-16 bg-primary/20" />
          <span className="size-1.5 rotate-45 bg-primary/30" />
          <span className="h-px w-16 bg-primary/20" />
        </div>
      </div>
    </section>
  );
}
