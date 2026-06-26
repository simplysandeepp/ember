import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sandeep Prajapati — AI Engineer & Full-Stack Developer',
    short_name: 'Sandeep Prajapati',
    description:
      'Portfolio of Sandeep Prajapati — AI Engineer & Full-Stack Developer in New Delhi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
