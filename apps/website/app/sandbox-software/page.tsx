import { Container } from "@/components/Container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Activity,
	Bot,
	Boxes,
	Building2,
	Check,
	FlaskConical,
	GitBranch,
	Headphones,
	KeyRound,
	Layers,
	Lock,
	Rocket,
	Server,
	ShieldCheck,
	Sparkles,
	TrendingUp,
	Users,
	Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Sandbox Software for Safe Internal Deployments",
	description:
		"Deploy, test, and share apps internally with Dokploy's sandbox software. Give your team a safe, isolated environment to build without the risk.",
	alternates: {
		canonical: "https://dokploy.com/sandbox-software",
	},
};

const sandboxFeatures = [
	{
		icon: Boxes,
		title: "Internal app deployment",
		description:
			"Ship tools and applications to your team without routing them through your main production environment. Deploy apps in their own contained environment, so users get access without risking other systems.",
	},
	{
		icon: FlaskConical,
		title: "Prototyping and early-stage development",
		description:
			"Run code in a development environment that's completely isolated from your live environment. Developers can make code changes, test new features, and identify bugs before anything reaches your users.",
	},
	{
		icon: Users,
		title: "A sandbox anyone can use",
		description:
			"Give less technical colleagues a safe space to explore and interact with new software with no risk of breaking anything and no access to sensitive data. Anyone can try out new tools or test features without consequences.",
	},
	{
		icon: Bot,
		title: "Ship AI-coded apps with confidence",
		description:
			"Run vibe-coded apps built by your team, or AI tools like Cursor and Copilot, in an isolated virtual environment before integrating them into wider systems. Catch compatibility issues and review registry changes without exposing your host machine.",
	},
];

const vibeCodedFeatures = [
	{
		icon: ShieldCheck,
		title: "Keep every deployment secure",
		description:
			"Each app runs in its own isolated virtual environment. Multitenancy keeps every team's environment separate, so AI experimentation stays contained without needing a separate instance per team.",
	},
	{
		icon: TrendingUp,
		title: "Scale as your team grows",
		description:
			"Spin up multiple instances as your team expands. Dokploy's architecture supports the kind of scale that growing companies need, with resources that flex alongside your workload rather than holding you back.",
	},
	{
		icon: KeyRound,
		title: "Stay in control of who accesses what",
		description:
			"With granular access controls, you decide which users can deploy, view, or interact with each application. Role-based permissions and audit logs keep your sandbox organized, data protected, and actions traceable.",
	},
];

const platformFeatures = [
	{
		icon: Rocket,
		title: "Deploy any application in minutes",
		description:
			"Dokploy supports Docker, Docker Compose, and Nixpacks out of the box, so you can deploy applications built on virtually any stack. Getting a new app into a sandbox environment takes minutes, not days.",
	},
	{
		icon: Layers,
		title: "Isolate every project from the start",
		description:
			"Projects run in their own environment by default. There's no risk of one app's processes, file system changes, or network activity bleeding into another, especially when you run untrusted applications or testing code in parallel.",
	},
	{
		icon: GitBranch,
		title: "Integrate the tools your team is using",
		description:
			"Dokploy connects with GitHub, GitLab, and Bitbucket, so developers can trigger deployments directly from their existing workflows. Integrated CI/CD pipelines mean new features move from commit to sandbox seamlessly.",
	},
	{
		icon: Activity,
		title: "Monitor performance across every environment",
		description:
			"Built-in monitoring gives you visibility into resource usage, uptime, and application health across all your sandboxed apps. Identify issues early, before they reach your production environment.",
	},
	{
		icon: Workflow,
		title: "Manage multiple environments with ease",
		description:
			"Create and manage different environments—development, staging, and beyond—from a single dashboard. Move applications through different stages of the development process in a structured, repeatable way.",
	},
	{
		icon: Lock,
		title: "Keep your data and deployments secure",
		description:
			"SSL certificates, SSH key management, and Traefik-powered reverse proxy come built in. Your sandbox environment is secure from the moment you deploy, with no additional configuration needed.",
	},
];

const enterpriseFeatures = [
	{
		icon: Building2,
		title: "Centralize access across your entire organization",
		description:
			"Get multi-user management and fine-grained custom roles on every environment on your platform. Define exactly who can deploy, view, and modify each application, with more granular control than standard RBAC allows.",
	},
	{
		icon: Server,
		title: "Deploy on your own infrastructure",
		description:
			"Run Dokploy entirely on your own servers, in your own cloud environment, or on-premise. Your data never leaves your infrastructure, especially when you're deploying internal applications or processing sensitive files.",
	},
	{
		icon: Headphones,
		title: "Access dedicated support when you need it",
		description:
			"Enterprise customers get direct access to the Dokploy team for onboarding, troubleshooting, and ongoing support. If something needs fixing in your sandbox environment, you won't be waiting on a community forum.",
	},
	{
		icon: KeyRound,
		title: "Sign in securely with SSO",
		description:
			"Give your team one-click access through identity providers like Okta, Azure AD, and Auth0, with SCIM provisioning and deprovisioning built in. When someone joins a team, they get access. When they leave, it's revoked automatically.",
	},
];

const mcpPoints = [
	"Trigger deployments directly from your AI coding tool",
	"Query application state without leaving your development environment",
	"Manage services and infrastructure through natural language",
	"Connect any MCP-compatible agent, including Cursor, Copilot, and Claude",
];

const faqs = [
	{
		question: "What is sandbox software?",
		answer: [
			"Sandbox software lets you run applications, test code, and explore new software in an isolated virtual environment—one that is completely separate from your live production environment.",
			"A sandbox is a contained environment, meaning that any changes made inside it, whether to the file system, registry, or network, can't affect your host machine or other systems. Sandboxes are widely used in software development, malware analysis, and security testing, as well as for reducing risk when deploying internal tools to users.",
		],
	},
	{
		question: "Which sandbox software is best for startups?",
		answer: [
			"For startups, the best sandbox software tends to be open-source or competitively priced, quick to set up, and flexible enough to support a fast-moving development process.",
			"Dokploy is a strong option: it's self-hosted, supports Docker and Compose out of the box, and gives small teams a sandbox environment they can spin up in minutes. It also scales well as your team grows, so you won't need to switch platforms when you do.",
		],
	},
	{
		question: "Which sandbox software is best for agencies?",
		answer: [
			"Agencies need sandbox software that handles multiple clients or projects in parallel, with clear separation between environments and straightforward access controls.",
			"Dokploy's multi-environment management and role-based permissions make it a practical choice: you can maintain isolated development environments for each client, deploy new features for review, and keep everything organized from a single dashboard.",
		],
	},
	{
		question: "What are the benefits of using sandbox software?",
		answer: [
			"The main benefit is safety. A sandbox environment lets developers test code, run new software, and deploy internal applications without risking their production environment or other systems.",
			"Beyond safety and security, sandboxes make it easier to identify bugs and compatibility issues early in the development process, give non-technical team members a safe space to interact with applications, enable more feature prototyping before launches, and create a more structured workflow—there's clear separation between development, staging, and live environments.",
		],
	},
	{
		question: "How do I use sandbox software?",
		answer: [
			"The process varies by platform, but with Dokploy, you start by setting up your self-hosted instance, which takes just a few minutes on any VPS.",
			"From there, you connect your code repository, configure your deployment settings, and deploy your application into an isolated environment.",
			"Team members can then access the app through a URL, without ever needing access to the underlying infrastructure. You can manage multiple instances, monitor performance, and move applications through different stages of testing from the same dashboard.",
		],
	},
	{
		question: "Which sandbox software is best for B2B companies?",
		answer: [
			"B2B companies typically need sandbox software that supports internal workflows, integrates with existing tools, and keeps sensitive data protected.",
			"Dokploy Enterprise runs on your own infrastructure, connects with GitHub and GitLab, includes granular access controls, and supports the kind of scale that B2B teams need as they grow. You can also whitelabel the tool to create a seamless, branded experience for customers.",
			"Dokploy is particularly useful for companies that want to deploy AI-assisted or internally developed applications to employees without routing them through a public-facing environment.",
		],
	},
];

export default function SandboxSoftwarePage() {
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
							Your team&apos;s sandbox. Your infrastructure. Your rules.
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy gives you a fully isolated environment to build, test, and
							ship internal and AI-coded apps, without touching your production
							environment or putting your systems at risk.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
									target="_blank"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact us</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Everything you need to build, test, and ship safely */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Everything you need to build, test, and ship safely
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Whether your team is prototyping a new feature or rolling out an
							AI-coded tool, your sandbox environment handles it—contained,
							controlled, and completely separate from your live environment.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{sandboxFeatures.map((feature) => (
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

			{/* The smart way to release vibe-coded apps internally */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							The smart way to release vibe-coded apps internally
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							AI-assisted development is moving fast. Dokploy gives your team
							the infrastructure to deploy and share AI-generated applications
							in a secure, controlled environment without slowing down the
							development process.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{vibeCodedFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
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
							</div>
						))}
					</div>
					<div className="mt-12 text-center">
						<Button variant="outline" className="rounded-full" asChild>
							<Link href="/deploy-ai">Deploy AI software with Dokploy</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* The features that make Dokploy a powerful sandbox tool */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							The features that make Dokploy a powerful sandbox tool
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy is designed for teams that need flexibility, security, and
							control—whether you&apos;re running a single internal app or
							managing development environments across multiple projects.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{platformFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold">{feature.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Dokploy Enterprise: sandbox software built for teams */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Dokploy Enterprise: sandbox software built for teams
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							For organizations running sandbox environments at scale, Dokploy
							Enterprise adds the infrastructure, support, and controls that
							make internal deployments manageable—even for large teams.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{enterpriseFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
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
							</div>
						))}
					</div>
					<div className="mt-12 text-center">
						<Button variant="outline" className="rounded-full" asChild>
							<Link href="/enterprise">Discover Dokploy Enterprise</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Connect AI agents directly to your sandbox */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
						<div>
							<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
								Connect AI agents directly to your sandbox
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Dokploy&apos;s MCP server enables AI agents to interact with
								your deployment environment through the Model Context Protocol,
								no custom integration required.
							</p>
							<ul className="mt-8 space-y-4">
								{mcpPoints.map((point) => (
									<li key={point} className="flex items-start gap-3">
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
											<Check className="h-3.5 w-3.5" />
										</span>
										<span className="text-sm text-muted-foreground">
											{point}
										</span>
									</li>
								))}
							</ul>
						</div>
						<div className="flex aspect-square items-center justify-center rounded-2xl border border-border/50 bg-card sm:aspect-video lg:aspect-square">
							<div className="flex flex-col items-center gap-4 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 text-primary">
									<Sparkles className="h-8 w-8" />
								</div>
								<p className="max-w-[220px] text-sm text-muted-foreground">
									Cursor, Copilot, Claude, and any MCP-compatible agent
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Sandbox software FAQs
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="mx-auto mt-16 w-full max-w-3xl"
					>
						{faqs.map((faq) => (
							<AccordionItem value={faq.question} key={faq.question}>
								<AccordionTrigger className="text-left text-white">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-3">
										{faq.answer.map((paragraph) => (
											<p key={paragraph}>{paragraph}</p>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Give your team a safe place to build
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Start deploying internal and AI-coded apps in a sandbox that stays
							fully separate from production, on infrastructure you control.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
									target="_blank"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Contact us</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
