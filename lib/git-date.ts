import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Last commit dates for content files, written by scripts/fetch-content.mjs.
 * Content lives in the separate port-content repo, so this repo's own git
 * history no longer knows when a post last changed.
 */
let _contentDates: Record<string, string> | null = null;
function contentDates(): Record<string, string> {
  if (_contentDates) return _contentDates;
  try {
    const file = path.join(process.cwd(), 'content', '.dates.json');
    _contentDates = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    _contentDates = {};
  }
  return _contentDates!;
}

/**
 * Last commit date for a file, resolved at build time from git history.
 *
 * Static pages (home, about, resume, contact) have no frontmatter date to
 * anchor `sitemap.ts`'s `lastModified` to, so it used to fall back to
 * `new Date()` — which stamps the *build clock*, not real content changes.
 * Google explicitly discounts a `lastmod` it can't corroborate, and an
 * untrustworthy value can devalue the whole sitemap, not just that one URL.
 *
 * `content/…` paths are looked up in the port-content dates first.
 *
 * Falls back to `fallback` if git history for the path is unavailable (a
 * shallow clone with no commits touching it, or no `.git` at all) so this
 * never throws during a build and never regresses to a churning date.
 */
export function gitLastModified(relPath: string, fallback: string): Date {
  const recorded = contentDates()[relPath];
  if (recorded) return new Date(recorded);
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
