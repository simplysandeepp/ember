export type ProjectFrontmatter = {
  title: string;
  description: string;
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
