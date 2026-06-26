import { Metadata } from 'next';

const siteUrl = 'https://sandeepp.in';

export const siteConfig = {
  name: 'Sandeep Prajapati',
  url: siteUrl,
  description:
    'AI Engineer & Full-Stack Developer based in New Delhi, India. Building intelligent systems with RAG, LangGraph, and modern web tech.',
  twitter: '@simplysandeepp',
  github: 'https://github.com/simplysandeepp',
  linkedin: 'https://linkedin.com/in/simplysandeepp',
  instagram: 'https://instagram.com/simplysandeepp',
  leetcode: 'https://leetcode.com/u/turiyax/',
  email: 'sandeepprajapati1202@gmail.com',
};

export function buildMetadata({
  title,
  description,
  path: pagePath = '',
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${pagePath}`;
  const ogImage = image ?? `${siteUrl}/og.png`;

  return {
    title: `${title} | Sandeep Prajapati`,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sandeep Prajapati',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
  };
}
