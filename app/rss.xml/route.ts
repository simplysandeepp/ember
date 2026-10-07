import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/lib/metadata';

// Built once at deploy time like every other page — no runtime function.
export const dynamic = 'force-static';

// Escape XML-special characters in text used inside RSS elements.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();
  const site = siteConfig.url;
  const author = siteConfig.name;

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      const categories = (post.frontmatter.tags ?? [])
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.description ?? '')}</description>
      <dc:creator>${escapeXml(author)}</dc:creator>
      <pubDate>${pubDate}</pubDate>${categories ? '\n' + categories : ''}
    </item>`;
    })
    .join('\n');

  const lastBuild =
    posts.length > 0
      ? new Date(posts[0].frontmatter.date).toUTCString()
      : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Writing</title>
    <link>${site}/blog</link>
    <description>${escapeXml(
      'Writing by Sandeep Prajapati on AI engineering, LLMs, multi-agent RAG systems, AI automation, and full-stack development.'
    )}</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(author)}</copyright>
    <generator>Next.js on Vercel</generator>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${site}/opengraph-image</url>
      <title>${escapeXml(siteConfig.name)} — Writing</title>
      <link>${site}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
