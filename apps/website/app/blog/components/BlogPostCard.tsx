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
			className="group block hover:bg-muted p-4 rounded-lg border border-border"
		>
			<article className="flex gap-6 items-start max-sm:flex-col items-center">
				<div className="relative  shrink-0 flex items-center justify-center mx-auto">
					<img
						src={post.feature_image || "/og.png"}
						alt={post.feature_image ? post.title : "Default Image"}
						className="object-cover rounded-lg object-center mx-auto self-center h-32 w-64 sm:w-32 sm:h-24"
					/>
				</div>
				<div className="w-full flex-wrap flex">
					<h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
						{post.title}
					</h2>
					<p className="text-muted-foreground line-clamp-2 mb-4">
						{post.custom_excerpt || post.excerpt}
					</p>
					<div className="flex items-center text-sm text-muted-foreground flex-wrap">
						<div className="flex items-center">
							{post.primary_author?.profile_image && (
								<div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
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
									className="hover:text-primary transition-colors"
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
