import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = 'Project — Sandeep Prajapati';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.frontmatter.title ?? 'Project';
  const description = project?.frontmatter.description ?? '';
  const tags = project?.frontmatter.tags ?? [];

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
          Project
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
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
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </div>
          )}
          {tags.length > 0 && (
            <div
              style={{
                fontSize: 24,
                color: '#737373',
                marginTop: 28,
              }}
            >
              {tags.slice(0, 5).join('  ·  ')}
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
