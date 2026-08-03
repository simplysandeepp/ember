import { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/content';
import { siteConfig } from '@/lib/metadata';
import { gitLastModified } from '@/lib/git-date';

// Fallback used only if git history for a path is unavailable at build time
// (e.g. a shallow clone). Bump manually if these pages change meaningfully
// and git history somehow isn't available in the deploy environment.
const FALLBACK_DATE = '2026-08-01';

export default function sitemap(): MetadataRoute.Sitemap {
  const allProjects = getAllProjects();
  const allPosts = getAllPosts();

  // Use the newest project/post date as the collection page's lastmod so
  // Google notices when either list is meaningfully updated.
  const latestProjectDate = allProjects[0]
    ? new Date(allProjects[0].frontmatter.date)
    : new Date();
  const latestPostDate = allPosts[0]
    ? new Date(allPosts[0].frontmatter.date)
    : new Date();

  const projects = allProjects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const posts = allPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: gitLastModified('app/page.tsx', FALLBACK_DATE),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: gitLastModified('app/about/page.tsx', FALLBACK_DATE),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: latestProjectDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/resume`,
      lastModified: gitLastModified('app/resume/page.tsx', FALLBACK_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: gitLastModified('app/contact/page.tsx', FALLBACK_DATE),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...projects,
    ...posts,
  ];
}
