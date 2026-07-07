import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Briefcase,
	Factory,
	FlaskConical,
	HeartPulse,
	Landmark,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Industries: Deployment Solutions by Sector",
	description:
		"See how teams in finance, healthcare, manufacturing, pharmaceuticals, and agencies use Dokploy to deploy applications in environments they control.",
	alternates: {
		canonical: "https://dokploy.com/industries",
	},
};

const industries = [
	{
		icon: Landmark,
		title: "Finance & Banking",
		description:
			"Deploy internal banking tools, fintech services, and customer-facing apps with governed access, audit logs, and private infrastructure.",
		href: "/industries/finance-banking",
	},
	{
		icon: Briefcase,
		title: "Agencies",
		description:
			"Launch client websites, SaaS products, and campaign apps from one repeatable platform with previews, domains, and whitelabeling.",
		href: "/industries/agencies",
	},
	{
		icon: HeartPulse,
		title: "Healthcare",
		description:
			"Release patient portals, clinical tools, and internal apps in private environments your IT teams can govern and monitor.",
		href: "/industries/healthcare",
	},
	{
		icon: Factory,
		title: "Manufacturing",
		description:
			"Ship plant-floor apps, integrations, and dashboards through controlled environments mapped to sites, lines, and regions.",
		href: "/industries/manufacturing",
	},
	{
		icon: FlaskConical,
		title: "Pharmaceuticals",
		description:
			"Deploy research tools, lab applications, and quality systems with review workflows, rollback options, and enterprise governance.",
		href: "/industries/pharmaceuticals",
	},
];

export default function IndustriesPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative overflow-hidden border-b border-border/30 bg-black py-20 sm:py-32">
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					height={40}
					width={40}
					duration={3}
					repeatDelay={1}
					className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
				/>
				<Container className="relative z-10">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
							Deployment solutions for your industry
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy gives teams in regulated and fast-moving industries a
							governed platform to deploy, review, and operate applications on
							infrastructure they control.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact Sales</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Industries grid */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Explore Dokploy by industry
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							The same deployment platform, adapted to the workflows,
							governance, and infrastructure requirements of your sector.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{industries.map((industry) => (
							<Link
								key={industry.title}
								href={industry.href}
								className="rounded-xl border border-border/50 bg-card p-6 transition hover:border-border"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<industry.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold">{industry.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{industry.description}
								</p>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Final CTA */}
			<CallToAction />
		</div>
	);
}
