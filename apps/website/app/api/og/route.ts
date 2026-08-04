import { getPost } from "@/lib/ghost";
import { generateOGImage } from "@/lib/og-image";
import { getTemplate } from "@/lib/templates";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug");
		const templateId = searchParams.get("template");

		if (templateId) {
			const template = await getTemplate(templateId);

			if (!template) {
				console.error("Template not found:", templateId);
				return new Response("Template not found", { status: 404 });
			}

			const ogImage = await generateOGImage({
				title: `Deploy ${template.name} on Dokploy`,
				label: "Dokploy - Open Source Templates",
			});

			return new Response(ogImage, {
				headers: {
					"Content-Type": "image/png",
					"Cache-Control": "public, max-age=86400, stale-while-revalidate",
				},
			});
		}

		console.log("Generating OG image for slug:", slug);

		if (!slug) {
			console.error("Missing slug parameter");
			return new Response("Missing slug parameter", { status: 400 });
		}

		const post = await getPost(slug);

		if (!post) {
			console.error("Post not found for slug:", slug);
			return new Response("Post not found", { status: 404 });
		}

		const formattedDate = new Date(post.published_at).toLocaleDateString(
			"en-US",
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
