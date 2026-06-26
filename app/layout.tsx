import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import {
  siteConfig,
  siteKeywords,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
  alternates: { canonical: siteConfig.url },
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
    apple: [{ url: '/favicon.svg' }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans`}
      >
        <ThemeProvider>
          <Nav />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
