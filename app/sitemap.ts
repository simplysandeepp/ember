import { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/content';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...projects,
    ...posts,
  ];
}
