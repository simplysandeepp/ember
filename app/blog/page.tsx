import { getAllPosts } from '@/lib/content';
import BlogCard from '@/components/blog-card';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Writing',
  description:
    'Writing about AI engineering, LLMs, building with LangChain, and full-stack development.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Writing
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        AI engineering, LLMs, and building things.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-neutral-400">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <div className="mt-10">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
