import { NextResponse } from "next/server";

type Contributor = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

let cachedContributors: {
	data: { contributors: Contributor[]; totalCount: number };
	timestamp: number;
} | null = null;
const CACHE_DURATION = 60 * 60 * 1000;

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
	if (
		cachedContributors &&
		Date.now() - cachedContributors.timestamp < CACHE_DURATION
	) {
		return NextResponse.json(cachedContributors.data, {
			headers: CACHE_HEADERS,
		});
	}

	try {
		const headers = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "Dokploy-Website",
		};

		// Fetch accurate stats (top 100) and total contributor count in parallel
		const [statsRes, countRes] = await Promise.all([
			fetchStats(headers),
			fetch(
				"https://api.github.com/repos/dokploy/dokploy/contributors?per_page=1&anon=1",
				{ headers },
			),
		]);

		// Parse total count from Link header (last page number = total contributors)
		let totalCount = 0;
		if (countRes.ok) {
			const linkHeader = countRes.headers.get("link");
			if (linkHeader) {
				const match = linkHeader.match(/page=(\d+)>; rel="last"/);
				if (match?.[1]) {
					totalCount = Number.parseInt(match[1], 10);
				}
			} else {
				const data = await countRes.json();
				totalCount = Array.isArray(data) ? data.length : 0;
			}
		}

		if (!statsRes) {
			return (
				getFallbackResponse() ??
				NextResponse.json(
					{ error: "Failed to fetch contributor stats" },
					{ status: 500 },
				)
			);
		}

		const contributors: Contributor[] = [];
		for (const item of statsRes) {
			const login = item.author?.login;
			if (
				!login ||
				login.toLowerCase().includes("bot") ||
				IGNORED_LOGINS.includes(login.toLowerCase())
			) {
				continue;
			}
			contributors.push({
				id: item.author.id,
				login,
				avatar_url: item.author.avatar_url,
				html_url: item.author.html_url,
				contributions: item.total,
			});
		}

		contributors.sort((a, b) => b.contributions - a.contributions);

		const responseData = { contributors, totalCount };

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

async function fetchStats(headers: Record<string, string>) {
	let attempts = 0;
	let res: Response | undefined;
	while (attempts < 3) {
		res = await fetch(
			"https://api.github.com/repos/dokploy/dokploy/stats/contributors",
			{ headers },
		);
		if (res.status === 202) {
			attempts++;
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} else {
			break;
		}
	}
	if (res?.ok) {
		const data = await res.json();
		if (Array.isArray(data)) return data;
	}
	return null;
}
