// Internationalization removed

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: [
			"static.ghost.org",
			"testing-ghost-8423be-31-220-108-27.traefik.me",
			"images.unsplash.com",
			"www.gravatar.com",
			"cms.dokploy.com",
		],
	},
};

module.exports = nextConfig;
