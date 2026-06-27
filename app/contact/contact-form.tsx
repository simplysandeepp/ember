import { siteConfig } from '@/lib/metadata';

export default function ContactForm() {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
        Send a message
      </h2>

      <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
        Have a project, role, or idea? Drop me a note — I read every message.
      </p>

      <a
        href={siteConfig.tallyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors duration-200"
      >
        Open contact form
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
