import { getAllProjects } from '@/lib/content';
import ProjectCard from '@/components/project-card';
import ProjectsFilter from '@/components/projects-filter';
import { buildMetadata, siteConfig, breadcrumbJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'Projects by Sandeep Prajapati — RAG pipelines, AI agents built with LangGraph and CrewAI, full-stack applications on Next.js and FastAPI, and developer tools.',
  path: '/projects',
  keywords: [
    'Sandeep Prajapati projects',
    'Sandeep Prajapati portfolio projects',
    'Sandeep Prajapati AI projects',
  ],
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const pinned = projects.filter((p) => p.frontmatter.pinned);
  const rest = projects.filter((p) => !p.frontmatter.pinned);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteConfig.url}/projects#collection`,
    url: `${siteConfig.url}/projects`,
    name: 'Projects — Sandeep Prajapati',
    description:
      'The full portfolio of Sandeep Prajapati — AI systems, full-stack apps, and developer tools.',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    author: { '@id': `${siteConfig.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteConfig.url}/projects/${p.slug}`,
        name: p.frontmatter.title,
        item: {
          '@type': 'CreativeWork',
          '@id': `${siteConfig.url}/projects/${p.slug}#work`,
          name: p.frontmatter.title,
          description: p.frontmatter.description,
          url: `${siteConfig.url}/projects/${p.slug}`,
          ...(p.frontmatter.image
            ? { image: `${siteConfig.url}${p.frontmatter.image}` }
            : {}),
          creator: { '@id': `${siteConfig.url}/#person` },
          ...(p.frontmatter.tags?.length
            ? { keywords: p.frontmatter.tags.join(', ') }
            : {}),
        },
      })),
    },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Projects
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {projects.length} {projects.length === 1 ? 'project' : 'projects'} by Sandeep Prajapati — AI systems, full-stack apps, and developer tools.
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

          <section className="mt-10">
            {pinned.length > 0 && (
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                All projects
              </h2>
            )}
            <ProjectsFilter projects={rest} />
          </section>
        </>
      )}
    </div>
  );
}
