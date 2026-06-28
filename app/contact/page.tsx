import { buildMetadata, siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';
import ContactForm from './contact-form';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Sandeep Prajapati — AI Engineer & Full-Stack Developer.',
  path: '/contact',
});

const socials = [
  {
    label: 'GitHub',
    href: siteConfig.github,
    display: 'github.com/simplysandeepp',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.linkedin,
    display: 'linkedin.com/in/simplysandeepp',
  },
  {
    label: 'Instagram',
    href: siteConfig.instagram,
    display: '@simplysandeepp',
  },
  {
    label: 'LeetCode',
    href: siteConfig.leetcode,
    display: 'leetcode.com/u/turiyax',
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/simplysandeepp/',
    display: 'pinterest.com/simplysandeepp',
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/@simplysandeepp',
    display: '@simplysandeepp',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/31cyj3fynvoub27sgwry4ijlsaku',
    display: 'open.spotify.com/user/simplysandeepp',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Contact
      </h1>
      <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-sm">
        Open to AI engineering roles, interesting projects, and good
        conversations.
      </p>

      {/* Socials */}
      <div className="mt-10 space-y-4">
        {socials.map(({ label, href, display }) => (
          <div key={label} className="flex items-baseline gap-8">
            <span className="w-16 text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
              {label}
            </span>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={
                href.startsWith('mailto') ? undefined : 'noopener noreferrer'
              }
              className="underline-link text-sm"
            >
              {display}
            </a>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-100 dark:border-neutral-800 my-12" />

      {/* Form */}
      <ContactForm />
    </div>
  );
}
