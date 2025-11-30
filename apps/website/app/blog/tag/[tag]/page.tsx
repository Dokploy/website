import { getPostsByTag, getTags } from '@/lib/ghost'
import type { Post } from '@/lib/ghost'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
	params: { tag: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params
	const posts = await getPostsByTag(tag)

	if (!posts || posts.length === 0) {
		return {
			title: 'Tag Not Found',
			description: 'The requested tag could not be found',
		}
	}

	const tagName =
		posts[0].tags?.find((t: { slug: string }) => t.slug === tag)?.name ||
		tag

	return {
		title: `${tagName} Posts`,
		description: `Browse all posts tagged with ${tagName}`,
	}
}

export async function generateStaticParams() {
	const tags = await getTags()
	return tags.map((tag: { slug: string }) => ({ tag: tag.slug }))
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params
	const posts = await getPostsByTag(tag)

	if (!posts || posts.length === 0) {
		notFound()
	}

	const tagName =
		posts[0].tags?.find((t: { slug: string }) => t.slug === tag)?.name ||
		tag

	return (
		<div className="container mx-auto px-4 py-12">
			<Link
				href="/blog"
				className="text-primary-600 hover:text-primary-800 mb-8 inline-flex items-center transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mr-2 h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>
				Back to Blog
			</Link>

			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold">
					Posts tagged with{' '}
					<span className="text-primary-600">"{tagName}"</span>
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					{posts.length} {posts.length === 1 ? 'post' : 'posts'} found
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post: Post) => (
					<BlogPostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	)
}

function BlogPostCard({ post }: { post: Post }) {
	const formattedDate = new Date(post.published_at).toLocaleDateString('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<Link href={`/blog/${post.slug}`} className="group">
			<div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
				{post.feature_image && (
					<div className="relative h-48 w-full">
						<Image
							src={post.feature_image}
							alt={post.title}
							fill
							className="object-cover"
						/>
					</div>
				)}
				<div className="p-6">
					<h2 className="group-hover:text-primary-500 mb-2 text-xl font-semibold transition-colors">
						{post.title}
					</h2>
					<p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
						{formattedDate} • {post.reading_time} min read
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-300">
						{post.custom_excerpt || post.excerpt}
					</p>
					<div className="flex items-center">
						{post.primary_author?.profile_image && (
							<div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
								<Image
									src={post.primary_author.profile_image}
									alt={post.primary_author.name}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div>
							<p className="font-medium">
								{post.primary_author?.name || 'Unknown Author'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
