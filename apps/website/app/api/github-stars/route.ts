import { NextResponse } from "next/server";

// Cache the result for 5 minutes to avoid rate limiting
let cachedStars: { count: number; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const owner = searchParams.get("owner");
	const repo = searchParams.get("repo");

	if (!owner || !repo) {
		return NextResponse.json(
			{ error: "Owner and repo parameters are required" },
			{ status: 400 },
		);
	}

	// Check if we have a valid cached result
	if (
		cachedStars &&
		Date.now() - cachedStars.timestamp < CACHE_DURATION
	) {
		return NextResponse.json(
			{ stargazers_count: cachedStars.count },
			{
				headers: {
					"Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
				},
			},
		);
	}

	try {
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}`,
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					"User-Agent": "Dokploy-Website",
				},
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch repository data" },
				{ status: response.status },
			);
		}

		const data = await response.json();
		const starCount = data.stargazers_count;

		// Cache the result
		cachedStars = {
			count: starCount,
			timestamp: Date.now(),
		};

		return NextResponse.json(
			{ stargazers_count: starCount },
			{
				headers: {
					"Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching GitHub stars:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

