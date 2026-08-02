'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/lib/metadata';
import type { SearchDoc } from '@/lib/search-index';

type Command = {
  label: string;
  hint?: string;
  action: () => void;
  keywords?: string;
};

type Result = {
  key: string;
  label: string;
  hint: string;
  snippet?: string;
  action: () => void;
};

const SNIPPET_RADIUS = 60;

/** Dispatch on `window` to open the palette from anywhere (see nav.tsx). */
export const OPEN_EVENT = 'commandpalette:open';

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Extracts a window of text around the first match so the hit is visible. */
function snippetAround(text: string, query: string): string | undefined {
  const at = text.toLowerCase().indexOf(query);
  if (at === -1) return undefined;
  const start = Math.max(0, at - SNIPPET_RADIUS);
  const end = Math.min(text.length, at + query.length + SNIPPET_RADIUS);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${
    end < text.length ? '…' : ''
  }`;
}

/** Title hits outrank heading hits, which outrank body hits. */
function scoreOf(doc: SearchDoc, query: string): number {
  const title = doc.title.toLowerCase();
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  if (doc.heading?.toLowerCase().includes(query)) return 3;
  if (doc.text.toLowerCase().includes(query)) return 4;
  return Infinity;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => {
      setOpen(false);
      router.push(path);
    };
    const ext = (url: string) => () => {
      setOpen(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    return [
      { label: 'Home', hint: 'Page', action: go('/'), keywords: 'start index' },
      { label: 'About', hint: 'Page', action: go('/about'), keywords: 'bio experience skills certifications' },
      { label: 'Projects', hint: 'Page', action: go('/projects'), keywords: 'work portfolio' },
      { label: 'Blog', hint: 'Page', action: go('/blog'), keywords: 'writing posts articles' },
      { label: 'Contact', hint: 'Page', action: go('/contact'), keywords: 'email message hire' },
      { label: 'Resume', hint: 'Page', action: go('/resume'), keywords: 'cv pdf download print' },
      { label: 'Resume PDF', hint: 'Download', action: ext(siteConfig.resumeUrl), keywords: 'cv pdf drive google' },
      { label: 'GitHub', hint: 'External', action: ext(siteConfig.github), keywords: 'code repos' },
      { label: 'LinkedIn', hint: 'External', action: ext(siteConfig.linkedin), keywords: 'profile' },
      { label: 'Contact form', hint: 'External', action: ext(siteConfig.tallyUrl), keywords: 'email message hire reach out' },
    ];
  }, [router]);

  // Fetched on first open only — keeps the index off the initial page payload.
  useEffect(() => {
    if (!open || docs) return;
    let cancelled = false;
    fetch('/search-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchDoc[]) => {
        if (!cancelled) setDocs(data);
      })
      .catch(() => {
        if (!cancelled) setDocs([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, docs]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return commands.map((c) => ({
        key: c.label,
        label: c.label,
        hint: c.hint ?? '',
        action: c.action,
      }));
    }

    const navHits: Result[] = commands
      .filter(
        (c) =>
          c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q)
      )
      .map((c) => ({
        key: c.label,
        label: c.label,
        hint: c.hint ?? '',
        action: c.action,
      }));

    const seen = new Set<string>();
    const contentHits: Result[] = (docs ?? [])
      .map((doc) => ({ doc, score: scoreOf(doc, q) }))
      .filter(({ score }) => score !== Infinity)
      .sort((a, b) => a.score - b.score)
      .reduce<Result[]>((acc, { doc }) => {
        // One row per destination — the best-scoring section wins.
        if (seen.has(doc.url) || acc.length >= 40) return acc;
        seen.add(doc.url);
        acc.push({
          key: doc.url,
          label: doc.heading ? `${doc.title} — ${doc.heading}` : doc.title,
          hint: doc.kind,
          snippet: snippetAround(doc.text, q),
          action: () => {
            setOpen(false);
            router.push(doc.url);
          },
        });
        return acc;
      }, []);

    return [...navHits, ...contentHits];
  }, [query, commands, docs, router]);

  useEffect(() => {
    // Captured here rather than in an effect: the input's autoFocus has
    // already moved focus by the time effects run, so an effect would only
    // ever record the palette itself as the opener.
    function rememberOpener() {
      if (!openRef.current) {
        openerRef.current = document.activeElement as HTMLElement | null;
      }
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        rememberOpener();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    // Lets the nav's search button (and anything else) open the palette
    // without threading state through a provider.
    function onOpenRequest() {
      rememberOpener();
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, onOpenRequest);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  // Lock background scroll while open, matching the mobile nav and lightbox.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Return focus to whatever opened the palette, so keyboard users are not
  // dumped back at the top of the document on close.
  useEffect(() => {
    if (!open) return;
    return () => openerRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelectorAll('li')
      [active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const loading = docs === null && query.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-label="Search this site"
          aria-expanded="true"
          aria-controls="command-palette-results"
          aria-activedescendant={
            results[active] ? `command-palette-option-${active}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              results[active]?.action();
            } else if (e.key === 'Tab') {
              // The input is the only tab stop — arrows move through results.
              // Without this, Tab walks onto the page behind the overlay.
              e.preventDefault();
            }
          }}
          placeholder="Search projects, writing, and everything on this site…"
          className="w-full px-4 py-3.5 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border-b border-neutral-100 dark:border-neutral-800 focus:outline-none"
        />
        <ul
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-80 overflow-y-auto py-1"
        >
          {loading ? (
            <li className="px-4 py-3 text-sm text-neutral-400 dark:text-neutral-500">
              Searching…
            </li>
          ) : results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-neutral-400 dark:text-neutral-500">
              No results
            </li>
          ) : (
            results.map((r, i) => (
              <li
                key={r.key}
                id={`command-palette-option-${i}`}
                role="option"
                aria-selected={i === active}
              >
                <button
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => r.action()}
                  className={`w-full flex items-start justify-between gap-4 px-4 py-2.5 text-sm text-left transition-colors duration-100 ${
                    i === active
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{r.label}</span>
                    {r.snippet && (
                      <span className="mt-0.5 block truncate text-xs text-neutral-400 dark:text-neutral-500">
                        {r.snippet}
                      </span>
                    )}
                  </span>
                  {r.hint && (
                    <span className="flex-shrink-0 pt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                      {r.hint}
                    </span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
        <p aria-live="polite" className="sr-only">
          {loading
            ? 'Searching'
            : `${results.length} result${results.length === 1 ? '' : 's'}`}
        </p>
      </div>
    </div>
  );
}
