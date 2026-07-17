#!/usr/bin/env node
/**
 * Rewrites content/certifications.md so every `logo:` points at a
 * locally-hosted asset. LinkedIn's CDN (media.licdn.com) rejects
 * third-party requests with 403, so the previous remote URLs never
 * rendered from sandeepp.in.
 *
 * Strategy per issuer:
 *   1. If we already have a local file at public/logos/<slug>.{svg,webp,png},
 *      point at it (idempotent).
 *   2. Else try Simple Icons CDN and save as SVG.
 *   3. Else clear the logo field so the About page falls back to the
 *      styled initial-letter placeholder (which always renders).
 *
 * Only official-brand SVGs come from Simple Icons — no LinkedIn or
 * private-CDN references remain in the file.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const CERT_FILE = path.join(process.cwd(), 'content', 'certifications.md');
const LOGO_DIR = path.join(process.cwd(), 'public', 'logos');

// Issuer → Simple Icons slug (or null for "no logo, use initial").
const SIMPLE_ICONS = {
  Udacity: 'udacity',
  'Amazon Web Services (AWS)': null, // Simple Icons dropped Amazon
  Commudle: null,
  Anthropic: 'anthropic',
  'IEEE DTU Student Branch': 'ieee',
  Microsoft: null, // trademark restriction
  'Microsoft for Startups': null,
  HackerRank: 'hackerrank',
  'United Latino Students Association': 'google',
  IBM: null,
  Google: 'google',
  Forage: null,
  'Infosys Springboard': 'infosys',
  'Indian Institute of Remote Sensing (IIRS), ISRO': 'isro',
  DigitalOcean: 'digitalocean',
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchSimpleIcon(slug) {
  const res = await fetch(`https://cdn.simpleicons.org/${slug}`, {
    headers: { Accept: 'image/svg+xml' },
  });
  if (!res.ok) return null;
  return await res.text();
}

async function resolveLocal(issuer) {
  const slug = slugify(issuer);
  // 1. Already-downloaded local files from the previous attempt.
  for (const ext of ['svg', 'webp', 'png']) {
    if (await fileExists(path.join(LOGO_DIR, `${slug}.${ext}`))) {
      return `/logos/${slug}.${ext}`;
    }
  }
  // 2. Simple Icons.
  const iconSlug = SIMPLE_ICONS[issuer];
  if (iconSlug) {
    const svg = await fetchSimpleIcon(iconSlug);
    if (svg) {
      const outAbs = path.join(LOGO_DIR, `${slug}.svg`);
      await fs.writeFile(outAbs, svg);
      return `/logos/${slug}.svg`;
    }
  }
  // 3. No logo — fallback initial will render.
  return '';
}

async function main() {
  await fs.mkdir(LOGO_DIR, { recursive: true });
  const md = await fs.readFile(CERT_FILE, 'utf-8');
  const lines = md.split('\n');

  let pendingIssuer = null;
  let localized = 0;
  let cleared = 0;

  for (let i = 0; i < lines.length; i++) {
    const issuerMatch = lines[i].match(/^\s+issuer:\s*"([^"]+)"/);
    if (issuerMatch) {
      pendingIssuer = issuerMatch[1];
      continue;
    }
    const logoMatch = lines[i].match(/^(\s+logo:\s*)"([^"]+)"/);
    if (!logoMatch) continue;
    const url = logoMatch[2];
    if (url.startsWith('/logos/')) continue; // already local

    const resolved = await resolveLocal(pendingIssuer);
    if (resolved) {
      lines[i] = `${logoMatch[1]}"${resolved}"`;
      localized++;
      console.log(`✓ ${pendingIssuer} → ${resolved}`);
    } else {
      // Drop the logo line entirely so the About page fallback kicks in.
      lines.splice(i, 1);
      i--;
      cleared++;
      console.log(`− ${pendingIssuer} → no logo (initial fallback)`);
    }
  }

  await fs.writeFile(CERT_FILE, lines.join('\n'));
  console.log(`\nDone. ${localized} logos localized, ${cleared} cleared.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
