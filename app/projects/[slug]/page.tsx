import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, formatDate } from '@/lib/content';
import MDXContent from '@/components/mdx-content';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  const { title, description } = project.frontmatter;
  return {
    title: `${title} | Sandeep Prajapati`,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/projects/${params.slug}`,
      type: 'article',
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { title, description, date, tags, github, live } = project.frontmatter;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Sandeep Prajapati',
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/projects/${params.slug}`,
    ...(github ? { codeRepository: github } : {}),
    keywords: tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/projects"
          className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          ← Projects
        </Link>

        {/* Header */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {title}
          </h1>
          <p className="mt-2 text-base text-neutral-500">{description}</p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <time className="text-xs text-neutral-400">{formatDate(date)}</time>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-900 transition-colors"
              >
                Live demo
              </a>
            )}
          </div>

          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 my-8" />

        {/* Content */}
        <MDXContent source={project.content} />
      </div>
    </>
  );
}
