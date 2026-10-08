import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  // beta.sandeepp.in serves the earlier minimalist build alongside the main
  // site at sandeepp.in. Both carry the same content, so crawlers are kept
  // out here to avoid a duplicate of every page under a second hostname.
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
