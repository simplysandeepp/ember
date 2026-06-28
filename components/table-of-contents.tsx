import type { Heading } from '@/lib/toc';

/**
 * Table of contents for longer posts. Renders only when there are enough
 * headings (handled by the caller). Anchors match rehype-slug ids.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mt-8 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 px-5 py-4"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.slug} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.slug}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
