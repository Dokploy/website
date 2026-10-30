import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import type { Metadata } from "next";
import { ContributorsClient } from "./ContributorsClient";

export const metadata: Metadata = {
	title: "Dokploy Contributors",
	description:
		"Meet the amazing contributors who are building and shaping the future of Dokploy.",
};

export default function ContributorsPage() {
	return (
		<div className="relative bg-black">
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				height={40}
				width={40}
				duration={3}
				repeatDelay={1}
				className="[mask-image:radial-gradient(800px_circle_at_50%_0%,white,transparent)] absolute inset-x-0 top-0 h-[120vh] skew-y-12"
			/>

			{/* Hero */}
			<section className="relative z-10 border-b border-border/30 pt-20 pb-10 sm:pt-28 sm:pb-12">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
							Meet the builders of Dokploy.
						</h1>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy wouldn&apos;t be possible without the incredible support
							from our open-source community. Thank you to everyone who has
							contributed code, documentation, and ideas.
						</p>
					</div>
				</Container>
			</section>

			{/* Contributors List & CTA */}
			<ContributorsClient />
		</div>
	);
}
