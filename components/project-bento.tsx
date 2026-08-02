import Link from 'next/link';
import Image from 'next/image';
import { ProjectFrontmatter } from '@/lib/content-types';
import { BLUR_DATA_URL } from '@/lib/blur';
import { colors } from '@/lib/colors';

type Item = { slug: string; frontmatter: ProjectFrontmatter };

/**
 * Asymmetric bento for Selected Work. On a 3-column grid the cells run
 * 2-1 / 1-2, so the first project reads as the hero and the block stays
 * visually balanced:
 *
 *   ┌───────────────┬───────┐
 *   │   featured    │   2   │
 *   ├───────┬───────┴───────┤
 *   │   3   │       4       │
 *   └───────┴───────────────┘
 *
 * Below `sm` every cell stacks to full width.
 */
const SPANS = [
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-2',
];

// Wide cells get a shorter, more cinematic crop; narrow cells need the extra
// height to keep the title and description from crowding the image.
const ASPECT = ['aspect-[16/9]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[16/9]'];

// Written out literally rather than interpolated — Tailwind scans source text,
// so a template-built `sm:aspect-[4/3]` would never be generated.
const ASPECT_SM = [
  'sm:aspect-[16/9]',
  'sm:aspect-[4/3]',
  'sm:aspect-[4/3]',
  'sm:aspect-[16/9]',
];

export default function ProjectBento({ projects }: { projects: Item[] }) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {projects.slice(0, 4).map((project, i) => {
        const { slug, frontmatter: fm } = project;
        const featured = i === 0;

        return (
          <Link
            key={slug}
            href={`/projects/${slug}`}
            className={`group relative flex flex-col overflow-hidden rounded-xl border ${colors.border} ${colors.bg} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700 motion-reduce:hover:transform-none ${SPANS[i]}`}
          >
            {fm.image ? (
              <div className={`relative w-full ${ASPECT[i]} ${colors.bgSubtle} overflow-hidden`}>
                <Image
                  src={fm.image}
                  alt={`${fm.title} — project by Sandeep Prajapati`}
                  fill
                  // Wide cells render up to ~440px, narrow ones ~215px, and
                  // everything is full-bleed below the sm breakpoint.
                  sizes={
                    featured || i === 3
                      ? '(max-width: 640px) 100vw, 440px'
                      : '(max-width: 640px) 100vw, 215px'
                  }
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={featured}
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300 motion-reduce:group-hover:scale-100"
                />
              </div>
            ) : (
              // Projects without a screenshot still need to fill their cell so
              // the row heights line up. A decorative panel carrying the
              // initial keeps it from reading as a broken image.
              <div
                className={`relative h-28 w-full overflow-hidden sm:h-auto ${ASPECT_SM[i]} bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900`}
                aria-hidden="true"
              >
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-neutral-300 dark:text-neutral-700 select-none">
                  {fm.title.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`font-medium ${colors.fg} group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200 ${
                    featured ? 'text-base' : 'text-sm'
                  }`}
                >
                  {fm.title}
                </h3>
                <span className="flex-shrink-0 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all duration-200">
                  →
                </span>
              </div>

              <p
                className={`mt-1 text-sm ${colors.fgMuted} leading-relaxed ${
                  featured ? 'line-clamp-2' : 'line-clamp-2'
                }`}
              >
                {fm.description}
              </p>

              {fm.tags?.length > 0 && (
                <p className={`mt-auto pt-3 text-xs ${colors.fgSubtle}`}>
                  {fm.tags.slice(0, featured ? 4 : 3).join(' · ')}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
