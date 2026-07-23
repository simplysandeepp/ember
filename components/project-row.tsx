import Link from 'next/link';
import Image from 'next/image';
import { ProjectFrontmatter } from '@/lib/content-types';

type Props = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  index: number;
};

export default function ProjectRow({ slug, frontmatter, index }: Props) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex items-start gap-5 py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-0 transition-colors duration-200"
    >
      <span className="text-xs text-neutral-300 dark:text-neutral-600 font-mono w-5 flex-shrink-0 mt-1 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      {frontmatter.image && (
        <div className="flex-shrink-0 w-16 h-11 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 mt-0.5 relative">
          <Image
            src={frontmatter.image}
            alt={`${frontmatter.title} — project by Sandeep Prajapati`}
            fill
            sizes="64px"
            priority={index < 2}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200">
            {frontmatter.title}
          </p>
          <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5">
            →
          </span>
        </div>
        <p className="text-sm text-neutral-500 mt-0.5 line-clamp-1">
          {frontmatter.description}
        </p>
        {frontmatter.tags?.length > 0 && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5">
            {frontmatter.tags.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}
