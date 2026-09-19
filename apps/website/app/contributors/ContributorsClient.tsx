"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Github, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Contributor = {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

export function ContributorsClient() {
	const [contributors, setContributors] = useState<Contributor[]>([]);
	const [anonymousCount, setAnonymousCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [limit, setLimit] = useState(40);
	const [increment, setIncrement] = useState(40);

	useEffect(() => {
		// Set correct limits for mobile immediately after hydration
		if (window.innerWidth < 768) {
			setLimit(20);
			setIncrement(20);
		}

		const fetchContributors = async () => {
			try {
				setHasError(false);
				const response = await fetch("/api/contributors");
				if (response.ok) {
					const data = await response.json();
					// Handle edge case where HMR serves the old array cache format
					if (Array.isArray(data)) {
						setContributors(data);
						setAnonymousCount(0);
					} else {
						setContributors(data.contributors || []);
						setAnonymousCount(data.anonymousCount || 0);
					}
				} else {
					setHasError(true);
				}
			} catch (error) {
				console.error("Error fetching contributors:", error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchContributors();
	}, []);

	const handleShowMore = () => {
		setLimit((prev) => prev + increment);
	};

	const safeContributors = Array.isArray(contributors) ? contributors : [];
	const displayedContributors = safeContributors.slice(0, limit);
	const hasMore = limit < safeContributors.length;

	if (isLoading) {
		return (
			<div className="relative z-10 border-b border-border/30 pt-10 pb-16 sm:pt-12 sm:pb-20">
				<Container>
					<div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
						{Array.from({ length: 40 }).map((_, i) => (
							<div
								key={`skeleton-${i}`}
								className={`flex-col items-center gap-3 rounded-2xl border border-border/50 bg-[#0d0d0d] p-6 ${
									i >= 20 ? "hidden md:flex" : "flex"
								}`}
							>
								<div className="h-20 w-20 rounded-full bg-white/10 animate-pulse" />
								<div className="flex flex-col items-center gap-2 animate-pulse">
									<div className="h-4 w-20 rounded bg-white/10" />
									<div className="h-3 w-16 rounded bg-white/10" />
								</div>
							</div>
						))}
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="relative z-10 border-b border-border/30 pt-10 pb-16 sm:pt-12 sm:pb-20">
			<Container>
				{safeContributors.length > 0 ? (
					<div className="flex flex-col items-center">
						<div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
							{displayedContributors.map((contributor) => (
								<Link
									key={contributor.id}
									href={contributor.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-[#0d0d0d] p-6 transition-colors hover:bg-[#1a1a1a]"
								>
									<div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-border/50 transition-all group-hover:ring-primary">
										<Image
											src={contributor.avatar_url}
											alt={`${contributor.login}'s avatar`}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 80px, 80px"
										/>
									</div>
									<div className="flex flex-col items-center text-center">
										<h3 className="text-sm font-medium text-white sm:text-base">
											{contributor.login}
										</h3>
										<p className="text-xs text-muted-foreground">
											{contributor.contributions} contributions
										</p>
									</div>
								</Link>
							))}

							{!hasMore && anonymousCount > 0 && (
								<div className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-[#0d0d0d] p-6 transition-colors hover:bg-[#1a1a1a]">
									<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-border/50 bg-white/5 transition-all group-hover:border-primary/50">
										<Users className="h-8 w-8 text-muted-foreground" />
									</div>
									<div className="flex flex-col items-center text-center">
										<h3 className="text-sm font-medium text-white sm:text-base">
											Anonymous
										</h3>
										<p className="text-xs text-muted-foreground">
											+ {anonymousCount} unlinked contributions
										</p>
									</div>
								</div>
							)}
						</div>

						{hasMore && (
							<Button
								onClick={handleShowMore}
								variant="outline"
								size="lg"
								className="mt-12"
							>
								Show More Contributors
							</Button>
						)}
					</div>
				) : hasError ? (
					<div className="rounded-2xl border border-border/50 bg-[#0d0d0d] p-12 text-center">
						<p className="text-muted-foreground">
							Failed to load contributors. Please try again.
						</p>
						<Button
							variant="outline"
							size="lg"
							className="mt-6"
							onClick={() => {
								setIsLoading(true);
								fetch("/api/contributors")
									.then((res) => (res.ok ? res.json() : Promise.reject()))
									.then((data) => {
										if (Array.isArray(data)) {
											setContributors(data);
											setAnonymousCount(0);
										} else {
											setContributors(data.contributors || []);
											setAnonymousCount(data.anonymousCount || 0);
										}
										setHasError(false);
									})
									.catch(() => setHasError(true))
									.finally(() => setIsLoading(false));
							}}
						>
							Retry
						</Button>
					</div>
				) : (
					<div className="rounded-2xl border border-border/50 bg-[#0d0d0d] p-12 text-center">
						<p className="text-muted-foreground">
							No contributors found at the moment.
						</p>
					</div>
				)}
			</Container>

			{/* CTA Section */}
			<section className="relative z-10 mt-16 py-12 text-center">
				<Container>
					<h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Eager to contribute? Start it Now..
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
						Join our growing community and help us build the future of
						application deployment. Check out our repository and find an issue
						to tackle!
					</p>
					<Button asChild size="lg" className="mt-8">
						<Link
							href="https://github.com/dokploy/dokploy"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="mr-2 h-5 w-5" />
							Contribute on GitHub
						</Link>
					</Button>
				</Container>
			</section>
		</div>
	);
}
