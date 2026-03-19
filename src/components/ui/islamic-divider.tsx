interface IslamicDividerProps {
  className?: string;
}

export function IslamicDivider({ className = '' }: IslamicDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="text-primary/60"
        fill="currentColor"
      >
        <path d="M8 0l2.5 5.5L16 8l-5.5 2.5L8 16l-2.5-5.5L0 8l5.5-2.5z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}
