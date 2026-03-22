'use client';

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-border/50 bg-card p-4">
      <div className="mb-3 h-36 rounded-lg bg-muted" />
      <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
      <div className="h-3 w-1/2 rounded bg-muted" />
    </div>
  );
}

export function SkeletonStampCard() {
  return (
    <div className="animate-pulse rounded-xl border border-border/50 bg-card p-4 text-center">
      <div className="mx-auto mb-3 size-16 rounded-full bg-muted" />
      <div className="mx-auto mb-2 h-4 w-2/3 rounded bg-muted" />
      <div className="mx-auto h-3 w-1/2 rounded bg-muted" />
    </div>
  );
}

export function SkeletonImageGallery() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-64 rounded-xl bg-muted" />
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
