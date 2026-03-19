/**
 * Full-width decorative gold divider with Islamic star pattern.
 * Used between sections on the home page for visual rhythm.
 */
export function IslamicStarDivider() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden py-6" aria-hidden="true">
      {/* Left gradient line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-primary/40" />

      {/* Central stars cluster */}
      <div className="mx-4 flex items-center gap-3">
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary/30">
          <polygon points="5,0 6.18,3.82 10,3.82 6.91,6.18 8.09,10 5,7.64 1.91,10 3.09,6.18 0,3.82 3.82,3.82" fill="currentColor" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary/50">
          <polygon points="8,0 9.88,6.12 16,6.12 11.06,9.88 12.94,16 8,12.24 3.06,16 4.94,9.88 0,6.12 6.12,6.12" fill="currentColor" />
        </svg>
        {/* Central eight-pointed star */}
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary/60">
          <polygon points="12,0 14,8 22,6 16,12 22,18 14,16 12,24 10,16 2,18 8,12 2,6 10,8" fill="currentColor" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary/50">
          <polygon points="8,0 9.88,6.12 16,6.12 11.06,9.88 12.94,16 8,12.24 3.06,16 4.94,9.88 0,6.12 6.12,6.12" fill="currentColor" />
        </svg>
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary/30">
          <polygon points="5,0 6.18,3.82 10,3.82 6.91,6.18 8.09,10 5,7.64 1.91,10 3.09,6.18 0,3.82 3.82,3.82" fill="currentColor" />
        </svg>
      </div>

      {/* Right gradient line */}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/30 to-primary/40" />
    </div>
  );
}
