'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/theme-toggle';
import SiteSwitch from '@/components/site-switch';
import { openCommandPalette } from '@/components/command-palette';

const searchIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.65" y2="16.65" />
  </svg>
);

const links = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <nav className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200"
        >
          Home
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm px-3 py-1.5 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 font-medium'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
          <SiteSwitch />
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1">
          {/* ⌘K is keyboard-only, so touch devices need their own trigger. */}
          <button
            onClick={() => {
              setOpen(false);
              openCommandPalette();
            }}
            className="min-w-[44px] min-h-[44px] rounded-md flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Search this site"
          >
            {searchIcon}
          </button>
          <ThemeToggle />
          <SiteSwitch />
          <button
            onClick={() => setOpen((o) => !o)}
            className="min-w-[44px] min-h-[44px] rounded-md flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop — tap outside to dismiss */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-14 z-40 bg-black/30 backdrop-blur-sm sm:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      {open && (
        <div className="sm:hidden relative z-50 border-t border-neutral-100 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
          <ul className="max-w-2xl mx-auto px-4 py-2">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-3 rounded-md text-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 font-medium'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
