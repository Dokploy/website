import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dokploy Documentation',
    template: '%s | Dokploy',
  },
  description: 'Open Source Alternative to Vercel, Netlify and Heroku. Deploy your applications with ease.',
  keywords: ['dokploy', 'deployment', 'docker', 'hosting', 'devops', 'open source'],
  authors: [{ name: 'Dokploy Team' }],
  openGraph: {
    title: 'Dokploy Documentation',
    description: 'Open Source Alternative to Vercel, Netlify and Heroku',
    type: 'website',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
