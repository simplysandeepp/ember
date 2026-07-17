import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
    short_name: 'Sandeep Prajapati',
    description:
      'Portfolio of Sandeep Prajapati — AI Engineer & Full-Stack Developer in New Delhi.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
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
