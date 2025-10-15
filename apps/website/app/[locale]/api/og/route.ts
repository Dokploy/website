import { getPost } from "@/lib/ghost";
import { generateOGImage } from "@/lib/og-image";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ locale: string }> },
) {
	try {
		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug");
		const { locale } = await params;

		console.log("Generating OG image for slug:", slug, "locale:", locale);

		if (!slug) {
			console.error("Missing slug parameter");
			return new Response("Missing slug parameter", { status: 400 });
		}

		const post = await getPost(slug);

		if (!post) {
			console.error("Post not found for slug:", slug);
			return new Response("Post not found", { status: 404 });
		}

		console.log("Found post:", post.title);

		const formattedDate = new Date(post.published_at).toLocaleDateString(
			locale,
			{
				year: "numeric",
				month: "long",
				day: "numeric",
			},
		);

		const ogImage = await generateOGImage({
			title: post.title,
			author: post.primary_author
				? {
						name: post.primary_author.name,
						image: post.primary_author.profile_image || undefined,
					}
				: undefined,
			date: formattedDate,
			readingTime: post.reading_time,
		});

		console.log("Successfully generated OG image");

		return new Response(ogImage, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Error generating OG image:", error);
		return new Response(`Error generating image: ${error}`, { status: 500 });
	}
}
