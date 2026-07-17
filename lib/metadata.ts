import { Metadata } from 'next';

const siteUrl = 'https://sandeepp.in';

export const siteConfig = {
  name: 'Sandeep Prajapati',
  firstName: 'Sandeep',
  lastName: 'Prajapati',
  url: siteUrl,
  jobTitle: 'AI Engineer & Full-Stack Developer',
  description:
    'Sandeep Prajapati is an AI Engineer & Full-Stack Developer based in New Delhi, India. He builds intelligent systems with RAG pipelines, AI agents, LangGraph, Next.js, and Python — currently an AI Software Developer Intern at DrCode.',
  shortDescription:
    'AI Engineer & Full-Stack Developer in New Delhi — RAG pipelines, AI agents, and modern web apps.',
  location: 'New Delhi, India',
  twitter: '@simplysandeepp',
  github: 'https://github.com/simplysandeepp',
  linkedin: 'https://linkedin.com/in/simplysandeepp',
  instagram: 'https://instagram.com/simplysandeepp',
  leetcode: 'https://leetcode.com/u/simplysandeepp/',
  // Tally contact form — visitors fill this instead of a backend-powered form.
  tallyUrl: 'https://tally.so/r/rjpAAl',
  // Public resume (Google Drive). Opens in a new tab from the ⌘K palette.
  resumeUrl: 'https://drive.google.com/file/d/1I9tdTdKXyH-P6YAoZCYpWhW9UwqzzKw5/view?usp=share_link',
  // Buttondown newsletter username — the blog signup form + RSS auto-email use this.
  // Set this to your Buttondown username to enable the newsletter signup form.
  buttondownUsername: 'Sandeepp',
  // Usernames for frontend stat embeds.
  githubUsername: 'simplysandeepp',
  leetcodeUsername: 'simplysandeepp',
  // Giscus (GitHub Discussions) blog comments — fully client-side, no backend.
  giscus: {
    repo: 'simplysandeepp/portfolio',
    repoId: 'R_kgDOTGDIuA',
    category: 'Announcements',
    categoryId: 'DIC_kwDOTGDIuM4DAEyp',
  },
  // Replace with the value from Google Search Console once you verify the domain.
  googleVerification: '0HfkcWG72TL4Mr_b2PxTpKNXUmcBUPdrnOrWpfwX9Q0',
};

/**
 * Keyword set tuned so "Sandeep Prajapati" ranks for his name plus the roles,
 * tech, and locations he works in. Used site-wide and extended per page.
 */
export const siteKeywords = [
  'Sandeep Prajapati',
  'Sandeep Prajapati portfolio',
  'Sandeep Prajapati AI Engineer',
  'Sandeep Prajapati developer',
  'Sandeep Prajapati DrCode',
  'simplysandeepp',
  'AI Engineer',
  'AI Software Developer',
  'Full-Stack Developer',
  'Full Stack Developer New Delhi',
  'RAG pipelines',
  'AI agents',
  'LangGraph',
  'LangChain',
  'Generative AI Engineer',
  'Machine Learning Engineer India',
  'Next.js developer',
  'React developer',
  'Python developer',
  'TypeScript developer',
  'AI Engineer New Delhi',
  'AI Engineer India',
  'DrCode',
  'Galgotias University',
  'GDG on Campus Galgotias',
];

const ogImage = `${siteUrl}/opengraph-image`;

export function buildMetadata({
  title,
  description,
  path: pagePath = '',
  image,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteUrl}${pagePath}`;
  const resolvedImage = image ?? ogImage;
  const fullTitle = `${title} | Sandeep Prajapati`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    keywords: keywords ? [...siteKeywords, ...keywords] : siteKeywords,
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical: url },
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
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: resolvedImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImage],
      creator: siteConfig.twitter,
    },
  };
}

/**
 * Person/ProfilePage structured data — the single most important signal for
 * "Sandeep Prajapati" name searches and Google Knowledge Panel eligibility.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: siteConfig.name,
  givenName: siteConfig.firstName,
  familyName: siteConfig.lastName,
  alternateName: 'simplysandeepp',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  worksFor: {
    '@type': 'Organization',
    name: 'DrCode',
    url: 'https://drcode.ai',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Galgotias University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  nationality: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'RAG Pipelines',
    'AI Agents',
    'LangGraph',
    'LangChain',
    'Large Language Models',
    'Full-Stack Development',
    'Next.js',
    'React',
    'TypeScript',
    'Python',
    'Node.js',
    'FastAPI',
    'Generative AI',
  ],
  sameAs: [
    siteConfig.github,
    siteConfig.linkedin,
    siteConfig.instagram,
    siteConfig.leetcode,
    `https://twitter.com/${siteConfig.twitter.replace('@', '')}`,
  ],
};

/** WebSite structured data — enables sitelinks search box eligibility. */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteConfig.name,
  description: siteConfig.shortDescription,
  inLanguage: 'en',
  publisher: { '@id': `${siteUrl}/#person` },
};

/**
 * FAQPage schema tuned for the "who is Sandeep Prajapati" / "what does
 * Sandeep Prajapati do" name searches. Every answer restates the full
 * name so Google's entity extractor keeps mapping the query to this
 * person.
 */
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Sandeep Prajapati?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandeep Prajapati is an AI Engineer & Full-Stack Developer based in New Delhi, India. He currently works as an AI Software Developer Intern at DrCode, where he builds production AI features including RAG pipelines, AI agents, and full-stack applications with Next.js and Python.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Sandeep Prajapati do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandeep Prajapati builds intelligent systems — retrieval-augmented generation (RAG) pipelines, LLM-powered agents with LangGraph and CrewAI, and the full-stack applications that ship them. His work combines Python/FastAPI backends with Next.js and TypeScript on the frontend.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Sandeep Prajapati based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandeep Prajapati is based in New Delhi, India. He is currently a B.Tech Computer Science student at Galgotias University, Greater Noida, and works hybrid at DrCode.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Sandeep Prajapati?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach Sandeep Prajapati through the contact form at sandeepp.in/contact, on LinkedIn at linkedin.com/in/simplysandeepp, or on GitHub at github.com/simplysandeepp.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Sandeep Prajapati work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandeep Prajapati works with Python, FastAPI, TypeScript, Next.js, React, and Node.js. On the AI side he uses LangGraph, LangChain, CrewAI, Pydantic AI, vector databases, and the OpenAI, Anthropic, and Groq APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I see Sandeep Prajapati’s projects and resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandeep Prajapati’s projects live at sandeepp.in/projects and the full HTML resume is at sandeepp.in/resume. The site also links to his GitHub, LinkedIn, and LeetCode profiles.',
      },
    },
  ],
};

/** BreadcrumbList builder for detail pages. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
