import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Code2,
	Layers,
	Wrench,
	GitBranch,
	Webhook,
	Eye,
	FolderInput,
	Server,
	Cloud,
	LayoutTemplate,
	Workflow,
	FileCode,
	RotateCcw,
	LayoutDashboard,
	CloudCog,
	Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Application & Software Deployment Platform",
	description:
		"Dokploy's flexible, powerful application and software deployment platform enables you to put code written in Node.js, PHP, Python, Go, and Ruby live.",
};

const professionalFeatures = [
	{
		icon: Code2,
		title: "Support for multiple languages",
		description:
			"Deploy apps written in Node, PHP, Python, Go, Ruby, and more. Dokploy does not restrict programming languages.",
	},
	{
		icon: Layers,
		title: "Deploy any app with any stack",
		description:
			"Dokploy supports single services and multi-service apps. Deploy from Git, a container registry, or Docker Compose.",
	},
	{
		icon: Wrench,
		title: "Your build, your way",
		description:
			"Choose Nixpacks, Buildpacks, or a Dockerfile. Switch strategies per project without reworking your pipeline.",
	},
];

const automationFeatures = [
	{
		icon: Webhook,
		title: "Use webhooks to auto-deploy",
		description:
			"Trigger deployments automatically by git push if you're a GitHub user.",
	},
	{
		icon: Eye,
		title: "Test changes before they go live",
		description:
			"Preview and test applications in isolated environments before production.",
	},
	{
		icon: FolderInput,
		title: "Set up automated watch paths",
		description:
			"Monitor directories or files for changes and trigger actions when they're modified.",
	},
];

const deploymentOptions = [
	{
		icon: Server,
		title: "On-Premise Deployment",
		items: [
			"Complete data sovereignty",
			"Maximum security control",
			"Compliance with strict regulations",
			"No external dependencies",
		],
	},
	{
		icon: Cloud,
		title: "Cloud Deployment",
		items: [
			"Rapid scaling capabilities",
			"Reduced infrastructure overhead",
			"Global availability",
			"Managed infrastructure",
		],
	},
];

const platformFeatures = [
	{
		icon: Workflow,
		title: "Automate deployments with CI/CD",
		description:
			"Build and publish your applications in any continuous integration, continuous delivery pipeline.",
	},
	{
		icon: FileCode,
		title: "Configuration-first setup",
		description:
			"Use configuration files to maintain consistency in setup, configuration, and build across teams.",
	},
	{
		icon: RotateCcw,
		title: "Rollback capabilities built in",
		description:
			"Rollback capabilities help teams recover quickly when new features impact production.",
	},
	{
		icon: LayoutDashboard,
		title: "Single dashboard with analytics",
		description:
			"Manage deployment tools, environments, infrastructure, and analytics from a single dashboard as you scale.",
	},
	{
		icon: CloudCog,
		title: "Simplify infrastructure management",
		description:
			"Utilize infrastructure as code across cloud providers and AWS services.",
	},
	{
		icon: Clock,
		title: "Automation beyond deployments",
		description:
			"Run cron jobs to automate recurring tasks for apps, services, and data workflows.",
	},
];

const faqs = [
	{
		question: "Can I deploy Docker Compose apps with Dokploy?",
		answer:
			"Yes. Dokploy supports deploying applications with Docker Compose, which is ideal when your implementation spans multiple services, data stores, and supporting tools. You can deploy a Compose stack as part of your deployment workflows, keep configuration in configuration files, and manage environments without increasing complexity as you scale.",
	},
	{
		question: "Which Git providers can I deploy from?",
		answer:
			"Dokploy integrates seamlessly with popular version control systems and workflows, including GitHub and other git providers such as GitLab, Gitea, Bitbucket, and other Atlassian tools. You can connect repos from these version control systems, automate deployments on code changes, and align deployment workflows with CI/CD practices. If your team already uses GitHub Actions or Atlassian tools, Dokploy fits into that process without forcing a new way of working.",
	},
	{
		question: "Can I deploy from a Docker registry?",
		answer:
			"Yes. You can deploy a Docker image directly from a registry, which is useful when you already build artifacts elsewhere or want tighter control over technologies and build tooling. This approach supports consistent deployments across environments and production, especially when combined with automation and rollback capabilities for safer releases.",
	},
	{
		question: "How do preview deployments work in Dokploy?",
		answer:
			"Preview deployments create environments for testing code changes before they reach production environments. When a pull request or branch updates, Dokploy can trigger automated deployments and deployment workflows so developers can validate functionality, reliability, and security in an isolated environment. This setup supports multiple environments, speeds up testing for new features, and helps teams reduce errors before customers and users see changes in production.",
	},
	{
		question: "What is a deployment platform?",
		answer:
			"A deployment platform helps developers and teams deploy apps and services through a repeatable deployment process. It brings software deployment tools and deployment workflows into one place so you can manage setup, configuration, build, deployment, and infrastructure management from a single dashboard. The goal is speed and reliability: automate routine steps, reduce errors from manual work, and keep production environments secure as applications evolve and ship new features.",
	},
	{
		question:
			"What's the difference between a deployment platform and a software deployment platform?",
		answer:
			"In practice, they overlap. A deployment platform often focuses on the mechanics of deployment tools and infrastructure, while a software deployment platform emphasizes end-to-end software delivery, including CI/CD, continuous integration, and continuous delivery. A software deployment platform typically ties deployment workflows to version control systems, configuration files, and multiple environments, so teams can maintain consistency from development to production, with rollback capabilities when code changes introduce issues.",
	},
];

export default function ApplicationDeploymentPlatformPage() {
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
							The Ultimate Application Deployment Platform
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Deploy any type of application with our straightforward solution.
							Benefit from multiple build types, Docker Compose support, and our
							native Git integration.
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

			{/* Professional features for every developer */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Professional features for every developer
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Take advantage of flexible features that empower everyone, no
							matter your build strategy or the size of your team.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{professionalFeatures.map((feature) => (
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

			{/* Ship from GitHub, Bitbucket, and more */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
								<GitBranch className="h-7 w-7" />
							</div>
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Ship from GitHub, Bitbucket, and more
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Connect your repo and deploy on push with webhooks. We support
							GitHub, GitLab, Gitea, Bitbucket, Docker registry, and Git generic
							provider. Control exactly what changes trigger a release, including
							monorepos.
						</p>
					</div>
				</Container>
			</section>

			{/* Automate deployments and test changes */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Automate deployments and test changes
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Keep application deployments hands-off, while still staying in
							control of what ships and when.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
						{automationFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6 text-center"
							>
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
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

			{/* Host Dokploy where your business needs it */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Host Dokploy where your business needs it
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Choose a deployment option that suits your business–on your
							infrastructure or ours.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
						{deploymentOptions.map((option) => (
							<div
								key={option.title}
								className="rounded-xl border border-border/50 bg-card p-8"
							>
								<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<option.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold text-white">
									{option.title}
								</h3>
								<ul className="mt-4 space-y-2">
									{option.items.map((item) => (
										<li
											key={item}
											className="flex items-center gap-2 text-sm text-muted-foreground"
										>
											<span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											{item}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Hundreds of templates */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
								<LayoutTemplate className="h-7 w-7" />
							</div>
						</div>
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Hundreds of templates to get started
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Deploy popular open-source apps in one click with Dokploy Templates,
							a ready-to-run library of pre-configured apps you can deploy fast,
							without rebuilding the same stack from scratch.
						</p>
					</div>
				</Container>
			</section>

			{/* Dashboard screenshot */}
			<section className="border-b border-border/30 py-12 sm:py-16">
				<Container>
					<div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-border/50 shadow-2xl">
						<Image
							src="/dashboard.png"
							alt="Dokploy dashboard showing projects and deployed services"
							width={1200}
							height={750}
							className="w-full object-cover"
							sizes="(max-width: 768px) 100vw, 1200px"
							priority={false}
						/>
					</div>
				</Container>
			</section>

			{/* Everything you need in a deployment platform */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Everything you need in a deployment platform
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy is the software deployment platform for shipping anything
							from a single service to a full multi-container stack.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{platformFeatures.map((feature) => (
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
				</Container>
			</section>

			{/* Application deployment FAQs */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Application deployment FAQs
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="mx-auto mt-12 w-full max-w-3xl"
					>
						{faqs.map((faq, index) => (
							<AccordionItem value={`faq-${index}`} key={index}>
								<AccordionTrigger className="text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>

			<CallToAction />
		</div>
	);
}
