import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
        404
      </h1>
      <p className="mt-3 text-base text-neutral-500">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-sm text-neutral-900 underline underline-offset-2 hover:text-neutral-500 transition-colors"
      >
        ← Go home
      </Link>
    </div>
  );
}
