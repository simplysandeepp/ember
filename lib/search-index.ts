import GithubSlugger from 'github-slugger';
import {
  getAllProjects,
  getAllPosts,
  getAllExperience,
  getCertifications,
} from './content';

export type SearchDoc = {
  /** Page title the section belongs to. */
  title: string;
  /** Heading text within the page, if the match is inside a section. */
  heading?: string;
  /** Deep link, including a #heading anchor when available. */
  url: string;
  /** Section label shown on the right of a result row. */
  kind: 'Project' | 'Blog' | 'Experience' | 'Certification' | 'Page';
  /** Plain-text body used for matching and snippet extraction. */
  text: string;
};

/**
 * Markdown → plain text. Search matches and snippets read better without
 * fences, link syntax, and emphasis markers cluttering the body.
 */
function stripMarkdown(md: string): string {
  // Track fenced code block state to handle nested fences correctly
  let inFence = false;
  const lines = md.split('\n');
  const cleanedLines: string[] = [];

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    cleanedLines.push(line);
  }

  return cleanedLines
    .join('\n')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits a markdown body into one doc per heading so a hit deep-links to the
 * exact section. Text before the first heading becomes the page-level doc.
 * Heading IDs use github-slugger to match the anchors rehype-slug emits.
 */
function sectionsOf(
  body: string,
  base: { title: string; url: string; kind: SearchDoc['kind'] }
): SearchDoc[] {
  const slugger = new GithubSlugger();
  const docs: SearchDoc[] = [];
  const lines = body.split('\n');

  let heading: string | undefined;
  let headingId: string | undefined;
  let buffer: string[] = [];

  const flush = () => {
    const text = stripMarkdown(buffer.join('\n'));
    if (!text) return;
    docs.push({
      ...base,
      heading,
      url: headingId ? `${base.url}#${headingId}` : base.url,
      text,
    });
  };

  for (const line of lines) {
    // Skip H1 (# Heading) - page-level doc already exists before first heading
    const match = /^(#{2,6})\s+(.*)$/.exec(line);
    if (match) {
      flush();
      buffer = [];
      heading = stripMarkdown(match[2]);
      headingId = slugger.slug(heading);
    } else {
      buffer.push(line);
    }
  }
  flush();

  return docs;
}

/**
 * Full-text index over every markdown-backed page, plus the static routes.
 * Serialized once at build time by /search-index.json and fetched lazily by
 * the ⌘K palette, so no page pays for it up front.
 */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const p of getAllProjects()) {
    const fm = p.frontmatter;
    const url = `/projects/${p.slug}`;
    docs.push({
      title: fm.title,
      url,
      kind: 'Project',
      text: [fm.description, ...(fm.tags ?? [])].filter(Boolean).join(' · '),
    });
    docs.push(
      ...sectionsOf(p.content, { title: fm.title, url, kind: 'Project' })
    );
  }

  for (const post of getAllPosts()) {
    const fm = post.frontmatter;
    const url = `/blog/${post.slug}`;
    docs.push({
      title: fm.title,
      url,
      kind: 'Blog',
      text: [fm.description, ...(fm.tags ?? [])].filter(Boolean).join(' · '),
    });
    docs.push(
      ...sectionsOf(post.content, { title: fm.title, url, kind: 'Blog' })
    );
  }

  for (const exp of getAllExperience()) {
    const fm = exp.frontmatter;
    docs.push({
      title: `${fm.role} · ${fm.company}`,
      url: '/about',
      kind: 'Experience',
      text: stripMarkdown(
        `${fm.company} ${fm.role} ${fm.start} ${fm.end} ${exp.content}`
      ),
    });
  }

  for (const cert of getCertifications()) {
    docs.push({
      title: cert.title,
      url: '/about',
      kind: 'Certification',
      text: stripMarkdown(
        [cert.issuer, cert.issued, cert.details].filter(Boolean).join(' · ')
      ),
    });
  }

  const pages: { title: string; url: string; text: string }[] = [
    { title: 'Home', url: '/', text: 'home start index selected work' },
    {
      title: 'About',
      url: '/about',
      text: 'about bio background experience education skills certifications faq',
    },
    { title: 'Projects', url: '/projects', text: 'projects work portfolio' },
    { title: 'Blog', url: '/blog', text: 'blog writing posts articles' },
    { title: 'Resume', url: '/resume', text: 'resume cv print download' },
    { title: 'Contact', url: '/contact', text: 'contact email message hire' },
  ];
  for (const page of pages) {
    docs.push({ ...page, kind: 'Page' });
  }

  return docs;
}
