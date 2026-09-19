export async function getContributors() {
	try {
		// Use stats/contributors to get commits only on the default branch (matching GitHub UI)
		// GitHub often returns 202 Accepted while it computes stats, so we retry a few times
		let response: Response | undefined;
		let attempts = 0;
		while (attempts < 3) {
			response = await fetch(
				"https://api.github.com/repos/dokploy/dokploy/stats/contributors",
				{
					next: { revalidate: 21600 }, // 6 hours
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
			console.error("Failed to fetch contributors:", response?.statusText);
			return [];
		}

		const data = await response.json();

		if (!Array.isArray(data)) {
			return [];
		}

		// Explicitly ignore known bots that GitHub doesn't classify as 'Bot'
		const ignoredLogins = ["claude"];

		// Map to our expected format, filter bots, and sort by contributions descending
		return data
			.filter((item: any) => item.author) // skip anonymous/deleted accounts
			.filter(
				(item: any) =>
					item.author.type === "User" &&
					!item.author.login.toLowerCase().includes("bot") &&
					!ignoredLogins.includes(item.author.login.toLowerCase()),
			)
			.map((item: any) => ({
				id: item.author.id,
				login: item.author.login,
				avatar_url: item.author.avatar_url,
				html_url: item.author.html_url,
				type: item.author.type,
				contributions: item.total,
			}))
			.sort((a, b) => b.contributions - a.contributions);
	} catch (error) {
		console.error("Error fetching GitHub contributors:", error);
		return [];
	}
}
