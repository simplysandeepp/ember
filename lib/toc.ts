import GithubSlugger from 'github-slugger';

export type Heading = { level: number; text: string; slug: string };

/**
 * Extract h2/h3 headings from markdown source, with slugs that match
 * rehype-slug (both use github-slugger). Skips fenced code blocks.
 */
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of source.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const level = match[1].length;
      // strip inline markdown (links, emphasis, code) for the label
      const text = match[2]
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]/g, '')
        .trim();
      headings.push({ level, text, slug: slugger.slug(text) });
    }
  }

  return headings;
}
