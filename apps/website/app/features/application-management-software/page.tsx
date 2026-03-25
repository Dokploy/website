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
	Activity,
	FileText,
	RotateCcw,
	Clock,
	Eye,
	Settings2,
	Server,
	Cloud,
	Cpu,
	Network,
	Terminal,
	HardDrive,
	Lock,
	CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Application Management Software and Solutions",
	description:
		"Monitor, control, and maintain your business applications from a single dashboard with Dokploy's application management software.",
};

const coreFeatures = [
	{
		icon: Activity,
		title: "Real-time monitoring",
		description:
			"Track CPU, memory, disk, and network usage for every application in your portfolio. Catch performance issues before they affect users and make informed decisions based on live data, not guesswork.",
	},
	{
		icon: FileText,
		title: "Centralized logs",
		description:
			"Access real-time logs from any running application directly in the dashboard. When something breaks, you know exactly where to look.",
	},
	{
		icon: RotateCcw,
		title: "Rollback in seconds",
		description:
			"Recover fast when a release goes wrong. Dokploy supports Docker Swarm automatic rollback when health checks fail, as well as registry-based rollback to any previous deployment version when a Docker registry is configured.",
	},
	{
		icon: Clock,
		title: "Full deployment history",
		description:
			"View the last ten deployments for any application. Connect incidents to specific releases and resolve them faster, without sifting through unrelated logs.",
	},
	{
		icon: Eye,
		title: "Preview deployments",
		description:
			"Test application changes in isolated environments before they reach production. When configured, pull requests to your target branch trigger isolated preview builds automatically, so your team can validate functionality before merging.",
	},
	{
		icon: Settings2,
		title: "Environment variable management",
		description:
			"Manage shared and service-level environment variables across every application. Reduce configuration drift and keep sensitive data out of your codebase.",
	},
];

const standardizationChecks = [
	"Consistent deployment workflows across all applications",
	"Shared and service-level environment variable management",
	"Rollback capabilities built into every release",
	"Deployment history tied to specific releases",
];

const applicationStatuses = [
	{ name: "App-api", status: "Running" },
	{ name: "App-frontend", status: "Running" },
	{ name: "App-worker", status: "Deploying" },
	{ name: "App-scheduler", status: "Running" },
	{ name: "App-admin", status: "Rolled back" },
];

const controlFeatures = [
	{
		icon: Cpu,
		title: "Resource controls",
		description:
			"Set CPU and memory limits per application to optimize performance and keep resource usage predictable as your application landscape grows.",
	},
	{
		icon: Network,
		title: "Cluster and scaling settings",
		description:
			"Configure replica counts and Docker Swarm settings to scale business applications across nodes without reworking your infrastructure.",
	},
	{
		icon: Terminal,
		title: "Custom run commands",
		description:
			"Execute shell commands directly inside any container for advanced management, debugging, or operational tasks that fall outside standard workflows.",
	},
	{
		icon: HardDrive,
		title: "Volume and storage management",
		description:
			"Set up persistent storage volumes so application data survives restarts and redeployments. Support for bind mounts, volume mounts, and file mounts is built in.",
	},
	{
		icon: Lock,
		title: "Access and security controls",
		description:
			"Add basic authentication to any application and configure port exposure with precision. Keep internal systems locked down while making the right surfaces accessible.",
	},
	{
		icon: Clock,
		title: "Scheduled jobs",
		description:
			"Run cron jobs to automate recurring tasks across your application portfolio, from data workflows to maintenance scripts, without adding external tooling.",
	},
];

const selfHostedItems = [
	"Full data sovereignty over sensitive data",
	"No third-party dependencies",
	"Fits hybrid environments and on-premise infrastructure",
	"Supports digital transformation at your pace",
];

const cloudItems = [
	"Managed infrastructure, zero maintenance overhead",
	"Rapid setup for new business units and teams",
	"Scale application usage without provisioning servers",
	"Ideal for cloud migration and modernization initiatives",
];

const faqs = [
	{
		question: "What is application performance management software?",
		answer:
			"Application performance management software helps IT teams monitor application health, track resource usage, and identify performance issues before they affect users. Key features typically include real-time monitoring of CPU, memory, disk, and network usage, alongside log access and alerting. Dokploy covers the operational side of application performance management: giving teams live usage data, deployment history, and rollback capabilities from a single dashboard, without requiring specialist expertise or separate tooling.",
	},
	{
		question: "What is the best application management software?",
		answer:
			"The best application management software depends on your business needs, team size, and technical expertise. Enterprise platforms often come with deep integration capabilities and reporting features, but they can require significant investment and a steeper learning curve. Dokploy is built for teams that want operational efficiency without that overhead. It covers the key processes of application management, including monitoring, rollbacks, environment configuration, and scheduled jobs, in a platform you can self-host or run in the cloud so that your IT team can run on your own infrastructure if they want. It\u2019s a strong fit for organizations that want to manage business applications with full control and without vendor lock-in.",
	},
	{
		question: "What is application lifecycle management software?",
		answer:
			"Application lifecycle management (ALM) software supports the full lifecycle of a software application, from requirements and development through deployment, ongoing maintenance, and eventual retirement. It connects strategic planning and business objectives with day-to-day operational execution. Dokploy focuses on the operational slice of that lifecycle\u2014standardizing how applications are deployed, monitored, rolled back, and maintained\u2014which is where most teams experience the most friction. For organizations going through digital transformation or modernization initiatives, having that operational foundation in place is what makes broader lifecycle management sustainable.",
	},
];

export default function ApplicationManagementSoftwarePage() {
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
							Application Management Software That Works
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Monitor, control, and maintain your business applications from a
							single dashboard. Dokploy gives your IT team the visibility and
							tools to keep every application running at peak
							performance&mdash;without the complexity.
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
									Read our docs
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Visibility across every application */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Visibility across every application as you scale
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Bring your entire application landscape into one place with
							Dokploy. Get a clear view of application health, resource usage,
							and deployment history.
						</p>
					</div>
				</Container>
			</section>

			{/* Everything your team needs in one platform */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Everything your team needs in one platform
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Improving visibility into your application portfolio is the first
							step toward better application management. Dokploy surfaces the
							signals your IT team needs, in real time, in one place.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{coreFeatures.map((feature) => (
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

			{/* Standardize your management process */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:gap-16">
						<div>
							<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
								Standardize your management process
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Maintain consistent environments and standardized release
								processes to keep operational efficiency at peak levels. When
								every application is managed together, your IT team maintains
								shared standards instead of tribal knowledge.
							</p>
							<p className="mt-4 text-sm text-muted-foreground">
								Dokploy gives teams a consistent application management system
								for deployments, environment configuration, and rollback
								workflows, so reliability doesn&apos;t depend on who happens to
								be on call.
							</p>
							<ul className="mt-8 space-y-3">
								{standardizationChecks.map((item) => (
									<li key={item} className="flex items-start gap-3">
										<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
										<span className="text-sm text-muted-foreground">
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
						<div className="mt-10 lg:mt-0">
							<div className="rounded-xl border border-border/50 bg-card p-6">
								<div className="space-y-3">
									{applicationStatuses.map((app) => (
										<div
											key={app.name}
											className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-4 py-3"
										>
											<span className="text-sm font-medium">{app.name}</span>
											<span
												className={`text-xs font-medium ${
													app.status === "Running"
														? "text-green-500"
														: app.status === "Deploying"
															? "text-yellow-500"
															: "text-orange-500"
												}`}
											>
												{app.status}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Full control over your application portfolio */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Full control over your application portfolio
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Manage business applications at the level your business goals
							require, from resource allocation and scaling to security controls
							and workflow automation.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{controlFeatures.map((feature) => (
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

			{/* Run Dokploy where your business needs it */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Run Dokploy where your business needs it
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Deploy Dokploy on your own infrastructure or ours. Both options
							give you the same application management capabilities, and you
							choose what fits your operational model and regulatory compliance
							requirements.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-8">
							<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<Server className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Self-hosted</h3>
							<ul className="mt-4 space-y-2">
								{selfHostedItems.map((item) => (
									<li
										key={item}
										className="flex items-center gap-2 text-sm text-muted-foreground"
									>
										<CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
										{item}
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-border/50 bg-card p-8">
							<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
								<Cloud className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Dokploy Cloud</h3>
							<ul className="mt-4 space-y-2">
								{cloudItems.map((item) => (
									<li
										key={item}
										className="flex items-center gap-2 text-sm text-muted-foreground"
									>
										<CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* Take control of your application landscape */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Take control of your application landscape
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy gives your IT team the application management software it
							needs to monitor, maintain, and scale business applications with
							confidence. Create your account and get started in minutes.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link href="https://app.dokploy.com">Create your account</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Application management software FAQs
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
