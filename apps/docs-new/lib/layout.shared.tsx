import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Dokploy',
      url: 'https://dokploy.com',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'API',
        url: '/docs/api',
      },
    ],
    githubUrl: 'https://github.com/Dokploy/dokploy',
  };
}
