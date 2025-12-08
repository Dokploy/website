"use client";

import type { Post } from "@/lib/ghost";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogPostCardProps {
	post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
	const router = useRouter();
	const formattedDate = new Date(post.published_at).toLocaleDateString("en", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const handleTwitterClick = (e: React.MouseEvent) => {
		if (post.primary_author?.twitter) {
			router.push(`https://twitter.com/${post.primary_author.twitter}`);
		}
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<Link
			href={`/blog/${post.slug}`}
			className="group block rounded-lg border border-border p-4 hover:bg-muted"
		>
			<article className="flex items-start items-center gap-6 max-sm:flex-col">
				<div className="relative  mx-auto flex shrink-0 items-center justify-center">
					<img
						src={post.feature_image || "/og.png"}
						alt={post.feature_image ? post.title : "Default Image"}
						className="mx-auto h-32 w-64 self-center rounded-lg object-cover object-center sm:h-24 sm:w-32"
					/>
				</div>
				<div className="flex w-full flex-wrap">
					<h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
						{post.title}
					</h2>
					<p className="mb-4 line-clamp-2 text-muted-foreground">
						{post.custom_excerpt || post.excerpt}
					</p>
					<div className="flex flex-wrap items-center text-sm text-muted-foreground">
						<div className="flex items-center">
							{post.primary_author?.profile_image && (
								<div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
									{post.primary_author.twitter ? (
										<button
											className="block cursor-pointer transition-opacity hover:opacity-90"
											onClick={handleTwitterClick}
											type="button"
										>
											<img
												src={post.primary_author.profile_image}
												alt={post.primary_author.name}
												className="object-cover"
											/>
										</button>
									) : (
										<img
											src={post.primary_author.profile_image}
											alt={post.primary_author.name}
											className="object-cover"
										/>
									)}
								</div>
							)}
							{post.primary_author?.twitter ? (
								<button
									className="transition-colors hover:text-primary"
									onClick={handleTwitterClick}
									type="button"
								>
									{post.primary_author.name || "Unknown Author"}
								</button>
							) : (
								<span>{post.primary_author?.name || "Unknown Author"}</span>
							)}
						</div>
						<span className="mx-2">in</span>
						<span>{post.primary_tag?.name || "General"}</span>
						<span className="mx-2">•</span>
						<span>{post.reading_time} min read</span>
						<span className="mx-2">•</span>
						<span>{formattedDate}</span>
					</div>
				</div>
			</article>
		</Link>
	);
}
