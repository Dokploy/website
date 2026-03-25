import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Shield,
	Users,
	FolderLock,
	SlidersHorizontal,
	UserPlus,
	KeyRound,
	ScrollText,
	Paintbrush,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Role-Based Access Control for Teams",
	description:
		"Control who can access what across your Dokploy projects. Fine-grained RBAC keeps your infrastructure secure as your team scales.",
};

const coreFeatures = [
	{
		icon: Users,
		title: "Set organization-wide roles",
		description:
			"Assign owners, admins, and members across your organization, with each role scoping what that user can access and action within Dokploy.",
	},
	{
		icon: FolderLock,
		title: "Grant project-level access",
		description:
			"Go beyond top-level roles and give individual users access to specific projects, services, or environments\u2014keeping sensitive deployments off-limits to those who don\u2019t need them.",
	},
	{
		icon: SlidersHorizontal,
		title: "Manage permissions for every workflow",
		description:
			"Enable or restrict actions at a granular level: creating projects, deploying services, accessing Docker, managing SSH keys, running the CLI, and more. Build a permission set that reflects how your team actually works.",
	},
	{
		icon: UserPlus,
		title: "Scale access as your team grows",
		description:
			"As you add engineers, contractors, stakeholders, and third parties, RBAC makes it straightforward to onboard them with the right level of access from day one\u2014and to update or revoke permissions as roles change.",
	},
];

const relatedFeatures = [
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
			"Keep a full record of every action taken across your Dokploy environment for compliance and accountability.",
		href: "/features/audit-logs",
	},
	{
		icon: Paintbrush,
		title: "White labeling",
		description:
			"Present Dokploy as your own product, with custom branding for your clients or organization.",
		href: "/features/white-labeling",
	},
];

export default function RoleBasedAccessControlPage() {
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
							Secure access at every level
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Give every team member the right permissions in your application
							deployment solution with fine-grained role-based access
							control&mdash;no more, no less.
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

			{/* Control without compromise */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Control without compromise
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							RBAC in Dokploy lets you define exactly what each person on your
							team can see, create, control, and manage.
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
							Ready to take your business to the next level?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Talk to us about fine-grained RBAC and the rest of
							Dokploy&apos;s higher-tier feature set.
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
