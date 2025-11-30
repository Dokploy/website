import { getPosts, getTags } from '@/lib/ghost'
import type { Post } from '@/lib/ghost'
import { RssIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPostCard } from './components/BlogPostCard'
import { SearchAndFilter } from './components/SearchAndFilter'
import { useTranslations } from '@/lib/intl'

interface Tag {
	id: string
	name: string
	slug: string
}

export const metadata: Metadata = {
	title: 'Blog | Dokploy',
	description: 'Latest news, updates, and articles from Dokploy',
}

export default async function BlogPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const searchParams2 = await searchParams
	const t = useTranslations('blog')
	const posts = await getPosts()
	const tags = (await getTags()) as Tag[]
	const search =
		typeof searchParams2.search === 'string' ? searchParams2.search : ''
	const selectedTag =
		typeof searchParams2.tag === 'string' ? searchParams2.tag : ''

	const filteredPosts = posts.filter((post) => {
		const matchesSearch =
			search === '' ||
			post.title.toLowerCase().includes(search.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(search.toLowerCase())

		const matchesTag =
			selectedTag === '' ||
			post.tags?.some((tag) => tag.slug === selectedTag)

		return matchesSearch && matchesTag
	})

	return (
		<div className="container mx-auto max-w-5xl px-4 py-12">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<p className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
						BLOG
					</p>
					<h1 className="text-4xl font-bold">
						Dokploy Latest News & Updates
					</h1>
				</div>
				<Link
					href="/rss.xml"
					className="text-muted-foreground hover:text-foreground"
				>
					<RssIcon className="h-5 w-5" />
				</Link>
			</div>

			<SearchAndFilter
				tags={tags}
				initialSearch={search}
				initialTag={selectedTag}
				searchPlaceholder={t('searchPlaceholder')}
				allTagsText={t('allTags')}
			/>

			{filteredPosts.length === 0 ? (
				<div className="flex min-h-[20vh] items-center justify-center py-12 text-center">
					<p className="text-xl text-muted-foreground">
						{search || selectedTag ? t('noResults') : t('noPosts')}
					</p>
				</div>
			) : (
				<div className="space-y-8">
					{filteredPosts.map((post: Post) => (
						<BlogPostCard key={post.id} post={post} />
					))}
				</div>
			)}
		</div>
	)
}
