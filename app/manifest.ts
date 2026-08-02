import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Sandeep Prajapati — Full-Stack Engineer, AI Products & Agents',
    short_name: 'Sandeep Prajapati',
    description:
      'Portfolio of Sandeep Prajapati — Full-Stack Engineer, AI Products & Agents in New Delhi. Projects, writing, and CV.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'browser'],
    orientation: 'portrait',
    lang: 'en',
    dir: 'ltr',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    categories: ['personal', 'portfolio', 'productivity', 'developer'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'Projects by Sandeep Prajapati',
        url: '/projects',
      },
      {
        name: 'Writing',
        short_name: 'Blog',
        description: 'Writing on AI engineering',
        url: '/blog',
      },
      {
        name: 'Resume',
        short_name: 'Resume',
        description: 'Full CV of Sandeep Prajapati',
        url: '/resume',
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch',
        url: '/contact',
      },
    ],
  };
}
