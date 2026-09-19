import { NextResponse } from "next/server";

type GitHubStatsContributor = {
	author: {
		id: number;
		login: string;
		avatar_url: string;
		html_url: string;
		type: string;
	};
	total: number;
};

type Contributor = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

let cachedContributors: {
	data: Contributor[];
	timestamp: number;
} | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Known non-bot accounts that should still be excluded
const IGNORED_LOGINS = ["claude"];

const CACHE_HEADERS = {
	"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
};

function getFallbackResponse() {
	if (cachedContributors) {
		cachedContributors.timestamp = Date.now();
		return NextResponse.json(cachedContributors.data, {
			headers: CACHE_HEADERS,
		});
	}
	return null;
}

export async function GET() {
	// Serve from in-memory cache if still fresh
	if (
		cachedContributors &&
		Date.now() - cachedContributors.timestamp < CACHE_DURATION
	) {
		return NextResponse.json(cachedContributors.data, {
			headers: CACHE_HEADERS,
		});
	}

	try {
		// GitHub's stats/contributors endpoint returns 202 while computing stats.
		// Retry up to 3 times with a 2s delay between attempts.
		let response: Response | undefined;
		let attempts = 0;

		while (attempts < 3) {
			response = await fetch(
				"https://api.github.com/repos/dokploy/dokploy/stats/contributors",
				{
					headers: {
						Accept: "application/vnd.github.v3+json",
						"User-Agent": "Dokploy-Website",
					},
				},
			);

			if (response.status === 202) {
				attempts++;
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} else {
				break;
			}
		}

		if (!response || !response.ok) {
			return (
				getFallbackResponse() ??
				NextResponse.json(
					{ error: "Failed to fetch contributors data" },
					{ status: response?.status ?? 500 },
				)
			);
		}

		const data: GitHubStatsContributor[] = await response.json();

		if (!Array.isArray(data)) {
			return (
				getFallbackResponse() ??
				NextResponse.json(
					{ error: "Invalid data format received from GitHub" },
					{ status: 500 },
				)
			);
		}

		const contributors: Contributor[] = data
			.filter((item) => item.author)
			.filter(
				(item) =>
					item.author.type === "User" &&
					!item.author.login.toLowerCase().includes("bot") &&
					!IGNORED_LOGINS.includes(item.author.login.toLowerCase()),
			)
			.map((item) => ({
				id: item.author.id,
				login: item.author.login,
				avatar_url: item.author.avatar_url,
				html_url: item.author.html_url,
				contributions: item.total,
			}))
			.sort((a, b) => b.contributions - a.contributions);

		// Update in-memory cache
		cachedContributors = {
			data: contributors,
			timestamp: Date.now(),
		};

		return NextResponse.json(contributors, {
			headers: CACHE_HEADERS,
		});
	} catch (error) {
		console.error("Error fetching GitHub contributors:", error);
		return (
			getFallbackResponse() ??
			NextResponse.json({ error: "Internal server error" }, { status: 500 })
		);
	}
}
