import Link from 'next/link';
import { BlogFrontmatter, formatDate } from '@/lib/content';

type Props = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

export default function BlogCard({ slug, frontmatter }: Props) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex items-start justify-between gap-8 py-5 border-b border-neutral-100 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200">
          {frontmatter.title}
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500 line-clamp-1 leading-relaxed">
          {frontmatter.description}
        </p>
      </div>
      <time className="text-xs text-neutral-400 whitespace-nowrap mt-0.5 flex-shrink-0">
        {formatDate(frontmatter.date)}
      </time>
    </Link>
  );
}
