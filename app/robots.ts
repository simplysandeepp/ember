import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // `/_next/` is deliberately NOT disallowed — it serves the CSS and JS
        // the page needs to render. Blocking it leaves any crawler without its
        // own rule below (link unfurlers, non-Google search engines) rendering
        // an unstyled, scriptless page.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly welcome Googlebot's image + news bots so project screenshots
      // and blog posts get picked up by Image / Discover surfaces.
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-News', allow: '/blog/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
