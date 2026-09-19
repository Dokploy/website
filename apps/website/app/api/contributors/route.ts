import { NextResponse } from "next/server";

type GitHubContributor = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	type: string;
	contributions: number;
};

type Contributor = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

let cachedContributors: {
	data: { contributors: Contributor[]; anonymousCount: number };
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
		// 1. Fetch exact stats for top 100 (this exactly matches GitHub Web UI commit counts)
		const statsMap = new Map<string, number>();
		try {
			let attempts = 0;
			let statsRes: Response | undefined;
			while (attempts < 3) {
				statsRes = await fetch(
					"https://api.github.com/repos/dokploy/dokploy/stats/contributors",
					{
						headers: {
							Accept: "application/vnd.github.v3+json",
							"User-Agent": "Dokploy-Website",
						},
					},
				);
				if (statsRes.status === 202) {
					attempts++;
					await new Promise((resolve) => setTimeout(resolve, 2000));
				} else {
					break;
				}
			}
			if (statsRes?.ok) {
				const statsData = await statsRes.json();
				if (Array.isArray(statsData)) {
					for (const item of statsData) {
						if (item.author?.login) {
							statsMap.set(item.author.login, item.total);
						}
					}
				}
			}
		} catch (e) {
			console.error("Failed to fetch stats/contributors", e);
		}

		// 2. Fetch all contributors via dynamic strict pagination (parsing GitHub's Link header)
		let allContributors: GitHubContributor[] = [];
		let page = 1;
		let lastPage = 1; // Will be updated dynamically on the first request

		while (page <= lastPage) {
			const response = await fetch(
				`https://api.github.com/repos/dokploy/dokploy/contributors?anon=1&per_page=100&page=${page}`,
				{
					headers: {
						Accept: "application/vnd.github.v3+json",
						"User-Agent": "Dokploy-Website",
					},
				},
			);

			if (!response.ok) {
				if (page === 1) {
					return (
						getFallbackResponse() ??
						NextResponse.json(
							{ error: "Failed to fetch contributors data" },
							{ status: response.status ?? 500 },
						)
					);
				}
				break;
			}

			// On the first page, parse the 'Link' header to strictly determine the exact number of total pages
			if (page === 1) {
				const linkHeader = response.headers.get("link");
				if (linkHeader) {
					const match = linkHeader.match(/page=(\d+)>; rel="last"/);
					if (match?.[1]) {
						lastPage = Number.parseInt(match[1], 10);
					}
				}
			}

			const data: GitHubContributor[] = await response.json();

			if (!Array.isArray(data) || data.length === 0) {
				break;
			}

			allContributors = allContributors.concat(data);

			// Extra safety: If we somehow get less than 100 results, we've reached the end anyway
			if (data.length < 100) {
				break;
			}

			page++;
		}

		if (allContributors.length === 0) {
			return (
				getFallbackResponse() ??
				NextResponse.json({ error: "No contributors found" }, { status: 500 })
			);
		}

		const realContributors: Contributor[] = [];
		let anonymousCount = 0;

		for (const item of allContributors) {
			if (item.type === "Anonymous") {
				anonymousCount++;
			} else if (
				item.type === "User" &&
				!item.login?.toLowerCase().includes("bot") &&
				!IGNORED_LOGINS.includes(item.login?.toLowerCase())
			) {
				realContributors.push({
					id: item.id,
					login: item.login,
					avatar_url: item.avatar_url,
					html_url: item.html_url,
					// Override with accurate stats total if available, otherwise fallback to the pagination total
					contributions: statsMap.get(item.login) ?? item.contributions,
				});
			}
		}

		realContributors.sort((a, b) => b.contributions - a.contributions);

		const responseData = { contributors: realContributors, anonymousCount };

		// Update in-memory cache
		cachedContributors = {
			data: responseData,
			timestamp: Date.now(),
		};

		return NextResponse.json(responseData, {
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
