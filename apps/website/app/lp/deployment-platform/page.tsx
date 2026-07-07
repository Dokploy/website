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
	AlertTriangle,
	Bot,
	Boxes,
	CheckCircle2,
	Clock,
	Code2,
	Eye,
	FileCog,
	FlaskConical,
	GitBranch,
	Hammer,
	History,
	Layers,
	LayoutDashboard,
	LayoutTemplate,
	Unlock,
	Webhook,
	Workflow,
	XCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Application & Software Deployment Platform",
	description:
		"Dokploy's flexible, powerful application and software deployment platform enables self-hosting and secure AI app deployment, with Docker Compose support.",
	alternates: {
		canonical: "https://dokploy.com/lp/deployment-platform",
	},
	robots: {
		index: false,
		follow: false,
	},
};

const professionalFeatures = [
	{
		icon: Code2,
		title: "Support for multiple languages",
		description:
			"Deploy apps written in Node, PHP, Python, Go, Ruby, and more. Dokploy does not restrict programming languages.",
	},
	{
		icon: Boxes,
		title: "Deploy any app with any stack",
		description:
			"Dokploy supports single services and multi-service apps. Deploy from Git, a container registry, or Docker Compose.",
	},
	{
		icon: Unlock,
		title: "Eliminate vendor lock-in",
		description:
			"Your apps, your servers, your data. A self-hosted PaaS gives you full control over where workloads run.",
	},
	{
		icon: Hammer,
		title: "Your build, your way",
		description:
			"Choose Nixpacks, Buildpacks, or a Dockerfile. Switch strategies per project without reworking your pipeline.",
	},
	{
		icon: GitBranch,
		title: "Ship from GitHub, Bitbucket, and more",
		description:
			"Connect your repo and deploy on push with webhooks. Control exactly what changes trigger a release, including monorepos.",
	},
	{
		icon: Bot,
		title: "Run your AI tools in-house",
		description:
			"Your tools run on your own server, so code, prompts, and outputs never leave your infrastructure. Create sandboxes where your team can deploy safely.",
	},
];

const comparisonRows = [
	{
		point: "Docker Compose",
		values: [
			{ status: "yes", text: "Native Compose support" },
			{ status: "yes", text: "Native Compose support" },
			{ status: "warn", text: "Dockerfile-first deploys" },
			{ status: "no", text: "No Docker deploys" },
			{ status: "warn", text: "Local Compose only" },
		],
	},
	{
		point: "Self-hosted option",
		values: [
			{ status: "yes", text: "Self-hosted VPS option" },
			{ status: "yes", text: "Self-hosted server option" },
			{ status: "yes", text: "Self-hosted PaaS option" },
			{ status: "no", text: "Managed cloud only" },
			{ status: "no", text: "Managed dyno platform" },
		],
	},
	{
		point: "Persistent storage",
		values: [
			{ status: "yes", text: "Built-in volume backups" },
			{ status: "warn", text: "Manual volume migration" },
			{ status: "warn", text: "Storage plugin needed" },
			{ status: "warn", text: "External Blob storage" },
			{ status: "no", text: "Ephemeral dyno filesystem" },
		],
	},
	{
		point: "Multi-server control",
		values: [
			{ status: "yes", text: "Remote server deploys" },
			{ status: "warn", text: "High availability needs setup" },
			{ status: "no", text: "Single-server design" },
			{ status: "warn", text: "Frontend global platform" },
			{ status: "warn", text: "Dyno scaling only" },
		],
	},
];

const competitors = ["Dokploy", "Coolify", "Dokku", "Vercel", "Heroku"];

const statusIcon = {
	yes: <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />,
	warn: <AlertTriangle className="h-4 w-4 flex-shrink-0 text-yellow-500" />,
	no: <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />,
} as const;

const automationFeatures = [
	{
		icon: Webhook,
		title: "Use webhooks to auto-deploy",
		description:
			"Trigger deployments automatically by git push if you're a GitHub user.",
	},
	{
		icon: FlaskConical,
		title: "Test changes before they go live",
		description:
			"Preview and test applications in isolated environments before production.",
	},
	{
		icon: Eye,
		title: "Set up automated watch paths",
		description:
			"Monitor directories or files for changes and trigger actions when they're modified.",
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
		icon: FileCog,
		title: "Configuration-first setup",
		description:
			"Use configuration files to maintain consistency in setup, configuration, and build across teams.",
	},
	{
		icon: History,
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
		icon: Layers,
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
		answer: (
			<>
				<p>
					Yes. Dokploy supports deploying applications with Docker Compose,
					which is ideal when your implementation spans multiple services, data
					stores, and supporting tools.
				</p>
				<p className="mt-3">
					You can deploy a Compose stack as part of your deployment workflows,
					keep configuration in configuration files, and manage environments
					without increasing complexity as you scale.
				</p>
			</>
		),
	},
	{
		question: "Which Git providers can I deploy from?",
		answer: (
			<>
				<p>
					Dokploy integrates seamlessly with popular version control systems and
					workflows, including GitHub and other git providers such as GitLab,
					Gitea, Bitbucket, and other Atlassian tools.
				</p>
				<p className="mt-3">
					You can connect repos from these version control systems, automate
					deployments on code changes, and align deployment workflows with CI/CD
					practices.
				</p>
				<p className="mt-3">
					If your team already uses GitHub Actions or Atlassian tools, Dokploy
					fits into that process without forcing a new way of working.
				</p>
			</>
		),
	},
	{
		question: "Can I deploy from a Docker registry?",
		answer: (
			<>
				<p>
					Yes. You can deploy a Docker image directly from a registry, which is
					useful when you already build artifacts elsewhere or want tighter
					control over technologies and build tooling.
				</p>
				<p className="mt-3">
					This approach supports consistent deployments across environments and
					production, especially when combined with automation and rollback
					capabilities for safer releases.
				</p>
			</>
		),
	},
	{
		question: "How do preview deployments work in Dokploy?",
		answer: (
			<>
				<p>
					Preview deployments create environments for testing code changes
					before they reach production environments. When a pull request or
					branch updates, Dokploy can trigger automated deployments and
					deployment workflows so developers can validate functionality,
					reliability, and security in an isolated environment.
				</p>
				<p className="mt-3">
					This setup supports multiple environments, speeds up testing for new
					features, and helps teams reduce errors before customers and users see
					changes in production.
				</p>
			</>
		),
	},
	{
		question: "What is a deployment platform?",
		answer: (
			<>
				<p>
					A deployment platform helps developers and teams deploy apps and
					services through a repeatable deployment process.
				</p>
				<p className="mt-3">
					It brings software deployment tools and deployment workflows into one
					place so you can manage setup, configuration, build, deployment, and
					infrastructure management from a single dashboard.
				</p>
				<p className="mt-3">
					The goal is speed and reliability: automate routine steps, reduce
					errors from manual work, and keep production environments secure as
					applications evolve and ship new features.
				</p>
			</>
		),
	},
	{
		question:
			"What's the difference between a deployment platform and a software deployment platform?",
		answer: (
			<>
				<p>In practice, they overlap.</p>
				<p className="mt-3">
					A deployment platform often focuses on the mechanics of deployment
					tools and infrastructure, while a software deployment platform
					emphasizes end-to-end software delivery, including CI/CD, continuous
					integration, and continuous delivery.
				</p>
				<p className="mt-3">
					A software deployment platform typically ties deployment workflows to
					version control systems, configuration files, and multiple
					environments, so teams can maintain consistency from development to
					production, with rollback capabilities when issues arise.
				</p>
			</>
		),
	},
];

export default function DeploymentPlatformLandingPage() {
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
							Deploy any type of application, including AI, with our
							straightforward solution. Benefit from multiple build types,
							Docker Compose support, and our native Git integration.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href="/contact">Contact Sales</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Get Started
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

			{/* Dokploy vs. the competition */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Dokploy vs. the competition
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Learn why so many development teams are choosing Dokploy.
						</p>
					</div>

					<div className="mx-auto mt-16 max-w-6xl overflow-x-auto">
						<table className="w-full min-w-[820px] border-collapse text-left text-sm">
							<thead>
								<tr className="border-b border-border/50">
									<th className="p-4 font-semibold text-muted-foreground">
										Comparison point
									</th>
									{competitors.map((name) => (
										<th
											key={name}
											className={
												name === "Dokploy"
													? "p-4 font-semibold text-primary"
													: "p-4 font-semibold text-white"
											}
										>
											{name}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{comparisonRows.map((row) => (
									<tr
										key={row.point}
										className="border-b border-border/30 align-top"
									>
										<th className="p-4 text-left font-medium text-white">
											{row.point}
										</th>
										{row.values.map((value, i) => (
											<td
												key={`${row.point}-${competitors[i + 1] ?? competitors[i]}`}
												className={
													i === 0
														? "rounded-md bg-primary/5 p-4 text-muted-foreground"
														: "p-4 text-muted-foreground"
												}
											>
												<div className="flex items-start gap-2">
													{statusIcon[value.status as keyof typeof statusIcon]}
													<span>{value.text}</span>
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
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
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{automationFeatures.map((feature) => (
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

			{/* Hundreds of templates to get started */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
							<LayoutTemplate className="h-7 w-7" />
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Hundreds of templates to get started
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Deploy popular open-source apps in one click with Dokploy
							Templates, a ready-to-run library of pre-configured apps you can
							deploy fast, without rebuilding the same stack from scratch.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link
									href="https://templates.dokploy.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									Browse templates
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Everything you need in a deployment platform */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Everything you need in a deployment platform
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy is the software deployment platform for shipping anything
							from a single service to a full multi-container stack.
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
								<h3 className="text-xl font-semibold">{feature.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Application deployment FAQs
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="mx-auto mt-12 w-full max-w-3xl"
					>
						{faqs.map((faq, index) => (
							<AccordionItem value={`faq-${index}`} key={faq.question}>
								<AccordionTrigger className="text-left text-white">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>
		</div>
	);
}
