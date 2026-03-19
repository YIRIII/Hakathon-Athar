'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { sites } from '@/data/sites';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FEATURED_IDS = [
  'cave-hira',
  'quba-mosque',
  'makkah-museum',
  'uhud-mountain',
  'qiblatain-mosque',
  'dar-al-madinah-museum',
];

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
};

export function FeaturedSites() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  const featured = FEATURED_IDS.map((id) => sites.find((s) => s.id === id)!).filter(
    Boolean
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {t('home.featuredSites')}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-primary/30" />
            <span className="size-1.5 rotate-45 bg-primary/50" />
            <span className="h-px w-10 bg-primary/30" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((site) => (
            <Link key={site.id} href={`/sites/${site.id}`} className="group block">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:ring-1 group-hover:ring-primary/30 group-hover:shadow-lg">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {site.images[0]?.startsWith('http') ? (
                    <Image
                      src={site.images[0]}
                      alt={isAr ? site.name_ar : site.name_en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 start-3 flex flex-wrap gap-1.5">
                    <Badge className={`${typeColorMap[site.type]} text-[10px] shadow-sm`}>
                      {t(`sites.${site.type}`)}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 bg-black/30 text-[10px] text-white backdrop-blur-sm">
                      {t(`sites.${site.city}`)}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-snug">
                    {isAr ? site.name_ar : site.name_en}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {isAr ? site.brief_ar : site.brief_en}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
