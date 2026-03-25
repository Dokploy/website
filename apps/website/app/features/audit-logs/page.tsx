import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	ScrollText,
	Building2,
	Search,
	FileCheck,
	AlertCircle,
	Shield,
	KeyRound,
	Paintbrush,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Audit Logs for Enterprise Compliance",
	description:
		"Track every action across your Dokploy organization. Audit logs give enterprise teams the visibility they need for security and compliance.",
};

const coreFeatures = [
	{
		icon: Building2,
		title: "Track actions across your whole organization",
		description:
			"Audit logs capture authentication events, user management changes, deployment activity, infrastructure updates, environment variable changes, backup configuration, and more. If it happened in Dokploy, it\u2019s recorded.",
	},
	{
		icon: AlertCircle,
		title: "Investigate issues quickly",
		description:
			"Each log entry includes a timestamp, the user who performed the action, the action type, the resource affected, and the user\u2019s role in Dokploy at the time. When something goes wrong, you have everything you need to trace it back to its source.",
	},
	{
		icon: Search,
		title: "Filter down to exactly what you need",
		description:
			"Search and filter audit logs by user, resource name, action type, or resource type so you can find the specific event you\u2019re looking for without scrolling through unrelated activity.",
	},
	{
		icon: FileCheck,
		title: "Meet compliance requirements with confidence",
		description:
			"Audit logs give you documented evidence of access control and change management, making it straightforward to satisfy requirements for SOC 2, GDPR, and internal security policies.",
	},
];

const relatedFeatures = [
	{
		icon: Shield,
		title: "RBAC",
		description:
			"Control who can perform the actions your audit logs record, with fine-grained permissions across projects and services.",
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
		icon: Paintbrush,
		title: "White labeling",
		description:
			"Present Dokploy as your own product, with custom branding for your clients or organization.",
		href: "/features/white-labeling",
	},
];

export default function AuditLogsPage() {
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
							Full visibility into every action taken
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Know exactly who did what, and when, across your entire Dokploy
							organization.
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

			{/* A complete record of every change */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							A complete record of every change
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Every create, update, delete, deployment, and configuration change
							is logged&mdash;giving you a reliable trail for security,
							compliance, and debugging.
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
							Ready to take control?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Talk to us about audit logs and the rest of Dokploy&apos;s
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
