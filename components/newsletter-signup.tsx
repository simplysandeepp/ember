import { siteConfig } from '@/lib/metadata';

/**
 * Buttondown email signup. Renders only when a username is configured.
 * Posts directly to Buttondown's embed endpoint — no backend required.
 */
export default function NewsletterSignup() {
  const user = siteConfig.buttondownUsername;
  if (!user) return null;

  const action = `https://buttondown.com/api/emails/embed-subscribe/${user}`;

  return (
    <section className="mt-16 pt-10 border-t border-neutral-100 dark:border-neutral-800">
      <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Subscribe
      </h2>
      <p className="mt-1 text-sm text-neutral-500 leading-relaxed max-w-sm">
        Get an email when I publish something new. No spam — unsubscribe anytime.
      </p>

      <form
        action={action}
        method="post"
        target="popupwindow"
        className="mt-5 flex flex-col sm:flex-row gap-2 max-w-sm"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 px-3 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-colors duration-200"
        />
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors duration-200 flex-shrink-0"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
