import type { Post } from "@/lib/ghost";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
	post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
	const formattedDate = new Date(post.published_at).toLocaleDateString("en", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
			<div className="relative h-48 w-full">
				{post.feature_image ? (
					<Image
						src={post.feature_image}
						alt={post.title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gray-200">
						<span className="text-gray-400">No image</span>
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col justify-between bg-white p-6">
				<div className="flex-1">
					{post.primary_tag && (
						<p className="text-sm font-medium text-indigo-600">
							{post.primary_tag.name}
						</p>
					)}
					<Link href={`/blog/${post.slug}`} className="mt-2 block">
						<h3 className="text-xl font-semibold text-gray-900">
							{post.title}
						</h3>
						<p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
					</Link>
				</div>
				<div className="mt-6 flex items-center">
					{post.primary_author?.profile_image && (
						<div className="relative h-10 w-10 flex-shrink-0">
							<Image
								className="rounded-full"
								src={post.primary_author.profile_image}
								alt={post.primary_author.name}
								fill
							/>
						</div>
					)}
					<div className="ml-3">
						<p className="text-sm font-medium text-gray-900">
							{post.primary_author?.name || "Anonymous"}
						</p>
						<div className="flex space-x-1 text-sm text-gray-500">
							<time dateTime={post.published_at}>{formattedDate}</time>
							<span aria-hidden="true">&middot;</span>
							<span>{post.reading_time} min read</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
