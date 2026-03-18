'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageGalleryProps {
  siteName: string;
  images: string[];
}

// Gradient palettes for placeholder images
const gradients = [
  'from-primary/60 to-accent/40',
  'from-accent/50 to-primary/30',
  'from-secondary to-primary/40',
  'from-primary/40 to-secondary',
  'from-accent/30 to-secondary',
];

export function ImageGallery({ siteName, images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Ensure we have at least 4 placeholder slots
  const slots = images.length >= 4 ? images : [...images, ...Array(4 - images.length).fill('')];
  const displaySlots = slots.slice(0, 4);

  return (
    <>
      {/* Grid: 1 large + 3 small */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2">
        {/* Large image */}
        <button
          type="button"
          onClick={() => setSelectedIndex(0)}
          className="col-span-2 row-span-2 group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradients[0]} transition-transform duration-300 group-hover:scale-105`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-lg bg-background/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
              {siteName}
            </span>
          </div>
        </button>

        {/* Smaller images */}
        {displaySlots.slice(1, 4).map((_, idx) => (
          <button
            key={idx + 1}
            type="button"
            onClick={() => setSelectedIndex(idx + 1)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradients[(idx + 1) % gradients.length]} transition-transform duration-300 group-hover:scale-105`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded bg-background/60 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                {idx + 2}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="sr-only">{siteName}</DialogTitle>
          {selectedIndex !== null && (
            <div className="space-y-4">
              <div
                className={`aspect-[16/10] w-full rounded-lg bg-gradient-to-br ${gradients[selectedIndex % gradients.length]}`}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="rounded-lg bg-background/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                    {siteName}
                  </span>
                </div>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 justify-center">
                {displaySlots.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`size-12 rounded-md bg-gradient-to-br ${gradients[idx % gradients.length]} transition-opacity ${selectedIndex === idx ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
