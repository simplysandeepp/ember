import Link from 'next/link';
import { getAllProjects, getFeaturedProjects, getAllPosts, getCertifications, formatDate } from '@/lib/content';
import ProjectRow from '@/components/project-row';
import Logo from '@/components/logo';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  const allProjects = getAllProjects();
  // Selected Work = featured projects ordered by `priority` in their md files.
  // Falls back to the 4 most recent projects if none are featured.
  const featured = getFeaturedProjects();
  const displayProjects =
    featured.length > 0 ? featured.slice(0, 4) : allProjects.slice(0, 4);
  const recentPosts = getAllPosts().slice(0, 4);
  const certifications = getCertifications();

  // Real, auto-counted stats — refine the labels/values as you do your R&D.
  const stats = [
    { value: `${allProjects.length}+`, label: 'Projects shipped' },
    { value: `${certifications.length}+`, label: 'Certifications' },
    { value: '4', label: 'AI agents in FinSight' },
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Hero */}
        <section className="flex items-start gap-5">
          <Logo size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Sandeep Prajapati
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              AI Software Intern
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3">
              Exploring what&apos;s next, one stack at a time
            </p>
          </div>
        </section>

        {/* Bio */}
        <section className="mt-10">
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I build intelligent systems — RAG pipelines, AI agents, and the
            full-stack applications that run them. Currently interning at{' '}
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
            <div className="mt-2">
              {displayProjects.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  slug={project.slug}
                  frontmatter={project.frontmatter}
                  index={i}
                />
              ))}
            </div>
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

      </div>
    </>
  );
}
