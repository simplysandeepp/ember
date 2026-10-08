import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CommandPalette from '@/components/command-palette';
import {
  siteConfig,
  siteKeywords,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';

const defaultTitle =
  'Sandeep Prajapati — Full-Stack Engineer, AI Products & Agents';

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: '%s | Sandeep Prajapati',
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: 'Sandeep Prajapati',
  keywords: siteKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  // No `canonical` here — every real page sets its own (buildMetadata and
  // each per-page `alternates`). A blanket canonical at this level was only
  // ever inherited by pages that skip metadata entirely, i.e. the 404 page,
  // where it wrongly pointed google at the homepage as the "real" URL for
  // a not-found page.
  alternates: {
    types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` },
  },
  // Secondary host — excluded from search so it doesn't duplicate sandeepp.in.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  ...(siteConfig.googleVerification
    ? { verification: { google: siteConfig.googleVerification } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Sandeep Prajapati — Full-Stack Engineer, AI Products & Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [`${siteConfig.url}/opengraph-image`],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#0a0a0a' },
    ],
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
};

// Combined JSON-LD for Person + WebSite - single script tag instead of two
const rootJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd, websiteJsonLd],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Identity chain — rel=me on GitHub + LinkedIn plus rel=author lets
            Google connect this site to Sandeep Prajapati's verified profiles. */}
        <link rel="me" href={siteConfig.github} />
        <link rel="me" href={siteConfig.linkedin} />
        <link rel="author" href={`${siteConfig.url}/about`} />

        {/* Perf hints — warm up sockets to origins we hit on nearly every visit. */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="" />
        {/* media.licdn.com serves certification logos in the About page fold — preconnect for faster paint. */}
        <link rel="preconnect" href="https://media.licdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://github-readme-stats.vercel.app" />
        <link rel="dns-prefetch" href="https://leetcard.jacoblin.cool" />
        <link rel="dns-prefetch" href="https://giscus.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body
        className="antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans"
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-neutral-900 focus:text-white dark:focus:bg-neutral-100 dark:focus:text-neutral-900 focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content" className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
