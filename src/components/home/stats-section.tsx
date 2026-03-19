'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ target, suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 12, suffix: '', key: 'sites' },
  { value: 18500000, suffix: '+', key: 'visitors' },
  { value: 48, suffix: '+', key: 'stories' },
] as const;

export function StatsSection() {
  const t = useTranslations('home.stats');

  return (
    <section className="relative overflow-hidden bg-secondary/50 py-16 md:py-24">
      {/* Subtle Islamic pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(30deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,1) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,1) 87.5%),
            linear-gradient(60deg, rgba(200,164,92,1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,1) 75%),
            linear-gradient(60deg, rgba(200,164,92,1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,1) 75%)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, idx) => (
            <AnimateOnScroll key={stat.key} variant="scale-up" delay={idx * 0.15}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-5xl font-bold text-primary md:text-6xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                {/* Gold underline decoration */}
                <div className="mx-auto mt-1 h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <span className="mt-1 text-base font-medium text-muted-foreground">
                  {t(stat.key)}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
