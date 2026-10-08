// Internationalization removed

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: "static.ghost.org",
			},
			{
				hostname: "testing-ghost-8423be-31-220-108-27.traefik.me",
			},
			{
				hostname: "images.unsplash.com",
			},
			{
				hostname: "www.gravatar.com",
			},
			{
				hostname: "cms.dokploy.com",
			},
			{
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
};

module.exports = nextConfig;
