'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import BlogCard from '@/components/blog-card';
import type { BlogFrontmatter } from '@/lib/content-types';

type Item = { slug: string; frontmatter: BlogFrontmatter };

export default function BlogSearch({ posts }: { posts: Item[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(params.get('q') ?? '');
  }, [params]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const fm = p.frontmatter;
      return (
        fm.title.toLowerCase().includes(q) ||
        fm.description.toLowerCase().includes(q) ||
        (fm.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query]);

  const updateQuery = (next: string) => {
    setQuery(next);
    const url = next ? `${pathname}?q=${encodeURIComponent(next)}` : pathname;
    router.replace(url, { scroll: false });
  };

  return (
    <div className="mt-10">
      <label htmlFor="blog-search" className="sr-only">
        Search writing
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Search writing…"
        className="w-full px-3 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-colors duration-200"
      />

      <div className="mt-6">
        {filtered.length === 0 ? (
          <p className="py-8 text-sm text-neutral-400 dark:text-neutral-500">
            No posts match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          filtered.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
            />
          ))
        )}
      </div>
    </div>
  );
}
