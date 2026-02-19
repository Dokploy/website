"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import NumberTicker from "@/components/ui/number-ticker";
import { Grid } from "@/components/stats";

const statsValues = {
	githubStars: 26000,
	dockerDownloads: 6500000,
	contributors: 200,
	sponsors: 50,
};

export function ComparisonStats() {
	const [githubStars, setGithubStars] = useState(statsValues.githubStars);

	useEffect(() => {
		const fetchGitHubStars = async () => {
			try {
				const response = await fetch(
					"/api/github-stars?owner=dokploy&repo=dokploy",
				);

				if (response.ok) {
					const data = await response.json();
					setGithubStars(data.stargazers_count);
				}
			} catch (error) {
				console.error("Error fetching GitHub stars:", error);
			}
		};

		fetchGitHubStars();
	}, []);

	return (
		<section className="border-b border-border/30 py-20 sm:py-32">
			<Container>
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
						Thousands have chosen Dokploy
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Just a few numbers to show we're not completely making this up.
						Turns out, Dokploy has actually helped a few people – who knew?
					</p>
				</div>

				<div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 text-center">
						<Grid size={20} />
						<p className="relative z-20 text-sm font-medium text-muted-foreground">
							GitHub Stars
						</p>
						<p className="relative z-20 mt-2 text-3xl font-bold">
							<NumberTicker value={githubStars} />+
						</p>
						<p className="relative z-20 mt-2 text-sm text-muted-foreground">
							Trusted by developers worldwide
						</p>
					</div>
					<div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 text-center">
						<Grid size={20} />
						<p className="relative z-20 text-sm font-medium text-muted-foreground">
							DockerHub Downloads
						</p>
						<p className="relative z-20 mt-2 text-3xl font-bold">
							<NumberTicker value={statsValues.dockerDownloads} />+
						</p>
						<p className="relative z-20 mt-2 text-sm text-muted-foreground">
							Go-to solution for deployments
						</p>
					</div>
					<div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 text-center">
						<Grid size={20} />
						<p className="relative z-20 text-sm font-medium text-muted-foreground">
							Community Contributors
						</p>
						<p className="relative z-20 mt-2 text-3xl font-bold">
							<NumberTicker value={statsValues.contributors} />+
						</p>
						<p className="relative z-20 mt-2 text-sm text-muted-foreground">
							Thriving open source community
						</p>
					</div>
					<div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 text-center">
						<Grid size={20} />
						<p className="relative z-20 text-sm font-medium text-muted-foreground">
							Sponsors
						</p>
						<p className="relative z-20 mt-2 text-3xl font-bold">
							<NumberTicker value={statsValues.sponsors} />+
						</p>
						<p className="relative z-20 mt-2 text-sm text-muted-foreground">
							Supporting the project
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
