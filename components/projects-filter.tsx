'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/project-card';
import type { ProjectFrontmatter } from '@/lib/content';

type Item = { slug: string; frontmatter: ProjectFrontmatter };

export default function ProjectsFilter({ projects }: { projects: Item[] }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  // Top tags by frequency for the filter chips.
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.frontmatter.tags ?? []) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([t]) => t);
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const fm = p.frontmatter;
      const matchesTag = !tag || (fm.tags ?? []).includes(tag);
      const matchesQuery =
        !q ||
        fm.title.toLowerCase().includes(q) ||
        fm.description.toLowerCase().includes(q) ||
        (fm.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [projects, query, tag]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects…"
        aria-label="Search projects"
        className="w-full px-3 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-colors duration-200"
      />

      {topTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            onClick={() => setTag(null)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors duration-200 ${
              tag === null
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            All
          </button>
          {topTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors duration-200 ${
                tag === t
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        {filtered.length === 0 ? (
          <p className="py-8 text-sm text-neutral-400 dark:text-neutral-500">
            No projects match your search.
          </p>
        ) : (
          filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              frontmatter={project.frontmatter}
            />
          ))
        )}
      </div>
    </div>
  );
}
