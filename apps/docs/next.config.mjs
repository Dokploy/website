import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: "standalone",
	basePath: "/docs",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "templates.dokploy.com",
			},
		],
	},
};

export default withMDX(config);
