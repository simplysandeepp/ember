import {
  buildMetadata,
  siteConfig,
  breadcrumbJsonLd,
} from '@/lib/metadata';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from './contact-form';
import SuccessToast from './success-toast';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Sandeep Prajapati — Full-Stack Engineer in New Delhi. On GitHub, LinkedIn, LeetCode, X, Instagram, and via a direct contact form.',
  path: '/contact',
  keywords: [
    'Sandeep Prajapati contact',
    'Sandeep Prajapati email',
    'Sandeep Prajapati LinkedIn',
    'Sandeep Prajapati GitHub',
    'contact AI engineer New Delhi',
    'hire Sandeep Prajapati',
  ],
});

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteConfig.url}/contact#page`,
  url: `${siteConfig.url}/contact`,
  name: 'Contact Sandeep Prajapati',
  description:
    'Contact Sandeep Prajapati, Full-Stack Engineer building AI Products & Agentic Systems in New Delhi.',
  mainEntity: { '@id': `${siteConfig.url}/#person` },
  isPartOf: { '@id': `${siteConfig.url}/#website` },
};

const contactBreadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]);

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
    display: 'leetcode.com/u/simplysandeepp',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/simplysandeepp',
    display: 'x.com/simplysandeepp',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }}
      />
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Contact Sandeep Prajapati
      </h1>
      <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-sm">
        Open to full-stack AI engineering roles, interesting projects, and good
        conversations. Based in New Delhi, India.
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

      <Suspense fallback={null}>
        <SuccessToast />
      </Suspense>
    </div>
  );
}
