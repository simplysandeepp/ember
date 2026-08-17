export type ProjectFrontmatter = {
  title: string;
  description: string;
  // Optional override for <meta name="description">/OG/Twitter, capped
  // around 155-160 chars so Google doesn't truncate it. `description` stays
  // full-length for the visible on-page sub-headline; falls back to it when
  // unset.
  metaDescription?: string;
  date: string;
  tags: string[];
  github?: string;
  live?: string;
  demo?: string;
  featured?: boolean;
  priority?: number;
  pinned?: boolean;
  image?: string;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  // See ProjectFrontmatter.metaDescription — same override, same fallback.
  metaDescription?: string;
  date: string;
  tags?: string[];
  published?: boolean;
};

export type ExperienceFrontmatter = {
  company: string;
  role: string;
  start: string;
  end: string;
  order?: number;
};

export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  link?: string;
  logo?: string;
  details?: string;
};

export type ContentItem<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

export function formatDate(dateStr: string): string {
  // Parse as UTC to avoid timezone shifting (e.g. "2024-01-15" -> Jan 15, not Jan 14 in some TZs)
  // Handle both date-only (YYYY-MM-DD) and datetime strings
  const date = dateStr.includes('T')
    ? new Date(dateStr)
    : new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
