import { getAllProjects } from '@/lib/content';
import ProjectCard from '@/components/project-card';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'Things I have built — RAG pipelines, AI agents, full-stack applications, and developer tools.',
  path: '/projects',
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const pinned = projects.filter((p) => p.frontmatter.pinned);
  const rest = projects.filter((p) => !p.frontmatter.pinned);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Projects
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {projects.length} {projects.length === 1 ? 'project' : 'projects'} — AI systems, full-stack apps, developer tools.
      </p>

      {projects.length === 0 ? (
        <p className="mt-12 text-sm text-neutral-400 dark:text-neutral-500">
          Projects coming soon.
        </p>
      ) : (
        <>
          {pinned.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 flex items-center gap-1.5">
                <span aria-hidden>📌</span> Pinned
              </h2>
              <div>
                {pinned.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    slug={project.slug}
                    frontmatter={project.frontmatter}
                  />
                ))}
              </div>
            </section>
          )}

          <section className={pinned.length > 0 ? 'mt-10' : 'mt-10'}>
            {pinned.length > 0 && (
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
                All projects
              </h2>
            )}
            <div>
              {rest.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  frontmatter={project.frontmatter}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
