'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageGalleryProps {
  siteName: string;
  images: string[];
}

// Fallback gradient for images that fail to load
const gradients = [
  'from-primary/60 to-accent/40',
  'from-accent/50 to-primary/30',
  'from-secondary to-primary/40',
  'from-primary/40 to-secondary',
];

export function ImageGallery({ siteName, images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Ensure we have at least 4 slots
  const slots = images.length >= 4 ? images : [...images, ...Array(4 - images.length).fill('')];
  const displaySlots = slots.slice(0, 4);

  const isExternal = (url: string) => url.startsWith('http');

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const renderImage = (url: string, index: number, fill?: boolean) => {
    if (!url || failedImages.has(index)) {
      return (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}>
          <div className="flex h-full items-center justify-center">
            <span className="rounded-lg bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
              {siteName}
            </span>
          </div>
        </div>
      );
    }

    if (isExternal(url)) {
      return (
        <Image
          src={url}
          alt={`${siteName} - ${index + 1}`}
          fill={fill ?? true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={index === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
          onError={() => handleImageError(index)}
        />
      );
    }

    // Local images — use img tag since they may not exist yet
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={`${siteName} - ${index + 1}`}
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => handleImageError(index)}
      />
    );
  };

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
          {renderImage(displaySlots[0], 0)}
        </button>

        {/* Smaller images */}
        {displaySlots.slice(1, 4).map((url, idx) => (
          <button
            key={idx + 1}
            type="button"
            onClick={() => setSelectedIndex(idx + 1)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {renderImage(url, idx + 1)}
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="sr-only">{siteName}</DialogTitle>
          {selectedIndex !== null && (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                {renderImage(displaySlots[selectedIndex], selectedIndex)}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 justify-center">
                {displaySlots.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative size-14 overflow-hidden rounded-md transition-opacity ${selectedIndex === idx ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  >
                    {url && isExternal(url) && !failedImages.has(idx) ? (
                      <Image src={url} alt="" fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
