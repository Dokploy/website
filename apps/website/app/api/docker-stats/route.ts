import { NextResponse } from "next/server";

let cachedPulls: { count: number; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET() {
	if (cachedPulls && Date.now() - cachedPulls.timestamp < CACHE_DURATION) {
		return NextResponse.json(
			{ pull_count: cachedPulls.count },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=1800, stale-while-revalidate=3600",
				},
			},
		);
	}

	try {
		const response = await fetch(
			"https://hub.docker.com/v2/repositories/dokploy/dokploy/",
			{
				headers: {
					"User-Agent": "Dokploy-Website",
				},
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch Docker Hub data" },
				{ status: response.status },
			);
		}

		const data = await response.json();
		const pullCount = data.pull_count;

		cachedPulls = {
			count: pullCount,
			timestamp: Date.now(),
		};

		return NextResponse.json(
			{ pull_count: pullCount },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=1800, stale-while-revalidate=3600",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching Docker Hub stats:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
