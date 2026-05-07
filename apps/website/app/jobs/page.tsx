import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dokploy Jobs & Open Positions",
	description:
		"Join Dokploy and help developers and teams ship faster with open-source and scalable deployment tools built for the modern web.",
};

const OPEN_POSITIONS = [
	{
		title: "Founding Engineer",
		region: "Central America, South America",
		description: "Become the first official hire at Dokploy.",
		href: "https://app.talenttracker.io/288/founding-engineer",
	},
];

export default function JobsPage() {
	return (
		<div className="relative bg-black">
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				height={40}
				width={40}
				duration={3}
				repeatDelay={1}
				className="[mask-image:radial-gradient(800px_circle_at_50%_0%,white,transparent)] absolute inset-x-0 top-0 h-[120%] skew-y-12"
			/>

			{/* Hero */}
			<section className="relative z-10 border-b border-border/30 py-20 sm:py-28">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
							Join our company and help redefine how the world deploys software.
						</h1>
						<p className="mt-4 text-lg text-muted-foreground">
							We&apos;re a small, focused team building tools that developers
							actually love. If you care about open source, developer experience,
							and shipping things that matter — you&apos;ll fit right in.
						</p>
						<Button asChild size="lg" className="mt-8">
							<Link href="#open-positions">See open positions</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Open Positions */}
			<section
				id="open-positions"
				className="relative z-10 border-b border-border/30 py-16 sm:py-20"
			>
				<Container>
					<h2 className="mb-8 text-xl font-semibold text-white sm:text-2xl">
						Open positions
					</h2>

					{OPEN_POSITIONS.length > 0 ? (
						<div className="flex flex-col gap-4">
							{OPEN_POSITIONS.map((position) => (
								<div
									key={position.title}
									className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-black/80 p-6 sm:flex-row sm:items-center sm:justify-between"
								>
									<div className="flex flex-col gap-1">
										<div className="flex flex-wrap items-center gap-3">
											<h3 className="text-base font-semibold text-white">
												{position.title}
											</h3>
											<Badge
												variant="secondary"
												className="flex items-center gap-1 text-xs"
											>
												<MapPin className="h-3 w-3" />
												{position.region}
											</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											{position.description}
										</p>
									</div>
									<Button asChild variant="outline" className="shrink-0">
										<Link href={position.href}>
											Learn more
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</div>
							))}
						</div>
					) : (
						<div className="rounded-2xl border border-border/50 bg-black/80 p-12 text-center">
							<p className="text-muted-foreground">
								No open positions at the moment. Check back soon.
							</p>
						</div>
					)}
				</Container>
			</section>

		</div>
	);
}
