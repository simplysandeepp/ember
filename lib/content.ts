import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  github?: string;
  live?: string;
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
};

export type ContentItem<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

function readDir(folder: string): string[] {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

// Auto-find an image in /public/projects matching the slug (any common ext).
// Lets you drop `public/projects/<slug>.{png,jpg,jpeg,gif,webp}` with no
// frontmatter edits. An explicit `image:` in frontmatter still wins.
const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'];
function findProjectImage(slug: string): string | undefined {
  const dir = path.join(process.cwd(), 'public', 'projects');
  for (const ext of IMAGE_EXTS) {
    if (fs.existsSync(path.join(dir, `${slug}.${ext}`))) {
      return `/projects/${slug}.${ext}`;
    }
  }
  return undefined;
}

function parseFile<T>(folder: string, filename: string): ContentItem<T> {
  const filePath = path.join(contentDir, folder, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.(md|mdx)$/, '');
  if (folder === 'projects' && !(data as ProjectFrontmatter).image) {
    const found = findProjectImage(slug);
    if (found) (data as ProjectFrontmatter).image = found;
  }
  return { slug, frontmatter: data as T, content };
}

export function getAllProjects(): ContentItem<ProjectFrontmatter>[] {
  return readDir('projects')
    .map((f) => parseFile<ProjectFrontmatter>('projects', f))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getFeaturedProjects(): ContentItem<ProjectFrontmatter>[] {
  // Featured projects ordered by `priority` (1 = first); ties fall back to date.
  return getAllProjects()
    .filter((p) => p.frontmatter.featured)
    .sort(
      (a, b) =>
        (a.frontmatter.priority ?? 99) - (b.frontmatter.priority ?? 99)
    );
}

export function getProjectBySlug(
  slug: string
): ContentItem<ProjectFrontmatter> | null {
  const files = readDir('projects');
  const file = files.find((f) => f.replace(/\.(md|mdx)$/, '') === slug);
  if (!file) return null;
  return parseFile<ProjectFrontmatter>('projects', file);
}

export function getAllPosts(): ContentItem<BlogFrontmatter>[] {
  return readDir('blog')
    .map((f) => parseFile<BlogFrontmatter>('blog', f))
    .filter((p) => p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(
  slug: string
): ContentItem<BlogFrontmatter> | null {
  const files = readDir('blog');
  const file = files.find((f) => f.replace(/\.(md|mdx)$/, '') === slug);
  if (!file) return null;
  return parseFile<BlogFrontmatter>('blog', file);
}

export function getAllExperience(): ContentItem<ExperienceFrontmatter>[] {
  return readDir('experience')
    .map((f) => parseFile<ExperienceFrontmatter>('experience', f))
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export function getCertifications(): Certification[] {
  const filePath = path.join(contentDir, 'certifications.md');
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  const certs = (data.certifications as Certification[]) ?? [];
  return certs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.issued).getTime() - new Date(a.issued).getTime()
    );
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
