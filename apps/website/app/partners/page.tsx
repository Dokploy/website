import { Container } from "@/components/Container";
import { PartnerForm } from "@/components/PartnerForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Partners",
	description:
		"Join the Dokploy partner program. Agency plan, referral program, and reseller options.",
};

const PROGRAMS = [
	{
		title: "Agency Plan",
		badge: "Available",
		badgeVariant: "default" as const,
		description:
			"Premium licensing tier designed for agencies managing multiple clients.",
		features: [
			"White-label capabilities",
			"Unlimited servers",
			"Unlimited projects",
			"Unlimited organizations",
		],
		cta: "Get started",
		href: "#get-started",
	},
	{
		title: "Referral Program",
		badge: "Available",
		badgeVariant: "default" as const,
		description:
			"Earn 20% commission on every customer you refer to Dokploy.",
		features: [
			"Co-marketing opportunities",
			"Partner dashboard",
			"Unique referral links",
			"20% of first-year revenue",
		],
		cta: "Get started",
		href: "#get-started",
	},
	{
		title: "Reseller Program",
		badge: "Coming Soon",
		badgeVariant: "secondary" as const,
		description:
			"Sell Dokploy directly in your market with local presence and relationships.",
		features: [
			"Strategic market access",
			"Cultural advantage",
			"Leverage local expertise",
			"Market expansion opportunity",
		],
		cta: "Express interest",
		href: "#get-started",
	},
];

export default function PartnersPage() {
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
							Partner with Dokploy
						</h1>
						<p className="mt-4 text-lg text-muted-foreground">
							Join our partner program to unlock premium features, earn revenue
							through referrals, and scale your agency operations.
						</p>
						<Button asChild size="lg" className="mt-8">
							<Link href="#get-started">Become a Partner</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Program cards */}
			<section className="relative z-10 border-b border-border/30 py-16 sm:py-20">
				<Container>
					<div className="grid gap-8 md:grid-cols-3">
						{PROGRAMS.map((program) => (
							<div
								key={program.title}
								className="flex flex-col rounded-2xl border border-border/50 bg-black/80 p-6"
							>
								<Badge
									variant={program.badgeVariant}
									className="mb-4 w-fit"
								>
									{program.badge}
								</Badge>
								<h2 className="text-xl font-semibold text-white">
									{program.title}
								</h2>
								<p className="mt-2 text-sm text-muted-foreground">
									{program.description}
								</p>
								<ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
									{program.features.map((f) => (
										<li key={f} className="flex items-center gap-2">
											<Check className="h-4 w-4 shrink-0 text-primary" />
											{f}
										</li>
									))}
								</ul>
								<div className="mt-auto pt-6">
									<Button asChild variant="outline" className="w-full">
										<Link href={program.href}>{program.cta}</Link>
									</Button>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Get Started / Form */}
			<section id="get-started" className="relative z-10 py-16 sm:py-24">
				<Container>
					<div className="mx-auto max-w-2xl">
						<h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
							Get Started
						</h2>
						<p className="mt-3 text-center text-muted-foreground">
							Join our partner program and start growing with Dokploy.
						</p>
						<div className="mt-10 rounded-xl border border-border/50 bg-black/80 p-6 sm:p-8">
							<PartnerForm />
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
