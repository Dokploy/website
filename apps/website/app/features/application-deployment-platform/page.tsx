import { CallToAction } from "@/components/CallToAction";
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
	Bot,
	Clock,
	Cloud,
	CloudCog,
	Code2,
	CopyPlus,
	Download,
	Eye,
	FileCode,
	FolderInput,
	FolderPlus,
	GitBranch,
	GitPullRequest,
	HeartPulse,
	History,
	Layers,
	LayoutDashboard,
	LayoutTemplate,
	Rocket,
	RotateCcw,
	Server,
	Settings2,
	Shield,
	SlidersHorizontal,
	Users,
	Webhook,
	Workflow,
	Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Application Deployment Platform & Tool",
	description:
		"Dokploy is the open-source application deployment platform that takes your apps from Git push to live URL. One deployment tool for builds, previews, and rollbacks.",
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
			"Dokploy supports single services, multi-service apps, and static sites. Deploy from Git, a container registry, or Docker Compose.",
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
			"Trigger deployments automatically on every git push from GitHub, GitLab, Bitbucket, or Gitea.",
	},
	{
		icon: Eye,
		title: "Test changes before they go live",
		description:
			"Spin up isolated preview environments to test applications before they reach production.",
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
			"Build and publish applications in any continuous integration, continuous delivery (or continuous deployment) pipeline.",
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
			"Manage your servers and cloud resources across cloud providers from one place.",
	},
	{
		icon: Clock,
		title: "Automation beyond deployments",
		description:
			"Run cron jobs to automate recurring tasks for apps, services, and data workflows.",
	},
];

const INSTALL_COMMAND = "curl -sSL https://dokploy.com/install.sh | sh";

const deploymentSteps = [
	{
		icon: Download,
		title: "Set up Dokploy",
		description:
			"Run one command to install Dokploy on your VPS, or create a Dokploy Cloud account and skip server maintenance entirely.",
	},
	{
		icon: Server,
		title: "Connect a server",
		description:
			"A self-hosted install is ready to deploy to straight away, and you can add remote servers over SSH. On the Dokploy Cloud platform, connect the server you want to deploy to in a few clicks.",
	},
	{
		icon: FolderPlus,
		title: "Create a project and add your application",
		description:
			"Point it at a Git repository, a Docker image, or a Docker Compose file, then choose the branch you want to ship from.",
	},
	{
		icon: Settings2,
		title: "Configure the build",
		description:
			"Pick Nixpacks, Buildpacks, or a Dockerfile, add your environment variables, and generate a domain with automatic HTTPS.",
	},
	{
		icon: Rocket,
		title: "Deploy and monitor",
		description:
			"Click deploy and watch the logs in real time. Turn on auto-deploy to ship on every push, and roll back if a release misbehaves.",
	},
];

const environmentFeatures = [
	{
		icon: Layers,
		title: "Multiple environments per project",
		description:
			"Every project starts with a production environment. Add staging and development environments to keep work separated without duplicating projects.",
	},
	{
		icon: GitPullRequest,
		title: "Preview environments",
		description:
			"Open a pull request on GitHub and test it in an isolated preview deployment before changes reach your users.",
	},
	{
		icon: SlidersHorizontal,
		title: "Environment-specific configurations",
		description:
			"Set different variables for different environments, with shared project-level variables so you never repeat yourself.",
	},
	{
		icon: CopyPlus,
		title: "Clone environments in one click",
		description:
			"Duplicate an existing environment, services included, to spin up a staging setup that mirrors production.",
	},
	{
		icon: HeartPulse,
		title: "Zero-downtime releases",
		description:
			"Health checks confirm a new version is ready before traffic switches over, so users never see a broken deploy.",
	},
	{
		icon: History,
		title: "Recover in seconds",
		description:
			"Keep previous releases on hand, with automated rollback options to recover when a code change misbehaves in production.",
	},
];

const aiDeploymentFeatures = [
	{
		icon: Users,
		title: "Anyone can deploy",
		description:
			"Once Dokploy is set up, non-technical users can take code from an AI tool to a running app without engineering support.",
	},
	{
		icon: Layers,
		title: "Isolated team environments",
		description:
			"Multitenancy keeps every team's projects and data separate. AI experimentation stays contained.",
	},
	{
		icon: Bot,
		title: "AI agents via MCP",
		description:
			"Dokploy's MCP server lets AI agents trigger deployments, query app state, and manage services without a custom integration.",
	},
	{
		icon: Shield,
		title: "Built-in governance",
		description:
			"SSO, audit logs, IP allowlisting, and rollback in seconds. Speed from AI tools doesn't have to come at the cost of control.",
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
			"Dokploy integrates seamlessly with popular version control systems and workflows, including GitHub and other git providers such as GitLab, Gitea, and Atlassian tool Bitbucket. You can connect repos from these version control systems, automate deployments on code changes, and align deployment workflows with CI/CD practices. If your team already uses GitHub Actions or Atlassian, Dokploy fits into that process without forcing a new way of working.",
	},
	{
		question: "Can I deploy from a Docker registry?",
		answer:
			"Yes. You can deploy a Docker image directly from a registry, which is useful when you already build artifacts elsewhere or want tighter control over technologies and build tooling. This approach supports consistent deployments across environments and production, especially when combined with automation and rollback capabilities for safer releases.",
	},
	{
		question: "How do preview deployments work in Dokploy?",
		answer:
			"Preview deployments create environments for testing code changes before they reach production environments. When a pull request or branch updates, Dokploy can trigger automated deployments and deployment workflows so developers can validate functionality, reliability, and security in an isolated environment. This setup supports multiple environments, speeds up testing for new features, reduces the risk of deployment automation issues, and helps teams reduce errors before customers and users see changes in production.",
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
	{
		question: "Can I use Dokploy to deploy AI-generated apps?",
		answer:
			"Yes. Dokploy works with code from any source, including apps built or scaffolded by AI coding tools. You deploy using the same Git, Docker, and Compose workflows as any other application—there's no separate process for AI-generated code.",
	},
	{
		question: "What are examples of application deployment tools?",
		answer:
			"Common examples include Jenkins, an open-source automation server for builds and testing, GitHub Actions for CI/CD pipelines, Octopus Deploy for release management, and platforms like Dokploy that handle the full deployment process. The right choice depends on your deployment scenario. Pipeline tools automate individual steps, while a platform gives you one place to deploy applications, manage environments, and monitor everything you ship.",
	},
	{
		question: "Can I deploy applications for free?",
		answer:
			"Yes. Dokploy is open source and free to self-host, so the only cost is the server you run it on, with all the features you need to deploy and manage apps included. If you'd rather not manage the underlying infrastructure yourself when deploying software, Dokploy Cloud is a paid option that handles hosting, updates, and maintenance for you.",
	},
	{
		question: "Is Dokploy a CI/CD tool?",
		answer:
			"Dokploy handles the delivery side of CI/CD. It builds, deploys, and manages your applications, with webhooks that trigger automated deployments on every push. For continuous integration, it works alongside the testing tools you already use: run tests in GitHub Actions or another pipeline, publish a Docker image, and let Dokploy deploy it.",
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
							Deploy any type of application with our straightforward deployment
							tool. Benefit from multiple build types, Docker Compose support,
							and our native Git integration.
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
							<Button
								className="rounded-full bg-[#5965F2] hover:bg-[#4A55E0]"
								asChild
							>
								<Link
									href="/contact"
									aria-label="Contact Us"
									className="text-white"
								>
									Contact Us
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

			{/* AI deployment */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Deploy the apps your teams are already building with AI
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							AI coding tools are changing how applications get written. Dokploy
							handles the deployment side, from AI-generated code to a live URL,
							powered by your existing workflows.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{aiDeploymentFeatures.map((feature) => (
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
					<div className="mx-auto mt-16 max-w-2xl rounded-xl border border-border/50 bg-card p-8 text-center">
						<h3 className="text-xl font-semibold">
							Need a governed environment for AI tools?
						</h3>
						<p className="mt-3 text-muted-foreground">
							See how Dokploy handles sandboxed deploys, non-technical users,
							and enterprise security for AI-built apps.
						</p>
						<div className="mt-6">
							<Button className="rounded-full" asChild>
								<Link href="/enterprise">Deploy AI tools with Dokploy</Link>
							</Button>
						</div>
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
							Connect a repo from any popular version control system and deploy
							on push with webhooks. We support GitHub, GitLab, Gitea,
							Bitbucket, Docker registries, and generic Git providers. Control
							exactly what changes trigger a release, including monorepos.
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
							infrastructure or ours. Dokploy runs on major Linux operating
							systems.
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

			{/* Deploy your app in a few simple steps */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Deploy your app in a few simple steps with Dokploy
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Getting web applications from code to a live URL takes minutes,
							not days. Here are the 5 steps in the deployment process:
						</p>
					</div>
					<ol className="mx-auto mt-16 max-w-3xl space-y-6">
						{deploymentSteps.map((step, index) => (
							<li
								key={step.title}
								className="flex gap-5 rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<step.icon className="h-6 w-6" />
								</div>
								<div className="min-w-0 flex-1">
									<h3 className="text-lg font-semibold">
										{index + 1}. {step.title}
									</h3>
									<p className="mt-2 text-sm text-muted-foreground">
										{step.description}
									</p>
									{index === 0 && (
										<div className="mt-4 flex items-center gap-3 rounded-lg border border-border/50 bg-black px-4 py-3 font-mono text-sm text-white">
											<span className="select-none text-primary">$</span>
											<code className="flex-1 overflow-x-auto whitespace-nowrap">
												{INSTALL_COMMAND}
											</code>
										</div>
									)}
								</div>
							</li>
						))}
					</ol>
				</Container>
			</section>

			{/* Hundreds of templates */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
								<LayoutTemplate className="h-7 w-7" />
							</div>
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Hundreds of templates to get started
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Deploy popular open-source apps in one click with Dokploy
							Templates, a ready-to-run library of pre-configured apps you can
							deploy fast, without rebuilding the same stack from scratch.
						</p>
						<div className="mt-8">
							<Button className="rounded-full" asChild>
								<Link href="/templates">Check out our templates</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Dashboard screenshot */}
			<section className="border-b border-border/30 py-12 sm:py-16">
				<Container>
					<div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-border/50 shadow-2xl">
						<Image
							src="/dashboard.webp"
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

			{/* What is an application deployment tool? */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							What is an application deployment tool?
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							An application deployment tool automates the process of getting
							software from a code repository to a running service. Instead of
							copying files to servers and configuring everything by hand, teams
							push code and let the tool handle builds, releases, and the
							underlying infrastructure. Dokploy covers that whole workflow,
							from your version control system to monitoring and rollbacks, in
							one dashboard.
						</p>
					</div>
				</Container>
			</section>

			{/* Deployment environments and strategies */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Deployment environments and strategies
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Use deployment strategies that keep you shipping safely across the
							whole development lifecycle, from first commit to production
							environments.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{environmentFeatures.map((feature) => (
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
