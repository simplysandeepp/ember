'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/lib/metadata';

type Command = {
  label: string;
  hint?: string;
  action: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

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
      { label: 'Resume', hint: 'Download', action: ext(siteConfig.resumeUrl), keywords: 'cv pdf' },
      { label: 'GitHub', hint: 'External', action: ext(siteConfig.github), keywords: 'code repos' },
      { label: 'LinkedIn', hint: 'External', action: ext(siteConfig.linkedin), keywords: 'profile' },
      { label: 'Contact form', hint: 'External', action: ext(siteConfig.tallyUrl), keywords: 'email message hire reach out' },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              filtered[active]?.action();
            }
          }}
          placeholder="Jump to…"
          className="w-full px-4 py-3.5 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border-b border-neutral-100 dark:border-neutral-800 focus:outline-none"
        />
        <ul className="max-h-72 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-neutral-400 dark:text-neutral-500">
              No results
            </li>
          ) : (
            filtered.map((c, i) => (
              <li key={c.label}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => c.action()}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors duration-100 ${
                    i === active
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span>{c.label}</span>
                  {c.hint && (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {c.hint}
                    </span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
