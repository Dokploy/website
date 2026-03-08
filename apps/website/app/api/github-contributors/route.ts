import { NextResponse } from "next/server";

let cachedContributors: { count: number; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET() {
	if (
		cachedContributors &&
		Date.now() - cachedContributors.timestamp < CACHE_DURATION
	) {
		return NextResponse.json(
			{ contributors_count: cachedContributors.count },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=1800, stale-while-revalidate=3600",
				},
			},
		);
	}

	try {
		// Request 1 per page to get total count from Link header
		const response = await fetch(
			"https://api.github.com/repos/dokploy/dokploy/contributors?per_page=1&anon=false",
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					"User-Agent": "Dokploy-Website",
				},
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch contributors data" },
				{ status: response.status },
			);
		}

		let count = 200; // fallback
		const linkHeader = response.headers.get("Link");

		if (linkHeader) {
			// Parse last page number from Link header: <...?page=N>; rel="last"
			const lastMatch = linkHeader.match(
				/[&?]page=(\d+)[^>]*>;\s*rel="last"/,
			);
			if (lastMatch) {
				count = Number.parseInt(lastMatch[1], 10);
			}
		}

		cachedContributors = {
			count,
			timestamp: Date.now(),
		};

		return NextResponse.json(
			{ contributors_count: count },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=1800, stale-while-revalidate=3600",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching GitHub contributors:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
