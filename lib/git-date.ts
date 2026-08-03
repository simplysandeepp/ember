import { execSync } from 'child_process';

/**
 * Last commit date for a file, resolved at build time from git history.
 *
 * Static pages (home, about, resume, contact) have no frontmatter date to
 * anchor `sitemap.ts`'s `lastModified` to, so it used to fall back to
 * `new Date()` — which stamps the *build clock*, not real content changes.
 * Google explicitly discounts a `lastmod` it can't corroborate, and an
 * untrustworthy value can devalue the whole sitemap, not just that one URL.
 *
 * Falls back to `fallback` if git history for the path is unavailable (a
 * shallow clone with no commits touching it, or no `.git` at all) so this
 * never throws during a build and never regresses to a churning date.
 */
export function gitLastModified(relPath: string, fallback: string): Date {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? new Date(out) : new Date(fallback);
  } catch {
    return new Date(fallback);
  }
}
