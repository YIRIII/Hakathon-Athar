'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  siteId: string;
  className?: string;
}

function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('athar-favorites') || '[]');
  } catch {
    return [];
  }
}

function toggleFavorite(siteId: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(siteId);
  if (idx >= 0) {
    favs.splice(idx, 1);
    localStorage.setItem('athar-favorites', JSON.stringify(favs));
    return false;
  }
  favs.push(siteId);
  localStorage.setItem('athar-favorites', JSON.stringify(favs));
  return true;
}

export function FavoriteButton({ siteId, className = '' }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(getFavorites().includes(siteId));
  }, [siteId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(toggleFavorite(siteId));
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      className={`flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        animate={isFav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <HeartIcon
          className={`size-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
        />
      </motion.div>
    </motion.button>
  );
}
