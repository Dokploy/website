import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverExternalPackages: ['shiki', 'fumadocs-openapi'],
  },
};

export default withMDX(config);
