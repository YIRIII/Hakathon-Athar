'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 end-6 z-50 flex size-11 items-center justify-center rounded-full border border-primary/20 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
