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
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
