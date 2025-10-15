import { getPosts, getTags } from "@/lib/ghost";
import type { Post } from "@/lib/ghost";
import { RssIcon } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BlogPostCard } from "./components/BlogPostCard";
import { SearchAndFilter } from "./components/SearchAndFilter";
interface Tag {
	id: string;
	name: string;
	slug: string;
}

export const metadata: Metadata = {
	title: "Blog | Dokploy",
	description: "Latest news, updates, and articles from Dokploy",
};

export default async function BlogPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { locale } = await params;
	const searchParams2 = await searchParams;
	const t = await getTranslations("blog");
	const posts = await getPosts();
	const tags = (await getTags()) as Tag[];
	const search =
		typeof searchParams2.search === "string" ? searchParams2.search : "";
	const selectedTag =
		typeof searchParams2.tag === "string" ? searchParams2.tag : "";

	const filteredPosts = posts.filter((post) => {
		const matchesSearch =
			search === "" ||
			post.title.toLowerCase().includes(search.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(search.toLowerCase());

		const matchesTag =
			selectedTag === "" || post.tags?.some((tag) => tag.slug === selectedTag);

		return matchesSearch && matchesTag;
	});

	return (
		<div className="container mx-auto px-4 py-12 max-w-5xl">
			<div className="flex items-center justify-between mb-8">
				<div>
					<p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
						BLOG
					</p>
					<h1 className="text-4xl font-bold">Dokploy Latest News & Updates</h1>
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
				searchPlaceholder={t("searchPlaceholder")}
				allTagsText={t("allTags")}
			/>

			{filteredPosts.length === 0 ? (
				<div className="text-center py-12 min-h-[20vh] flex items-center justify-center">
					<p className="text-xl text-muted-foreground">
						{search || selectedTag ? t("noResults") : t("noPosts")}
					</p>
				</div>
			) : (
				<div className="space-y-8">
					{filteredPosts.map((post: Post) => (
						<BlogPostCard key={post.id} post={post} locale={locale} />
					))}
				</div>
			)}
		</div>
	);
}
