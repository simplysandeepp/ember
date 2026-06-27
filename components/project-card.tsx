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
      className="group flex items-start gap-4 py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
    >
      {frontmatter.image && (
        <div className="flex-shrink-0 w-20 h-14 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200">
          {frontmatter.title}
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
          {frontmatter.description}
        </p>
        {frontmatter.tags?.length > 0 && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
            {frontmatter.tags.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
      <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5">
        →
      </span>
    </Link>
  );
}
