"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
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

export function ContributorsClient({
	contributors,
}: { contributors: Contributor[] }) {
	const [limit, setLimit] = useState(40);
	const [increment, setIncrement] = useState(40);
	const [mounted, setMounted] = useState(false);

	// Adjust initial limit and increment for mobile
	useEffect(() => {
		setMounted(true);
		if (window.innerWidth < 768) {
			setLimit(20);
			setIncrement(20);
		}
	}, []);

	const handleShowMore = () => {
		setLimit((prev) => prev + increment);
	};

	// To prevent hydration layout flash, we use the server's default 40 until mounted
	const currentLimit = mounted ? limit : 40;
	const displayedContributors = contributors.slice(0, currentLimit);
	const hasMore = currentLimit < contributors.length;

	return (
		<div className="relative z-10 border-b border-border/30 pt-10 pb-16 sm:pt-12 sm:pb-20">
			<Container>
				{contributors.length > 0 ? (
					<div className="flex flex-col items-center">
						<div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
							{displayedContributors.map((contributor) => (
								<Link
									key={contributor.id}
									href={contributor.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-white/5 backdrop-blur-md p-6 transition-colors hover:bg-white/10"
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
				) : (
					<div className="rounded-2xl border border-border/50 bg-white/5 backdrop-blur-md p-12 text-center">
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
