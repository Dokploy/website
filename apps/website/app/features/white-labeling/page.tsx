import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Paintbrush,
	Type,
	Palette,
	Link2,
	MonitorCheck,
	Shield,
	KeyRound,
	ScrollText,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "White Label Deployment Platform",
	description:
		"Rebrand Dokploy as your own product. Customize the name, logo, colors and more to deliver a seamless experience under your own brand.",
};

const coreFeatures = [
	{
		icon: Type,
		title: "Customize your name and logo",
		description:
			"Replace Dokploy across the entire interface with your own application name. Upload your logo for the sidebar, header, and login page, and set a custom favicon so your branding carries through to the browser tab.",
	},
	{
		icon: Palette,
		title: "Style the interface to match your brand",
		description:
			"The custom CSS editor gives you direct control over the look and feel of the platform. Load the default theme variables as a starting point, then adjust colors, backgrounds, and button styles to match your brand guidelines.",
	},
	{
		icon: Link2,
		title: "Control the metadata and support links",
		description:
			"Set your own page title, footer text, sidebar links, and more for documentation and support, so users are always directed to your resources, not Dokploy\u2019s.",
	},
	{
		icon: MonitorCheck,
		title: "Preview changes before you ship them",
		description:
			"The live preview panel shows how your branding will look across key parts of the interface before you save anything, reducing the risk of pushing changes that break your user experience.",
	},
];

const relatedFeatures = [
	{
		icon: Shield,
		title: "RBAC",
		description:
			"Define exactly what each user can do once they\u2019re in Dokploy, with fine-grained permissions across projects, features, and services.",
		href: "/features/role-based-access-control",
	},
	{
		icon: KeyRound,
		title: "SSO",
		description:
			"Centralize authentication with your existing identity provider for secure, seamless access across your organization.",
		href: "/features/single-sign-on",
	},
	{
		icon: ScrollText,
		title: "Audit logs",
		description:
			"Keep a full record of every action taken across your environment for compliance and accountability.",
		href: "/features/audit-logs",
	},
];

export default function WhiteLabelingPage() {
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
							Deploy applications under your own brand
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Replace every Dokploy mention with your own name, logo, branding,
							and visual identity.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href="/contact">Contact sales</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link
									href="https://docs.dokploy.com/docs/core"
									target="_blank"
									rel="noopener noreferrer"
								>
									View documentation
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Your product, your brand */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Your product, your brand
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy&apos;s white labeling lets enterprise teams and agencies
							deliver a fully branded, professional deployment platform.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{coreFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold">{feature.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Powerful features for growing teams */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Powerful features for growing teams
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy scales with your team, with features and plans for when
							you&apos;re ready to take the next step.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{relatedFeatures.map((feature) => (
							<Link
								key={feature.title}
								href={feature.href}
								className="rounded-xl border border-border/50 bg-card p-6 transition hover:border-border"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold text-white">
									{feature.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Ready to launch your own platform?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Talk to us about white labeling and the rest of Dokploy&apos;s
							higher-tier features.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link href="/contact">Schedule a call</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
