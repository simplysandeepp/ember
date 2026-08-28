import Link from 'next/link';
import {
  getAllProjects,
  getFeaturedProjects,
  getAllPosts,
  getCertifications,
  formatDate,
} from '@/lib/content';
import ProjectBento from '@/components/project-bento';
import Logo from '@/components/logo';
import { siteConfig, profilePageJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sandeep Prajapati — Full-Stack Engineer, AI Products & Agents',
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` },
  },
};

export default function HomePage() {
  const allProjects = getAllProjects();
  // Selected Work follows the `featured` + `priority` curation in project
  // frontmatter, not raw date order — the bento gives its first cell hero
  // treatment, so that slot needs to be chosen rather than whatever happens
  // to be newest. Topped up with recent projects if fewer than 4 are
  // featured, so the grid is never partially filled.
  const featured = getFeaturedProjects();
  const displayProjects = [
    ...featured,
    ...allProjects.filter((p) => !featured.some((f) => f.slug === p.slug)),
  ].slice(0, 4);
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 4);
  const certifications = getCertifications();

  // Real, auto-counted stats — all dynamic from content.
  const stats = [
    { value: `${allProjects.length}+`, label: 'Projects shipped' },
    { value: `${certifications.length}+`, label: 'Certifications' },
    { value: `${allPosts.length}+`, label: 'Blog posts' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            profilePageJsonLd(
              allProjects.slice(0, 6).map((p) => ({
                title: p.frontmatter.title,
                slug: p.slug,
              }))
            )
          ),
        }}
      />
      <div className="max-w-2xl mx-auto px-6 py-16 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0.05),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)] motion-reduce:hidden"
        />

        {/* Hero */}
        <section className="flex items-start gap-5 relative">
          <Logo size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Sandeep Prajapati
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Full-Stack Engineer — AI Products & Agentic Systems
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3">
              Exploring what&apos;s next, one stack at a time
            </p>
          </div>
        </section>

        {/* Bio */}
        <section className="mt-10">
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I build full-stack, scalable AI products — multi-agent RAG
            systems, AI agents, and automation pipelines — with production
            monitoring, evaluation, and DevOps baked in. Currently interning
            at{' '}
            <a
              href="https://drcode.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-neutral-100 underline-link"
            >
              DrCode
            </a>{' '}
            in New Delhi, where I work on production AI features used by real
            developers.
          </p>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mt-3">
            I care about making AI systems actually reliable — not just
            impressive in demos.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
            <Link href="/projects" className="text-sm font-medium text-neutral-900 dark:text-neutral-100 underline-link">
              View work →
            </Link>
            <Link href="/about" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200">
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              Get in touch →
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-12 grid grid-cols-3 gap-4 border-t border-b border-neutral-100 dark:border-neutral-800 py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {s.value}
              </div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* Selected work */}
        {displayProjects.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Selected Work
              </h2>
              <Link
                href="/projects"
                className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
              >
                All projects →
              </Link>
            </div>
            <ProjectBento projects={displayProjects} />
          </section>
        )}

        {/* Writing */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Writing
            </h2>
            {recentPosts.length > 0 && (
              <Link
                href="/blog"
                className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
              >
                All posts →
              </Link>
            )}
          </div>

          {recentPosts.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
              Occasional writing on AI engineering and building with LLMs — coming soon.
            </p>
          ) : (
            <div className="mt-2">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                >
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200 flex-1 min-w-0">
                    {post.frontmatter.title}
                  </p>
                  <time className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap flex-shrink-0 mt-0.5">
                    {formatDate(post.frontmatter.date)}
                  </time>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Previous portfolio callout */}
        <section className="mt-16 pt-10 border-t border-neutral-100 dark:border-neutral-800">
          <a
            href="https://prev.sandeepp.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200">
                My previous portfolio
              </p>
              <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">
                A fully 3D, animated build — a playground for creative UI. Take a look.
              </p>
            </div>
            <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
              →
            </span>
          </a>
        </section>

        {/* Search hint */}
        <p className="mt-12 text-center text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
          Didn&apos;t find what you&apos;re looking for? Press{' '}
          <kbd className="px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-[10px]">
            ⌘K
          </kbd>{' '}
          /{' '}
          <kbd className="px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-[10px]">
            Ctrl K
          </kbd>{' '}
          to search the site.
        </p>

      </div>
    </>
  );
}
