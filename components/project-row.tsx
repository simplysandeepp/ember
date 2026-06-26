import Link from 'next/link';
import { ProjectFrontmatter } from '@/lib/content';

type Props = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  index: number;
};

export default function ProjectRow({ slug, frontmatter, index }: Props) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex items-start gap-5 py-5 border-b border-neutral-100 last:border-0 transition-colors duration-200"
    >
      <span className="text-xs text-neutral-300 font-mono w-5 flex-shrink-0 mt-1 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200">
            {frontmatter.title}
          </p>
          <span className="text-neutral-300 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5">
            →
          </span>
        </div>
        <p className="text-sm text-neutral-500 mt-0.5 line-clamp-1">
          {frontmatter.description}
        </p>
        {frontmatter.tags?.length > 0 && (
          <p className="text-xs text-neutral-400 mt-1.5">
            {frontmatter.tags.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}
