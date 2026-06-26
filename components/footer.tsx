import Link from 'next/link';
import { siteConfig } from '@/lib/metadata';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-100 dark:border-neutral-800 mt-24">
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          &copy; {new Date().getFullYear()} Sandeep Prajapati
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Instagram
            </a>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
