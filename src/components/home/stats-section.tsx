'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

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
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center gap-2 text-center">
              <span className="text-4xl font-bold text-primary md:text-5xl">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-base font-medium text-muted-foreground">
                {t(stat.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
