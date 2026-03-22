'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { IslamicDivider } from '@/components/ui/islamic-divider';
import { ChevronDown } from 'lucide-react';

/* Generate deterministic particle positions so they don't shift on re-render */
function makeParticles(count: number) {
  const out: { x: number; y: number; size: number; delay: number; duration: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Simple seeded-ish values using index
    out.push({
      x: ((i * 37) % 100),
      y: ((i * 53) % 100),
      size: 2 + (i % 3),
      delay: (i * 0.7) % 5,
      duration: 4 + (i % 4),
    });
  }
  return out;
}

export function HeroSection() {
  const t = useTranslations('home');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const particles = useMemo(() => makeParticles(18), []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/sites/cave-hira.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-black/55 dark:bg-black/70" />
      </motion.div>

      {/* Islamic geometric CSS pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(200,164,92,0.15) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,0.15) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,0.15) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,0.15) 87.5%),
            linear-gradient(30deg, rgba(200,164,92,0.15) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,0.15) 87.5%),
            linear-gradient(150deg, rgba(200,164,92,0.15) 12%, transparent 12.5%, transparent 87%, rgba(200,164,92,0.15) 87.5%),
            linear-gradient(60deg, rgba(200,164,92,0.1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,0.1) 75%),
            linear-gradient(60deg, rgba(200,164,92,0.1) 25%, transparent 25.5%, transparent 75%, rgba(200,164,92,0.1) 75%)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0 -z-[5]" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Decorative arch SVG — elaborated with double arch */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
          aria-hidden="true"
        >
          <svg width="160" height="80" viewBox="0 0 160 80" fill="none" className="w-28 text-primary/40 sm:w-40">
            {/* Outer arch */}
            <path d="M5 78 Q80 0 155 78" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Inner arch */}
            <path d="M20 78 Q80 12 140 78" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Third decorative arch */}
            <path d="M35 78 Q80 24 125 78" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
            {/* Center ornament */}
            <circle cx="80" cy="22" r="4" fill="currentColor" opacity="0.5" />
            <circle cx="80" cy="22" r="7" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.3" />
            {/* Side dots */}
            <circle cx="40" cy="55" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="120" cy="55" r="2" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-shimmer text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ textShadow: '0 2px 30px rgba(200,164,92,0.45), 0 4px 60px rgba(0,0,0,0.3)' }}
        >
          {t('heroTitle')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/80 md:text-xl"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/map"
            className={cn(buttonVariants({ size: 'lg' }), 'px-6 text-base shadow-lg shadow-primary/20')}
          >
            {t('exploreSites')}
          </Link>
          <a
            href="#how-it-works"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-white/30 bg-white/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white'
            )}
          >
            {t('howItWorks')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <IslamicDivider className="[&_span]:bg-gradient-to-r [&_span]:from-transparent [&_span]:to-white/30 [&_svg]:text-white/40" />
        </motion.div>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-20 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
