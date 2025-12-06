'use client'

import { Container } from '@/components/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	ExternalLink,
	Sparkles,
	Rocket,
	Calendar,
	GitBranch,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { BundledLanguage } from 'shiki/bundle/web'
import { CodeBlock } from '@/app/blog/[slug]/components/CodeBlock'
import { ZoomableImage } from '@/app/blog/[slug]/components/ZoomableImage'
import { useSearchParams, useRouter } from 'next/navigation'

interface Release {
	version: string
	date: string
	title: string
	body: string
	url: string
}

const RELEASES_PER_PAGE = 10

export default function ChangelogPage() {
	const [releases, setReleases] = useState<Release[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const searchParams = useSearchParams()
	const router = useRouter()

	// Get current page from URL
	const currentPage = Number(searchParams.get('page')) || 1

	useEffect(() => {
		async function fetchReleases() {
			try {
				const response = await fetch('/api/releases')
				if (!response.ok) {
					throw new Error('Failed to fetch releases')
				}
				const data = await response.json()
				setReleases(data)
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An error occurred',
				)
			} finally {
				setLoading(false)
			}
		}

		fetchReleases()
	}, [])

	// Pagination logic
	const totalPages = Math.ceil(releases.length / RELEASES_PER_PAGE)
	
	// Validate and clamp current page
	const validPage = Math.max(1, Math.min(currentPage, totalPages || 1))
	
	const startIndex = (validPage - 1) * RELEASES_PER_PAGE
	const endIndex = startIndex + RELEASES_PER_PAGE
	const currentReleases = releases.slice(startIndex, endIndex)

	const updatePage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', page.toString())
		router.push(`/changelog?${params.toString()}`)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const goToNextPage = () => {
		if (validPage < totalPages) {
			updatePage(validPage + 1)
		}
	}

	const goToPreviousPage = () => {
		if (validPage > 1) {
			updatePage(validPage - 1)
		}
	}

	const goToPage = (page: number) => {
		updatePage(page)
	}

	// Markdown components with styling
	const components: Partial<Components> = {
		h1: ({ children, ...props }) => (
			<h1
				className="mb-4 mt-8 text-2xl font-bold text-white"
				{...props}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2
				className="mb-3 mt-6 flex items-center gap-2 text-xl font-semibold text-white"
				{...props}
			>
				<Sparkles className="h-5 w-5 text-primary" />
				{children}
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3
				className="mb-2 mt-4 text-lg font-semibold text-white/90"
				{...props}
			>
				{children}
			</h3>
		),
		p: ({ children, ...props }) => (
			<p
				className="mb-4 text-base leading-relaxed text-muted-foreground"
				{...props}
			>
				{children}
			</p>
		),
		a: ({ href, children, ...props }) => (
			<a
				href={href}
				className="text-primary underline decoration-primary/30 hover:decoration-primary"
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
			</a>
		),
		ul: ({ children, ...props }) => (
			<ul
				className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground"
				{...props}
			>
				{children}
			</ul>
		),
		ol: ({ children, ...props }) => (
			<ol
				className="mb-4 list-decimal space-y-2 pl-6 text-muted-foreground"
				{...props}
			>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => (
			<li
				className="ml-2 text-sm leading-relaxed text-muted-foreground"
				{...props}
			>
				{children}
			</li>
		),
		blockquote: ({ children, ...props }) => (
			<blockquote
				className="my-4 border-l-4 border-primary/50 bg-gradient-to-r from-primary/5 to-transparent py-3 pl-4 text-muted-foreground"
				{...props}
			>
				{children}
			</blockquote>
		),
		code: ({ children, className, inline }: any) => {
			if (inline || !className || !/language-(\w+)/.test(className)) {
				return (
					<code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary ring-1 ring-primary/20">
						{children}
					</code>
				)
			}
			const match = /language-(\w+)/.exec(className)
			return (
				<CodeBlock
					lang={match ? (match[1] as BundledLanguage) : 'typescript'}
					code={children?.toString() || ''}
				/>
			)
		},
		table: ({ children, ...props }) => (
			<div className="my-6 w-full overflow-hidden rounded-lg border border-border/50 shadow-lg">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse" {...props}>
						{children}
					</table>
				</div>
			</div>
		),
		thead: ({ children, ...props }) => (
			<thead
				className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent"
				{...props}
			>
				{children}
			</thead>
		),
		tbody: ({ children, ...props }) => (
			<tbody className="divide-y divide-border/50" {...props}>
				{children}
			</tbody>
		),
		tr: ({ children, ...props }) => (
			<tr {...props}>
				{children}
			</tr>
		),
		th: ({ children, ...props }) => (
			<th
				className="p-4 text-left font-semibold text-white"
				{...props}
			>
				{children}
			</th>
		),
		td: ({ children, ...props }) => (
			<td
				className="p-4 text-sm text-muted-foreground"
				{...props}
			>
				{children}
			</td>
		),
		hr: ({ ...props }) => (
			<div className="relative my-8" {...props}>
				<hr className="border-border/30" />
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
				</div>
			</div>
		),
		img: ({ src, alt }) => {
			if (!src) return null
			return (
				<ZoomableImage
					src={src}
					alt={alt || 'Release image'}
					className="my-4 rounded-lg border border-primary/20 shadow-lg shadow-primary/5"
				/>
			)
		},
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-black py-20">
				<Container>
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="animate-spin">
							<Sparkles className="h-12 w-12 text-primary" />
						</div>
						<p className="text-muted-foreground">
							Loading releases...
						</p>
					</div>
				</Container>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-black py-20">
				<Container>
					<div className="text-center">
						<p className="text-red-500">Error: {error}</p>
					</div>
				</Container>
			</div>
		)
	}

	return (
		<div className="relative min-h-screen overflow-hidden bg-black">
			{/* Background Grid */}
			<div className="absolute inset-0 opacity-20">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px',
					}}
				/>
			</div>

			{/* Gradient Orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
			</div>

			{/* Content */}
			<div className="relative">
				<Container>
					<div className="mx-auto max-w-4xl py-20 sm:py-32">
						{/* Header */}
						<div className="mb-16 text-center">
							<div className="mb-6 inline-flex">
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-500 opacity-20 blur-xl" />
									<Rocket className="relative h-16 w-16 text-primary" />
								</div>
							</div>
							<h1 className="font-display mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
								Changelogs
							</h1>
							<p className="text-lg text-muted-foreground">
								All of the changes made will be available here.
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Dokploy is the most comprehensive deployment
								platform for your applications.
							</p>
						</div>

						{/* Releases */}
						<div className="space-y-16">
							{currentReleases.map((release, index) => (
								<article
									key={release.version}
									id={release.version}
									className="relative"
								>
									{/* Card */}
									<div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/50 to-background/30 p-8 backdrop-blur-sm">

										{/* Content */}
										<div className="relative">
											{/* Date badge with icon */}
											<div className="mb-6">
												<Badge
													variant="outline"
													className="border-primary/30 bg-primary/5 text-primary backdrop-blur-sm"
												>
													<Calendar className="mr-1.5 h-3 w-3" />
													{release.date}
												</Badge>
											</div>

											{/* Version and link */}
											<div className="mb-6 flex items-start justify-between gap-4">
												<div className="flex items-center gap-3">
													<GitBranch className="h-6 w-6 text-primary" />
													<h2 className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
														{release.version}
													</h2>
												</div>
												<Button
													variant="ghost"
													size="sm"
													asChild
													className="shrink-0"
												>
													<Link
														href={release.url}
														target="_blank"
														rel="noopener noreferrer"
													>
														View on GitHub
														<ExternalLink className="ml-2 h-4 w-4" />
													</Link>
												</Button>
											</div>

											{/* Markdown content */}
											<div className="prose prose-invert max-w-none">
												<ReactMarkdown
													remarkPlugins={[remarkGfm]}
													rehypePlugins={[rehypeRaw]}
													components={components}
												>
													{release.body}
												</ReactMarkdown>
											</div>
										</div>
									</div>

									{/* Divider with gradient */}
									{index < currentReleases.length - 1 && (
										<div className="relative mt-16">
											<div className="absolute inset-0 flex items-center">
												<div className="w-full border-t border-gradient-to-r from-transparent via-border/30 to-transparent" />
											</div>
											<div className="relative flex justify-center">
												<span className="bg-black px-4">
													<Sparkles className="h-4 w-4 text-primary/40" />
												</span>
											</div>
										</div>
									)}
								</article>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-16 flex flex-col items-center gap-6">
								{/* Page info */}
								<div className="text-sm text-muted-foreground">
									Showing{' '}
									<span className="font-semibold text-white">
										{startIndex + 1}-
										{Math.min(endIndex, releases.length)}
									</span>{' '}
									of{' '}
									<span className="font-semibold text-white">
										{releases.length}
									</span>{' '}
									releases
								</div>

								{/* Navigation buttons */}
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										onClick={goToPreviousPage}
										disabled={validPage === 1}
										className="gap-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="m15 18-6-6 6-6" />
										</svg>
										Previous
									</Button>

									{/* Page numbers */}
									<div className="flex items-center gap-1">
										{Array.from({ length: totalPages }, (_, i) => i + 1)
											.filter((page) => {
												// Show first page, last page, current page, and 2 pages around current
												return (
													page === 1 ||
													page === totalPages ||
													Math.abs(page - validPage) <= 1
												)
											})
											.map((page, idx, arr) => {
												// Add ellipsis if there's a gap
												const prevPage = arr[idx - 1]
												const showEllipsis =
													prevPage && page - prevPage > 1

												return (
													<div
														key={page}
														className="flex items-center gap-1"
													>
														{showEllipsis && (
															<span className="px-2 text-muted-foreground">
																...
															</span>
														)}
														<Button
															variant={
																validPage === page
																	? 'default'
																	: 'outline'
															}
															size="sm"
															onClick={() => goToPage(page)}
															className={
																validPage === page
																	? 'bg-primary text-black hover:bg-primary/90'
																	: ''
															}
														>
															{page}
														</Button>
													</div>
												)
											})}
									</div>

									<Button
										variant="outline"
										onClick={goToNextPage}
										disabled={validPage === totalPages}
										className="gap-2"
									>
										Next
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="m9 18 6-6-6-6" />
										</svg>
									</Button>
								</div>
							</div>
						)}

						{/* Footer links */}
						<div className="mt-16 border-t border-border/30 pt-16">
							<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
								<Button variant="outline" asChild>
									<Link
										href="https://docs.dokploy.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										Documentation
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link
										href="https://github.com/Dokploy/dokploy"
										target="_blank"
										rel="noopener noreferrer"
									>
										GitHub
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link
										href="https://discord.gg/dokploy"
										target="_blank"
										rel="noopener noreferrer"
									>
										Community
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}
