import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/content';
import MDXContent from '@/components/mdx-content';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const { title, description, date } = post.frontmatter;
  return {
    title: `${title} | Sandeep Prajapati`,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/${params.slug}`,
      type: 'article',
      publishedTime: date,
      authors: ['Sandeep Prajapati'],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { title, description, date, tags } = post.frontmatter;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: 'Sandeep Prajapati',
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${params.slug}`,
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
          href="/blog"
          className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          ← Writing
        </Link>

        {/* Header */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 leading-snug">
            {title}
          </h1>
          <p className="mt-2 text-base text-neutral-500">{description}</p>
          <div className="flex items-center gap-4 mt-3">
            <time className="text-xs text-neutral-400">{formatDate(date)}</time>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
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
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 my-8" />

        {/* Content */}
        <MDXContent source={post.content} />
      </div>
    </>
  );
}
