import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import CommandPalette from '@/components/command-palette';
import {
  siteConfig,
  siteKeywords,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';

const defaultTitle =
  'Sandeep Prajapati — AI Engineer & Full-Stack Developer';

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
  alternates: {
    canonical: siteConfig.url,
    types: { 'application/rss+xml': `${siteConfig.url}/rss.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        alt: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
      </body>
    </html>
  );
}
