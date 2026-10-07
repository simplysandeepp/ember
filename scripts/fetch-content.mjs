#!/usr/bin/env node
/**
 * Pulls the site's content from the private `port-content` repo into this
 * template before dev / build / test. This repo holds code only.
 *
 * Copies in:  content/            → ./content
 *             public/projects/    → ./public/projects
 *             public/logos/       → ./public/logos
 * and writes content/.dates.json (last commit date per content file) so
 * lib/git-date.ts keeps real `dateModified` values without this repo
 * having the content's git history.
 *
 * Source, first match wins:
 *   1. CONTENT_DIR      — a local checkout path
 *   2. ../port-content  — sibling checkout (the usual local setup)
 *   3. CONTENT_TOKEN    — read-only GitHub token; clones the repo (Vercel)
 *   4. ./content already present — reused as-is, with a warning
 *
 * Usage: node scripts/fetch-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REPO = 'simplysandeepp/port-content';
const REF = process.env.CONTENT_REF || 'main';
const ROOT = process.cwd();
const CACHE = path.join(ROOT, '.content-cache');
const SYNCED = ['content', 'public/projects', 'public/logos'];

function git(args, cwd) {
  return execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
}

function resolveSource() {
  if (process.env.CONTENT_DIR) {
    const dir = path.resolve(ROOT, process.env.CONTENT_DIR);
    if (!fs.existsSync(path.join(dir, 'content'))) {
      throw new Error(`CONTENT_DIR=${dir} has no content/ folder`);
    }
    return { dir, label: dir };
  }

  const sibling = path.resolve(ROOT, '..', 'port-content');
  if (fs.existsSync(path.join(sibling, 'content'))) return { dir: sibling, label: sibling };

  const token = process.env.CONTENT_TOKEN;
  if (token) {
    // Token goes in a one-off header, never in the remote URL, so it isn't
    // written to .git/config or echoed in error messages.
    const auth = Buffer.from(`x-access-token:${token}`).toString('base64');
    fs.rmSync(CACHE, { recursive: true, force: true });
    try {
      git([
        '-c', `http.extraHeader=Authorization: Basic ${auth}`,
        'clone', '--quiet', '--branch', REF, '--single-branch',
        `https://github.com/${REPO}.git`, CACHE,
      ]);
    } catch (err) {
      const reason = err.stderr?.toString().replaceAll(token, '***').trim();
      throw new Error(`could not clone ${REPO}@${REF} — check CONTENT_TOKEN\n${reason}`);
    }
    return { dir: CACHE, label: `${REPO}@${REF}`, temporary: true };
  }

  return null;
}

// Last commit date for every content file. Real edits come from one
// `git log` walk (newest first, so the first date seen for a path is its
// latest). The repo's first commit only imported files from the old
// portfolio repos, so it is skipped and migrated-dates.json — their dates
// from that older history — fills in files untouched since.
function contentDates(dir) {
  const dates = {};
  try {
    const roots = git(['rev-list', '--max-parents=0', 'HEAD'], dir).trim().split('\n');
    let current = null;
    const log = git(['log', '--format=%x00%cI', '--name-only', 'HEAD', ...roots.map((r) => `^${r}`), '--', 'content'], dir);
    for (const line of log.split('\n')) {
      if (line.startsWith('\0')) current = line.slice(1);
      else if (line && current && !(line in dates)) dates[line] = current;
    }
  } catch {
    // Not a git checkout — git-date.ts falls back to frontmatter dates.
  }
  const migrated = path.join(dir, 'migrated-dates.json');
  const base = fs.existsSync(migrated) ? JSON.parse(fs.readFileSync(migrated, 'utf-8')) : {};
  return { ...base, ...dates };
}

let source;
try {
  source = resolveSource();
} catch (err) {
  console.error(`✗ fetch-content: ${err.message}`);
  process.exit(1);
}

if (!source) {
  if (fs.existsSync(path.join(ROOT, 'content'))) {
    console.warn('⚠ fetch-content: no CONTENT_DIR, ../port-content or CONTENT_TOKEN — reusing existing ./content');
    process.exit(0);
  }
  console.error(
    `✗ fetch-content: no content source. Clone ${REPO} next to this repo, ` +
      'or set CONTENT_DIR / CONTENT_TOKEN.'
  );
  process.exit(1);
}

for (const rel of SYNCED) {
  const from = path.join(source.dir, rel);
  const to = path.join(ROOT, rel);
  fs.rmSync(to, { recursive: true, force: true });
  if (fs.existsSync(from)) fs.cpSync(from, to, { recursive: true });
}
fs.writeFileSync(
  path.join(ROOT, 'content', '.dates.json'),
  JSON.stringify(contentDates(source.dir), null, 2) + '\n'
);
if (source.temporary) fs.rmSync(CACHE, { recursive: true, force: true });

console.log(`✓ fetch-content: synced ${SYNCED.join(', ')} from ${source.label}`);
