import { getPost, getPosts } from '@/lib/ghost'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type React from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import type { BundledLanguage } from 'shiki/bundle/web'
import TurndownService from 'turndown'
// @ts-ignore
import * as turndownPluginGfm from 'turndown-plugin-gfm'
import { CodeBlock } from './components/CodeBlock'
import { H1, H2, H3 } from './components/Headings'
import { TableOfContents } from './components/TableOfContents'
import { ZoomableImage } from './components/ZoomableImage'
import { useTranslations } from '@/lib/intl'

type Props = {
	params: { slug: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost(slug)

	if (!post) {
		return {
			title: 'Post Not Found',
		}
	}

	const ogUrl = new URL(
		`/api/og`,
		process.env.NODE_ENV === 'production'
			? 'https://dokploy.com'
			: 'http://localhost:3000',
	)
	ogUrl.searchParams.set('slug', slug)

	return {
		title: post.title,
		description: post.custom_excerpt || post.excerpt,
		openGraph: {
			title: post.title,
			description: post.custom_excerpt || post.excerpt,
			type: 'article',
			url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
			images: [
				{
					url: ogUrl.toString(),
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.custom_excerpt || post.excerpt,
			images: [ogUrl.toString()],
		},
	}
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	const t = useTranslations('blog')
	const post = await getPost(slug)
	const allPosts = await getPosts()

	const relatedPosts = allPosts.filter((p) => p.id !== post?.id).slice(0, 3)

	if (!post) {
		notFound()
	}

	const cleanHtml = (html: string) => {
		if (typeof window !== 'undefined') {
			const parser = new DOMParser()
			const doc = parser.parseFromString(html, 'text/html')
			const scripts = doc.querySelectorAll(
				'script[type="application/ld+json"], script',
			)
			scripts.forEach((script) => script.remove())
			const unwantedElements = doc.querySelectorAll('style, meta, link')
			unwantedElements.forEach((el) => el.remove())
			return doc.body.innerHTML
		} else {
			return html
				.replace(
					/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
					'',
				)
				.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
				.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
				.replace(/<meta[^>]*>/gi, '')
				.replace(/<link[^>]*>/gi, '')
		}
	}

	const turndownService = new TurndownService({
		headingStyle: 'atx',
		codeBlockStyle: 'fenced',
	})
	const gfm = turndownPluginGfm.gfm
	const tables = turndownPluginGfm.tables
	const strikethrough = turndownPluginGfm.strikethrough
	turndownService.use([tables, strikethrough, gfm, remarkToc])

	const cleanedHtml = cleanHtml(post.html)
	const markdown = turndownService.turndown(cleanedHtml)

	const formattedDate = new Date(post.published_at).toLocaleDateString('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const components: Partial<Components> = {
		h1: H1,
		h2: H2,
		h3: H3,
		p: ({ node, children, ...props }) => (
			<p
				className="mb-4 text-base leading-relaxed text-muted-foreground"
				{...props}
			>
				{children}
			</p>
		),
		a: ({ node, href, ...props }) => (
			<a
				href={href}
				className="text-blue-500 transition-colors hover:text-blue-500/80"
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			/>
		),
		ul: ({ node, ...props }) => (
			<ul
				className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground"
				{...props}
			/>
		),
		ol: ({ node, ...props }) => (
			<ol
				className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground"
				{...props}
			/>
		),
		li: ({ node, ...props }) => (
			<li className="ml-2 text-base leading-relaxed" {...props} />
		),
		blockquote: ({ node, ...props }) => (
			<blockquote
				className="my-4 border-l-4 border-primary bg-muted/50 py-2 pl-4"
				{...props}
			/>
		),
		table: ({ node, ...props }) => (
			<div className="my-6 w-full overflow-x-auto rounded-lg border">
				<table className="w-full border-collapse" {...props} />
			</div>
		),
		thead: ({ node, ...props }) => (
			<thead className="border-b border-border bg-muted" {...props} />
		),
		tbody: ({ node, ...props }) => (
			<tbody className="divide-y divide-border" {...props} />
		),
		tr: ({ node, ...props }) => (
			<tr className="transition-colors hover:bg-muted/50" {...props} />
		),
		th: ({ node, ...props }) => (
			<th className="p-4 text-left font-semibold" {...props} />
		),
		td: ({ node, ...props }) => (
			<td className="p-4 text-muted-foreground" {...props} />
		),
		img: ({ node, src, alt }) => (
			<ZoomableImage
				src={src || ''}
				alt={alt || ''}
				className="mx-auto max-w-lg overflow-hidden rounded-lg border border-border object-cover max-lg:w-64"
			/>
		),
		code: ({
			className,
			children,
			inline,
		}: {
			className: string
			children: React.ReactNode
			inline: boolean
		}) => {
			if (inline || !className || !/language-(\w+)/.test(className)) {
				return (
					<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
						{children}
					</code>
				)
			}
			const match = /language-(\w+)/.exec(className)
			return (
				<CodeBlock
					lang={match ? (match[1] as BundledLanguage) : 'ts'}
					code={children?.toString() || ''}
				/>
			)
		},
	}

	return (
		<article className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
			<Link
				href="/blog"
				className="mb-8 inline-flex items-center text-primary transition-colors hover:text-primary/80"
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
				{t('backToBlog')}
			</Link>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
				<div className="rounded-lg border border-border p-8 shadow-lg">
					<header className="mb-8">
						<h1 className="mb-4 text-xl font-bold md:text-2xl xl:text-3xl">
							{post.title}
						</h1>
						<div className="mb-6 flex items-center">
							{post.primary_author?.profile_image && (
								<div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
									{post.primary_author.twitter ? (
										<a
											href={`https://twitter.com/${post.primary_author.twitter}`}
											target="_blank"
											rel="noopener noreferrer"
											className="block cursor-pointer transition-opacity hover:opacity-90"
										>
											<img
												src={
													post.primary_author
														.profile_image
												}
												alt={post.primary_author.name}
												className="object-cover"
											/>
										</a>
									) : (
										<img
											src={
												post.primary_author
													.profile_image
											}
											alt={post.primary_author.name}
											className="object-cover"
										/>
									)}
								</div>
							)}
							<div>
								<p className="font-medium">
									{post.primary_author?.twitter ? (
										<a
											href={`https://twitter.com/${post.primary_author.twitter}`}
											target="_blank"
											rel="noopener noreferrer"
											className="transition-colors hover:text-primary"
										>
											{post.primary_author.name ||
												'Unknown Author'}
										</a>
									) : (
										post.primary_author?.name ||
										'Unknown Author'
									)}
								</p>
								<p className="text-sm text-muted-foreground">
									{formattedDate} • {post.reading_time} min
									read
								</p>
							</div>
						</div>
						{post.feature_image && (
							<div className="relative mb-8  h-[400px] w-full">
								<ZoomableImage
									src={post.feature_image}
									alt={post.title}
									className="h-full w-full rounded-lg object-cover"
								/>
							</div>
						)}
					</header>

					<div className="prose prose-lg max-w-none">
						<ReactMarkdown
							remarkPlugins={[
								remarkGfm,
								[remarkToc, { tight: true, maxDepth: 3 }],
							]}
							rehypePlugins={[rehypeRaw]}
							components={components}
						>
							{markdown}
						</ReactMarkdown>
					</div>

					{post.tags && post.tags.length > 0 && (
						<div className="mt-12 border-t border-border pt-6">
							<h2 className="mb-4 text-xl font-semibold">
								{t('tags')}
							</h2>
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<Link
										key={tag.id}
										href={`/blog/tag/${tag.slug}`}
										className="rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-muted/80"
									>
										{tag.name}
									</Link>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="hidden max-w-[16rem] lg:block">
					<div className="sticky top-4">
						<TableOfContents />
					</div>
				</div>
			</div>

			{relatedPosts.length > 0 && (
				<div className="mt-12">
					<h2 className="mb-6 text-2xl font-bold">
						{t('relatedPosts')}
					</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{relatedPosts.map((relatedPost) => {
							const relatedPostDate = new Date(
								relatedPost.published_at,
							).toLocaleDateString('en', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})

							return (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.slug}`}
									className="group"
								>
									<div className="h-full overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl">
										{relatedPost.feature_image && (
											<div className="relative  w-full">
												<img
													src={
														relatedPost.feature_image ||
														'/og.png'
													}
													alt={relatedPost.title}
													className="object-cover "
												/>
											</div>
										)}
										<div className="p-6">
											<h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
												{relatedPost.title}
											</h3>
											<p className="mb-4 text-sm text-muted-foreground">
												{relatedPostDate} •{' '}
												{relatedPost.reading_time} min
												read
											</p>
											<p className="line-clamp-2 text-muted-foreground">
												{relatedPost.excerpt}
											</p>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			)}
		</article>
	)
}
