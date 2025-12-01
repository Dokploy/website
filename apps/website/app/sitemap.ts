import { getPosts } from '@/lib/ghost'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts()
	return [
		{
			url: 'https://dokploy.com',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://dokploy.com/blog',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://dokploy.com/dokploy-vs-coolify',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		...posts.map((post) => ({
			url: `https://dokploy.com/blog/${post.slug}`,
			lastModified: new Date(post.published_at),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
	]
}
