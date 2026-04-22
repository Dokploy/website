import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Bot,
	Boxes,
	Activity,
	Users,
	MousePointerClick,
	Network,
	KeyRound,
	ShieldCheck,
	FlaskConical,
	Rocket,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Deploy AI Apps Securely with Dokploy",
	description:
		"Empower your team to deploy AI-built apps in a secure, isolated sandbox, with SSO, multitenancy, audit logs, and one-click deploys.",
	alternates: {
		canonical: "https://dokploy.com/deploy-ai",
	},
};

const coreFeatures = [
	{
		icon: Bot,
		title: "Connect AI agents directly to Dokploy",
		description:
			"Dokploy's MCP server enables AI agents to interact with your deployment environment through the Model Context Protocol. An AI tool can trigger deployments, query application state, and manage services—without needing a custom integration.",
	},
	{
		icon: Boxes,
		title: "Deploy any app, from any source",
		description:
			"Whether it's a Git repo, a Docker image, or a Docker Compose file, Dokploy handles it. Non-technical users can go from AI-generated code to a running application without a DevOps team in the loop.",
	},
	{
		icon: Activity,
		title: "Catch issues before they become problems",
		description:
			"Real-time monitoring, centralized logs, and instant rollback mean that when an AI-built app misbehaves, your team can see why and recover fast—before it touches anything else.",
	},
];

const guardrailFeatures = [
	{
		icon: Users,
		title: "Separate every team's environment",
		description:
			"Dokploy's multitenancy keeps projects and data isolated at the team level. One team can't see, access, or interfere with another's applications, so AI experimentation stays contained without needing a separate instance per team.",
	},
	{
		icon: MousePointerClick,
		title: "Let anyone deploy without the risk",
		description:
			"Non-technical users get a clean, simple interface for deploying and managing their apps. There's no CLI to learn and no config file to edit, just a straightforward path from code to running apps that doesn't require an engineer on standby.",
	},
	{
		icon: Network,
		title: "Lock down who can reach your environment",
		description:
			"Configure IP allowlisting to keep your internal deployment environment off the public internet. Wildcard subdomain support means every app gets its own clean internal URL, with access controlled at the network level.",
	},
	{
		icon: KeyRound,
		title: "Sign in with the identity provider you already use",
		description:
			"Dokploy supports SSO via Okta, Azure AD, Auth0, and more, with SCIM provisioning and deprovisioning. When someone joins a team, they get access. When they leave, it's revoked automatically—no manual cleanup, no lingering credentials.",
		link: {
			href: "/features/single-sign-on",
			label: "Learn more about SSO",
		},
	},
];

const testFreelyPoints = [
	"Deploy AI-built apps without touching production infrastructure",
	"Keep all environments fully isolated from live data and services",
	"Audit logs record every action across your Dokploy environment",
	"Roll back any deployment in seconds if something goes wrong",
	"Run experiments that never reach customers until you're ready",
];

const empowerTeamPoints = [
	"Sales, design, ops—anyone can deploy an app without IT involvement",
	"No infrastructure knowledge required to get from code to URL",
	"Subdomain support gives every app a clean, shareable internal link",
	"Security and compliance requirements are handled at the platform level",
	"Promising projects can graduate to production on your own timeline",
];

export default function DeployAIPage() {
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
							Empower your employees to deploy AI
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Your teams are building with AI. Talk to an expert to learn how
							Dokploy will give them a safe, governed environment to ship those
							tools without touching production infrastructure or involving an
							engineer.
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

			{/* Everything you need to start deploying AI today */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Everything you need to start deploying AI today
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy is built to take an app from an AI coding tool to a live,
							internal URL in minutes.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

			{/* Built for teams that need guardrails, not gatekeepers */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Built for teams that need guardrails, not gatekeepers
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							AI-generated code moves fast. Dokploy&apos;s enterprise features
							make sure that speed doesn&apos;t come at the cost of security or
							control.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{guardrailFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold text-white">
									{feature.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
								{feature.link ? (
									<Link
										href={feature.link.href}
										className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
									>
										{feature.link.label} &rarr;
									</Link>
								) : null}
							</div>
						))}
					</div>
					<div className="mt-12 flex justify-center">
						<Button className="rounded-full" asChild>
							<Link href="/enterprise">Discover Dokploy Enterprise</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Test freely. Ship confidently. */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Test freely. Ship confidently.
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							A dedicated internal sandbox means your teams can move fast
							without creating risk for the rest of the business.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<FlaskConical className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Test without the risk</h3>
							<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
								{testFreelyPoints.map((point) => (
									<li key={point} className="flex gap-3">
										<ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<Rocket className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Empower your team</h3>
							<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
								{empowerTeamPoints.map((point) => (
									<li key={point} className="flex gap-3">
										<ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* Openclaw */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
							<Sparkles className="h-7 w-7" />
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Get started with Openclaw in one click
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Openclaw is an open-source AI-powered coding assistant that you
							can self-host on Dokploy with a single template deploy. It gives
							your team a private, internal AI coding environment, and no data
							leaves your infrastructure.
						</p>
						<div className="mt-10">
							<Button variant="outline" className="rounded-full" asChild>
								<Link
									href="https://docs.dokploy.com/docs/core"
									target="_blank"
									rel="noopener noreferrer"
								>
									Read the Openclaw docs
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Dokploy Cloud CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Unlock Your Deployment Potential with Dokploy Cloud
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Say goodbye to infrastructure hassles, Dokploy Cloud handles it
							all. Effortlessly deploy, manage Docker containers, and secure
							your traffic with Traefik. Focus on building, we&apos;ll handle
							the rest.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Create an account
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
