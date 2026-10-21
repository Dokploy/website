import GhostContentAPI from "@tryghost/content-api";

// Ghost API configuration
const ghostConfig = {
	url: process.env.GHOST_URL || "https://site.com",
	key: process.env.GHOST_KEY || "42424242424242424242424242424242",
	version: "v5.0",
};

// Initialize the Ghost API with your credentials
const api = GhostContentAPI({
	url: ghostConfig.url,
	key: ghostConfig.key,
	version: ghostConfig.version,
	// @ts-ignore
	makeRequest: ({ url, method, params, headers }) => {
		const apiUrl = new URL(url);
		// Slug is already in the path; Ghost returns 422 if we also send it as query param
		const { slug: _slug, ...queryParams } = params;
		for (const key of Object.keys(queryParams)) {
			apiUrl.searchParams.set(key, encodeURIComponent(queryParams[key]));
		}

		return fetch(apiUrl.toString(), { method, headers })
			.then(async (res) => {
				// Check if the response was successful.
				if (!res.ok) {
					// You can handle HTTP errors here
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return { data: await res.json() };
			})
			.catch((error) => {
				console.error("Fetch error:", error);
				throw error;
			});
	},
});

export interface Post {
	id: string;
	uuid: string;
	title: string;
	slug: string;
	html: string;
	feature_image: string | null;
	featured: boolean;
	visibility: string;
	created_at: string;
	updated_at: string;
	published_at: string;
	custom_excerpt: string | null;
	excerpt: string;
	reading_time: number;
	primary_tag?: {
		id: string;
		name: string;
		slug: string;
	};
	tags?: Array<{
		id: string;
		name: string;
		slug: string;
	}>;
	primary_author?: {
		id: string;
		name: string;
		slug: string;
		profile_image: string | null;
		bio: string | null;
		twitter: string | null;
	};
	authors?: Array<{
		id: string;
		name: string;
		slug: string;
		profile_image: string | null;
		bio: string | null;
	}>;
	url: string;
	canonical_url: string | null;
}

export const SITE_URL = "https://dokploy.com";

// Canonical for a post: Ghost's canonical_url if set, otherwise the post's
// own /blog/[slug] URL. Always absolute, without query string or hash.
export function getPostCanonicalUrl(
	post: Pick<Post, "slug" | "canonical_url">,
) {
	const fallback = `${SITE_URL}/blog/${post.slug}`;
	if (!post.canonical_url) return fallback;
	try {
		const url = new URL(post.canonical_url, SITE_URL);
		// Never canonicalize to the Ghost CMS duplicate
		if (url.hostname === "cms.dokploy.com") return fallback;
		if (url.hostname === "www.dokploy.com") url.hostname = "dokploy.com";
		return `${url.origin}${url.pathname}`;
	} catch {
		return fallback;
	}
}

export async function getPosts(options = {}): Promise<Post[]> {
	try {
		const result = (await api.posts.browse({
			include: "authors",
			limit: "all",
		})) as Post[];
		return result;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getPost(slug: string): Promise<Post | null> {
	try {
		const result = (await api.posts.read({
			slug,
			include: "authors",
		})) as Post;

		return result;
	} catch (error) {
		console.error("Error fetching post:", error);
		return null;
	}
}

export async function getTags(): Promise<{ slug: string; name: string }[]> {
	try {
		const result = await api.tags.browse();
		return result as { slug: string; name: string }[];
	} catch (error) {
		console.error("Error fetching tags:", error);
		return [];
	}
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
	try {
		const result = await api.posts.browse({
			limit: "all",
			filter: `tag:${tag}`,
			include: ["tags", "authors"],
		});
		return result as Post[];
	} catch (error) {
		console.error(`Error fetching posts with tag ${tag}:`, error);
		return [];
	}
}
