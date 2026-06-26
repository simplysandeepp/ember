import Link from 'next/link';
import { ProjectFrontmatter } from '@/lib/content';

type Props = {
  slug: string;
  frontmatter: ProjectFrontmatter;
};

export default function ProjectCard({ slug, frontmatter }: Props) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex items-start justify-between gap-6 py-5 border-b border-neutral-100 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200">
          {frontmatter.title}
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
          {frontmatter.description}
        </p>
        {frontmatter.tags?.length > 0 && (
          <p className="text-xs text-neutral-400 mt-2">
            {frontmatter.tags.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
      <span className="text-neutral-300 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5">
        →
      </span>
    </Link>
  );
}
