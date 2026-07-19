'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessToast() {
  const router = useRouter();
  const params = useSearchParams();
  const submitted = params.get('submitted') === 'true';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    const cleanupTimer = setTimeout(() => {
      router.replace('/contact', { scroll: false });
    }, 5400);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [submitted, router]);

  if (!submitted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-lg text-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>Thanks for reaching out — I&rsquo;ll get back to you soon.</span>
      </div>
    </div>
  );
}
