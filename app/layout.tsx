import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { siteConfig } from '@/lib/metadata';

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

export const metadata: Metadata = {
  title: {
    default: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
    template: '%s | Sandeep Prajapati',
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: 'Sandeep Prajapati', url: siteConfig.url }],
  creator: 'Sandeep Prajapati',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Sandeep Prajapati',
    title: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
    description: siteConfig.description,
    images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 font-sans`}
      >
        <Nav />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
