import { buildSearchIndex } from '@/lib/search-index';

// Prerendered at build time so the palette fetches a plain static file.
export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
