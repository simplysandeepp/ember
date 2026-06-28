import { siteConfig } from '@/lib/metadata';

/**
 * Frontend-only stat embeds (GitHub + LeetCode) via image services.
 * Light/dark variants are toggled with CSS so they match the site theme.
 * No backend, no cold start — just <img> tags.
 */
const gh = siteConfig.githubUsername;
const lc = siteConfig.leetcodeUsername;

const COMMON =
  'hide_border=true&bg_color=00000000&hide_title=false';
const LIGHT = `${COMMON}&title_color=1a1a1a&text_color=525252&icon_color=525252`;
const DARK = `${COMMON}&title_color=fafafa&text_color=a3a3a3&icon_color=a3a3a3`;

function ThemedImg({
  lightSrc,
  darkSrc,
  alt,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightSrc}
        alt={alt}
        loading="lazy"
        className="block dark:hidden w-full max-w-xs h-auto"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkSrc}
        alt={alt}
        loading="lazy"
        className="hidden dark:block w-full max-w-xs h-auto"
      />
    </>
  );
}

export default function GitHubStats() {
  return (
    <section className="mt-14">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
        Stats
      </h2>

      <div className="space-y-5">
        <ThemedImg
          alt="GitHub stats"
          lightSrc={`https://github-readme-stats.vercel.app/api?username=${gh}&show_icons=true&${LIGHT}`}
          darkSrc={`https://github-readme-stats.vercel.app/api?username=${gh}&show_icons=true&${DARK}`}
        />
        <ThemedImg
          alt="Top languages"
          lightSrc={`https://github-readme-stats.vercel.app/api/top-langs/?username=${gh}&layout=compact&${LIGHT}`}
          darkSrc={`https://github-readme-stats.vercel.app/api/top-langs/?username=${gh}&layout=compact&${DARK}`}
        />
        <ThemedImg
          alt="LeetCode stats"
          lightSrc={`https://leetcard.jacoblin.cool/${lc}?theme=light&font=Inter&ext=heatmap`}
          darkSrc={`https://leetcard.jacoblin.cool/${lc}?theme=dark&font=Inter&ext=heatmap`}
        />
      </div>
    </section>
  );
}
