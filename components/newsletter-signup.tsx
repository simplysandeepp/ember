import { siteConfig } from '@/lib/metadata';

/**
 * Newsletter signup CTA. Opens the Tally form in a new tab instead of
 * posting to an external endpoint, so visitors never land on a 3rd-party page.
 */
export default function NewsletterSignup() {
  if (!siteConfig.tallyUrl) return null;

  return (
    <section className="mt-16 pt-10 border-t border-neutral-100 dark:border-neutral-800">
      <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Subscribe
      </h2>
      <p className="mt-1 text-sm text-neutral-500 leading-relaxed max-w-sm">
        Want an email when I publish something new? Drop your details and I&apos;ll
        keep you posted.
      </p>

      <a
        href={siteConfig.tallyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors duration-200"
      >
        Subscribe
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
