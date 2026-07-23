import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = 'Blog — Sandeep Prajapati';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? 'Writing';
  const description = post?.frontmatter.description ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: '#a3a3a3',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Writing
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 30,
                color: '#a3a3a3',
                marginTop: 24,
                lineHeight: 1.3,
                maxWidth: 900,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#737373',
          }}
        >
          <span>Sandeep Prajapati</span>
          <span>sandeepp.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
