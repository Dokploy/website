import { getPostsByTag, getTags } from "@/lib/ghost";
import type { Post } from "@/lib/ghost";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
	params: { locale: string; tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	const t = await getTranslations("blog");

	return {
		title: `${t("tagTitle", { tag })}`,
		description: t("tagDescription", { tag }),
	};
}

export async function generateStaticParams() {
	const tags = await getTags();

	return tags.map((tag) => ({
		tag: tag.slug,
	}));
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const t = await getTranslations("blog");
	const posts = await getPostsByTag(tag);

	if (!posts || posts.length === 0) {
		notFound();
	}

	// Get the tag name from the first post
	const tagName =
		posts[0].tags?.find((t: { slug: string }) => t.slug === tag)?.name || tag;

	return (
		<div className="container mx-auto px-4 py-12">
			<Link
				href="/blog"
				className="inline-flex items-center mb-8 text-primary-600 hover:text-primary-800 transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 mr-2"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>
				{t("backToBlog")}
			</Link>

			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">
					{t("postsTaggedWith")}{" "}
					<span className="text-primary-600">"{tagName}"</span>
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					{t("foundPosts", { count: posts.length })}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post: Post) => (
					<BlogPostCard key={post.id} post={post} locale={tag} />
				))}
			</div>
		</div>
	);
}

function BlogPostCard({ post, locale }: { post: Post; locale: string }) {
	const formattedDate = new Date(post.published_at).toLocaleDateString(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<Link href={`/blog/${post.slug}`} className="group">
			<div className="dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
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
					<h2 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
						{post.title}
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						{formattedDate} • {post.reading_time} min read
					</p>
					<p className="text-gray-700 dark:text-gray-300 mb-4">
						{post.custom_excerpt || post.excerpt}
					</p>
					<div className="flex items-center">
						{post.primary_author?.profile_image && (
							<div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
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
								{post.primary_author?.name || "Unknown Author"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
