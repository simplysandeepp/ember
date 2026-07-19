// Design-system color tokens.
// Prefer these over ad-hoc `text-neutral-*` / `bg-neutral-*` classes so
// palette shifts stay a single-file change.
//
// Convention: `fg*` = foreground text, `bg*` = background, `border*` = borders,
// `muted` = lower-emphasis, `subtle` = decorative/tertiary.
export const colors = {
  // Text
  fg: 'text-neutral-900 dark:text-neutral-100',
  fgMuted: 'text-neutral-500 dark:text-neutral-400',
  fgSubtle: 'text-neutral-400 dark:text-neutral-500',
  fgFaint: 'text-neutral-300 dark:text-neutral-600',
  fgInvert: 'text-white dark:text-neutral-900',

  // Backgrounds
  bg: 'bg-white dark:bg-neutral-950',
  bgMuted: 'bg-neutral-50 dark:bg-neutral-900',
  bgSubtle: 'bg-neutral-100 dark:bg-neutral-800',
  bgInvert: 'bg-neutral-900 dark:bg-neutral-100',

  // Borders
  border: 'border-neutral-100 dark:border-neutral-800',
  borderStrong: 'border-neutral-200 dark:border-neutral-700',

  // Hover interactions
  hoverFg: 'hover:text-neutral-900 dark:hover:text-neutral-100',
  hoverBg: 'hover:bg-neutral-50 dark:hover:bg-neutral-900/40',
} as const;
