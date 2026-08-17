import fs from 'fs';
import path from 'path';
import matter from 'front-matter';
import type {
  ProjectFrontmatter,
  BlogFrontmatter,
  ExperienceFrontmatter,
  Certification,
  ContentItem,
} from './content-types';
export type {
  ProjectFrontmatter,
  BlogFrontmatter,
  ExperienceFrontmatter,
  Certification,
  ContentItem,
};
export { formatDate } from './content-types';

const contentDir = path.join(process.cwd(), 'content');

// Module-level cache for build-time content (static files don't change during build)
let _allProjectsCache: ContentItem<ProjectFrontmatter>[] | null = null;
let _allPostsCache: ContentItem<BlogFrontmatter>[] | null = null;
let _allExperienceCache: ContentItem<ExperienceFrontmatter>[] | null = null;
let _certificationsCache: Certification[] | null = null;

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
  const { attributes, body } = matter(raw);
  const slug = filename.replace(/\.(md|mdx)$/, '');
  if (folder === 'projects' && !(attributes as ProjectFrontmatter).image) {
    const found = findProjectImage(slug);
    if (found) (attributes as ProjectFrontmatter).image = found;
  }
  return { slug, frontmatter: attributes as T, content: body };
}

export function getAllProjects(): ContentItem<ProjectFrontmatter>[] {
  if (_allProjectsCache) return _allProjectsCache;
  _allProjectsCache = readDir('projects')
    .map((f) => parseFile<ProjectFrontmatter>('projects', f))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  return _allProjectsCache;
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
  if (_allPostsCache) return _allPostsCache;
  _allPostsCache = readDir('blog')
    .map((f) => parseFile<BlogFrontmatter>('blog', f))
    .filter((p) => p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  return _allPostsCache;
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
  if (_allExperienceCache) return _allExperienceCache;
  _allExperienceCache = readDir('experience')
    .map((f) => parseFile<ExperienceFrontmatter>('experience', f))
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
  return _allExperienceCache;
}

export function getCertifications(): Certification[] {
  if (_certificationsCache) return _certificationsCache;
  const filePath = path.join(contentDir, 'certifications.md');
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { attributes } = matter(raw) as { attributes: Record<string, unknown> };
  const certs = (attributes.certifications as Certification[]) ?? [];
  _certificationsCache = certs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.issued).getTime() - new Date(a.issued).getTime()
    );
  return _certificationsCache;
}
