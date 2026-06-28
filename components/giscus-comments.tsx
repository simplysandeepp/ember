'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/lib/metadata';

/**
 * Giscus comments — powered by GitHub Discussions, fully client-side.
 * No backend, no cold start; the widget talks to GitHub directly.
 * Renders only when giscus config is present.
 */
export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { repo, repoId, category, categoryId } = siteConfig.giscus;

  useEffect(() => {
    if (!repoId || !categoryId || !ref.current) return;
    // Avoid injecting twice.
    if (ref.current.querySelector('iframe.giscus-frame')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute(
      'data-theme',
      resolvedTheme === 'dark' ? 'noborder_dark' : 'noborder_light'
    );
    script.setAttribute('data-lang', 'en');
    ref.current.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync the giscus iframe theme when the site theme changes.
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: resolvedTheme === 'dark' ? 'noborder_dark' : 'noborder_light',
          },
        },
      },
      'https://giscus.app'
    );
  }, [resolvedTheme]);

  if (!repoId || !categoryId) return null;

  return (
    <section className="mt-16 pt-10 border-t border-neutral-100 dark:border-neutral-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
        Comments
      </h2>
      <div ref={ref} />
    </section>
  );
}
