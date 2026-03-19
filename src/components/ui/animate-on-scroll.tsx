'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Variant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

interface AnimateOnScrollProps {
  variant?: Variant;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function AnimateOnScroll({
  variant = 'fade-up',
  delay = 0,
  children,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
