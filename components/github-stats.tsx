import { siteConfig } from '@/lib/metadata';

/**
 * Frontend-only stat embeds (GitHub + LeetCode) via image services.
 * Light/dark variants are toggled with CSS so they match the site theme.
 * No backend, no cold start — just <img> tags.
 */
const gh = siteConfig.githubUsername;
const lc = siteConfig.leetcodeUsername;

// Self-hosted github-readme-stats instance (the public one is frequently rate-limited/paused).
const GH_STATS_HOST = 'https://github-readme-stats-simplysandeepp.vercel.app';

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
        decoding="async"
        className="block dark:hidden w-full h-auto"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="hidden dark:block w-full h-auto"
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

      <div className="grid sm:grid-cols-2 gap-5 items-start">
        {/* Left — GitHub */}
        <div className="space-y-4 min-w-0">
          <ThemedImg
            alt="GitHub stats"
            lightSrc={`${GH_STATS_HOST}/api?username=${gh}&show_icons=true&include_all_commits=true&${LIGHT}`}
            darkSrc={`${GH_STATS_HOST}/api?username=${gh}&show_icons=true&include_all_commits=true&${DARK}`}
          />
          <ThemedImg
            alt="Top languages"
            lightSrc={`${GH_STATS_HOST}/api/top-langs/?username=${gh}&layout=compact&${LIGHT}`}
            darkSrc={`${GH_STATS_HOST}/api/top-langs/?username=${gh}&layout=compact&${DARK}`}
          />
        </div>

        {/* Right — LeetCode */}
        <div className="min-w-0">
          <ThemedImg
            alt="LeetCode stats"
            lightSrc={`https://leetcard.jacoblin.cool/${lc}?theme=light&font=Inter&ext=heatmap`}
            darkSrc={`https://leetcard.jacoblin.cool/${lc}?theme=dark&font=Inter&ext=heatmap`}
          />
        </div>
      </div>

      {/* GitHub contribution heatmap (full width, below both cards) */}
      <div className="mt-5 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/409ba5/${gh}`}
          alt={`${gh} GitHub contribution graph`}
          loading="lazy"
          decoding="async"
          className="w-full min-w-[600px] h-auto"
        />
      </div>
    </section>
  );
}
