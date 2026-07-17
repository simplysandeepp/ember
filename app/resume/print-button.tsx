'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-2"
    >
      Print / Save as PDF
    </button>
  );
}
