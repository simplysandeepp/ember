import Link from 'next/link';
import type { Metadata } from 'next';

// Without this, the page inherited the root layout's blanket
// `robots: { index: true, follow: true, googleBot: {...} }`, which rendered
// alongside Next's own auto-injected `noindex` for the not-found route —
// two conflicting <meta name="robots"> tags, plus a `googlebot` tag that
// explicitly said "index, follow" on a 404.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        404
      </h1>
      <p className="mt-3 text-base text-neutral-500">
        You are trying to access a page that does not exist. Please check the URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-500 transition-colors"
      >
        ← Go home
      </Link>
    </div>
  );
}
