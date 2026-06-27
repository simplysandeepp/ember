type Props = {
  size?: 'sm' | 'lg';
  wordmark?: boolean;
};

/**
 * "S" ribbon mark with arrow tips and a subtle gradient.
 * Gradient stops use currentColor so it adapts to light/dark automatically.
 */
function Mark({ id, className }: { id: string; className: string }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M74 36 C74 18 26 18 26 42 C26 62 74 60 74 84 C74 106 26 106 26 86"
        stroke={`url(#${id})`}
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ size = 'sm', wordmark = true }: Props) {
  if (size === 'lg') {
    return (
      <Mark
        id="sp-mark-lg"
        className="h-14 w-auto text-neutral-900 dark:text-neutral-50 shrink-0"
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Mark
        id="sp-mark-sm"
        className="h-7 w-auto text-neutral-900 dark:text-neutral-100 shrink-0"
      />
      {wordmark && (
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          sp.
        </span>
      )}
    </div>
  );
}
