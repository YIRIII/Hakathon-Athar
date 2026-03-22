'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { IslamicDivider } from '@/components/ui/islamic-divider';
import { MapPinIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeColorMap: Record<string, string> = {
  religious: 'bg-accent text-accent-foreground',
  archaeological: 'bg-primary text-primary-foreground',
  cultural: 'bg-secondary text-secondary-foreground',
  museum: 'bg-muted text-muted-foreground',
};

const gradients = [
  'from-primary/40 to-accent/30',
  'from-accent/30 to-primary/20',
  'from-secondary/40 to-primary/30',
  'from-primary/30 to-secondary/20',
  'from-accent/20 to-secondary/30',
  'from-secondary/30 to-accent/20',
];

export function FeaturedSites() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageError = useCallback((siteId: string) => {
    setFailedImages((prev) => new Set(prev).add(siteId));
  }, []);

  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <AnimateOnScroll variant="fade-up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t('home.featuredSites')}
            </h2>
            <IslamicDivider className="mt-4" />
          </div>
        </AnimateOnScroll>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Scroll arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -start-3 top-1/2 z-10 hidden size-9 -translate-y-1/2 rounded-full bg-background/90 shadow-md backdrop-blur-sm md:flex"
            onClick={() => scroll(isAr ? 'right' : 'left')}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -end-3 top-1/2 z-10 hidden size-9 -translate-y-1/2 rounded-full bg-background/90 shadow-md backdrop-blur-sm md:flex"
            onClick={() => scroll(isAr ? 'left' : 'right')}
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </Button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          >
            {sites.map((site, idx) => (
              <div
                key={site.id}
                className="w-[240px] flex-shrink-0 snap-start sm:w-[280px]"
              >
                <Link href={`/sites/${site.id}`} className="group block">
                  <Card className="h-full overflow-hidden border border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:ring-1 group-hover:ring-primary/30">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
                      {site.images[0] && !failedImages.has(site.id) ? (
                        <Image
                          src={site.images[0]}
                          alt={isAr ? site.name_ar : site.name_en}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="280px"
                          onError={() => handleImageError(site.id)}
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]}`}>
                          <div className="flex h-full items-center justify-center">
                            <span className="rounded-lg bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                              {isAr ? site.name_ar : site.name_en}
                            </span>
                          </div>
                        </div>
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
                      {/* Hover map pin icon */}
                      <div className="absolute bottom-3 end-3 flex size-8 items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <MapPinIcon className="size-4" />
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="truncate text-lg leading-snug">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
