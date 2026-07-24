import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Sandeep Prajapati — AI Engineer & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="92" height="110" viewBox="0 0 100 120" fill="none">
            <path
              d="M74 36 C74 18 26 18 26 42 C26 62 74 60 74 84 C74 106 26 106 26 86"
              stroke="#fafafa"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Sandeep Prajapati
          </div>
          <div
            style={{
              fontSize: 38,
              color: '#a3a3a3',
              marginTop: 20,
              letterSpacing: '-0.01em',
            }}
          >
            AI Engineer &amp; Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#737373',
              marginTop: 28,
            }}
          >
            RAG pipelines · AI agents · Next.js · New Delhi, India
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#737373' }}>
          sandeepp.in
        </div>
      </div>
    ),
    { ...size }
  );
}
