/** @type {import('next').NextConfig} */

// Content-Security-Policy: allows only the third-party origins this site
// actually talks to (giscus comments, Vercel Analytics/Speed Insights,
// self-hosted GitHub stats, LeetCode stat card, GitHub contribution chart).
// No inline script/style nonces yet — Next's hydration bootstrap and
// Tailwind both rely on inline tags, so 'unsafe-inline' stays for now.
// Everything else (frame-ancestors, object-src, base-uri, form-action) is
// locked to 'self'.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://giscus.app",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://github-readme-stats-simplysandeepp.vercel.app https://leetcard.jacoblin.cool https://ghchart.rshah.org https://giscus.app",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src https://giscus.app",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
