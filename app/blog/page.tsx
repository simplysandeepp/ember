import { Suspense } from 'react';
import { getAllPosts } from '@/lib/content';
import BlogSearch from '@/components/blog-search';
import NewsletterSignup from '@/components/newsletter-signup';
import { buildMetadata, siteConfig, breadcrumbJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Writing',
  description:
    'Writing by Sandeep Prajapati on AI engineering, LLMs, RAG pipelines, LangGraph, and full-stack development.',
  path: '/blog',
  keywords: [
    'Sandeep Prajapati blog',
    'Sandeep Prajapati writing',
    'Sandeep Prajapati AI blog',
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteConfig.url}/blog#blog`,
    url: `${siteConfig.url}/blog`,
    name: 'Writing — Sandeep Prajapati',
    description:
      'Writing by Sandeep Prajapati on AI engineering, LLMs, and building intelligent systems.',
    author: { '@id': `${siteConfig.url}/#person` },
    publisher: { '@id': `${siteConfig.url}/#person` },
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      description: p.frontmatter.description,
      datePublished: p.frontmatter.date,
      url: `${siteConfig.url}/blog/${p.slug}`,
      author: { '@id': `${siteConfig.url}/#person` },
    })),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Writing', path: '/blog' },
  ]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Writing
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Notes by Sandeep Prajapati on AI engineering, LLMs, and shipping intelligent systems.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-neutral-400 dark:text-neutral-500">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <Suspense fallback={<div className="mt-10" />}>
          <BlogSearch posts={posts} />
        </Suspense>
      )}

      <NewsletterSignup />
    </div>
  );
}
