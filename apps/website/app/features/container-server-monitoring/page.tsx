import { Container } from "@/components/Container";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Cpu,
	MemoryStick,
	HardDrive,
	Network,
	Bell,
	Settings,
	Server,
	Shield,
	Database,
	LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Server & Container Monitoring | Network, CPU, Memory Monitoring Tool",
	description:
		"Keep systems running with server and container monitoring: real-time network monitoring, memory monitoring, and CPU monitoring, as well as alerts.",
};

const monitoringFeatures = [
	{
		icon: Cpu,
		title: "CPU monitoring",
		description:
			"Spot CPU saturation early so you can scale, tune, or fix hot paths before performance drops.",
	},
	{
		icon: MemoryStick,
		title: "Memory monitoring",
		description:
			"Prevent out-of-memory crashes by watching RAM pressure and acting before the system starts killing processes.",
	},
	{
		icon: HardDrive,
		title: "Disk space monitoring",
		description:
			"Avoid failed writes and broken deployments by recognizing low disk space before your used storage space hits 100%.",
	},
	{
		icon: Network,
		title: "Network monitoring",
		description:
			"Detect bandwidth congestion or unexpected traffic spikes early to prevent slowdowns and outages before they impact your services.",
	},
];

const alertFeatures = [
	{
		icon: Bell,
		title: "Threshold-based alerts",
		description:
			"Set the CPU or memory usage percentage limit that you want to trigger an alert.",
	},
	{
		icon: LayoutDashboard,
		title: "Notifications on your platforms",
		description:
			"Receive notifications on the communication platforms you use.",
	},
	{
		icon: Settings,
		title: "Easy alert management",
		description:
			"Disable alerts by just setting your limits to zero.",
	},
];

const configFeatures = [
	{
		icon: Settings,
		title: "Set your refresh rates",
		description:
			"Determine how frequently server and container metrics are collected—the default is every 20 seconds.",
	},
	{
		icon: Database,
		title: "Manage how long data is stored",
		description:
			"Decide on your retention period and an automated cron job will clean old metrics. Choose which port the Dokploy metrics server listens on—the default is 4500.",
	},
	{
		icon: Server,
		title: "Include or exclude specific services",
		description:
			"Choose the services you want to monitor, whether that's all services, specific compose services, applications, or something else.",
	},
	{
		icon: Shield,
		title: "Secure your data with a token",
		description:
			"Secure metrics access with an authentication token. Use the auto-generated metrics token or generate a new one.",
	},
];

const relatedFeatures = [
	{
		icon: Server,
		title: "Application Deployment",
		description:
			"Deploy applications with zero downtime to any server you control.",
		href: "/features/application-deployment-platform",
	},
	{
		icon: Database,
		title: "Database Management",
		description:
			"Provision, manage, and back up databases without leaving Dokploy.",
		href: "/features/database-management-tool",
	},
	{
		icon: Shield,
		title: "RBAC",
		description:
			"Control who can access monitoring dashboards and alerts with fine-grained role-based access control.",
		href: "/features/role-based-access-control",
	},
];

const faqs = [
	{
		question: "What are the benefits of container monitoring?",
		answer:
			"Effective container monitoring gives you end-to-end visibility across multiple containers and containerized applications—something that's hard to achieve with conventional monitoring built for static hosts. It helps you correlate logs and metrics to spot abnormal container behavior, reduce error rates, and pinpoint root causes when container issues like restarts or a container shutdown event occur. Container monitoring also supports cost optimization by showing real resource consumption, improving resource allocation, and right-sizing resource limits to control monitoring costs and infrastructure spend.",
	},
	{
		question: "What is container monitoring software?",
		answer:
			"Container monitoring software automatically discovers running containers, collects container data from the container runtime and other data sources, and turns it into dashboards, alerts, and observability data. In cloud-native environments, it typically unifies collected metrics, log data, and sometimes traces into a single-pane view so you can monitor Docker containers and Kubernetes workloads side-by-side.",
	},
	{
		question: "How does container monitoring work?",
		answer:
			"Most container monitoring tools run an agent or exporter that can collect data from individual containers and nodes, capturing performance metrics like CPU usage, memory usage, network, and events such as container restarts. They ingest container logs and other telemetry, store it as historical data, and let you view data in charts and alerts while you correlate metrics and events across services.",
	},
	{
		question: "What is the best server monitoring software?",
		answer:
			"The best server monitoring software depends on what you need to monitor and whether you want open-source control or a managed SaaS. If you're using Dokploy, you get real-time server monitoring as part of your solution on all plans—with no additional setup required once your server is deployed.",
	},
];

export default function ContainerServerMonitoringPage() {
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
							Real-Time Container Monitoring and Alerts
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Monitor your server, CPU, memory, and network usage in real-time
							across all your deployments for full visibility.
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

			{/* Ensure continuous operation */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Ensure continuous operation with monitoring
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Prevent disruption by setting up a monitoring dashboard and custom
							alerts.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{monitoringFeatures.map((feature) => (
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

			{/* Configure alerts */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Configure alerts so you never miss an issue
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Set thresholds, receive notifications where you work, and stay in
							control of your infrastructure at all times.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{alertFeatures.map((feature) => (
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
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* No setup required */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Access server monitoring with no setup required
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Use Dokploy&apos;s container monitoring dashboard as soon as
							you&apos;ve completed the server deployment setup.
						</p>
					</div>
					<div className="mx-auto mt-12 max-w-xl rounded-xl border border-border/50 bg-card p-8 text-center">
						<p className="font-mono text-sm text-muted-foreground">
							Remote servers → Select your server → Setup Server
						</p>
						<p className="mt-4 text-sm text-muted-foreground">
							If all your checkmarks are green, you&apos;re good to go!
						</p>
					</div>
				</Container>
			</section>

			{/* Deployment options */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Host Dokploy where your business needs it
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Choose a deployment option that suits your business&mdash;on your
							infrastructure or ours.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<h3 className="text-xl font-semibold text-white">
								On-Premise Deployment
							</h3>
							<ul className="mt-4 space-y-2 text-sm text-muted-foreground">
								<li>Complete data sovereignty</li>
								<li>Maximum security control</li>
								<li>Compliance with strict regulations</li>
								<li>No external dependencies</li>
							</ul>
						</div>
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<h3 className="text-xl font-semibold text-white">
								Cloud Deployment
							</h3>
							<ul className="mt-4 space-y-2 text-sm text-muted-foreground">
								<li>Rapid scaling capabilities</li>
								<li>Reduced infrastructure overhead</li>
								<li>Global availability</li>
								<li>Managed infrastructure</li>
							</ul>
						</div>
					</div>
				</Container>
			</section>

			{/* Configuration options */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Multiple configuration options
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Set up your Dokploy dashboard to suit your needs with different
							configuration options.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{configFeatures.map((feature) => (
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
							Container and server monitoring FAQs
						</h2>
					</div>
					<div className="mx-auto mt-16 max-w-3xl space-y-8">
						{faqs.map((faq) => (
							<div
								key={faq.question}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<h3 className="text-lg font-semibold text-white">
									{faq.question}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Related Features */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Container and Server monitoring tool
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Take advantage of Dokploy&apos;s comprehensive container and server
							monitoring software alongside the rest of the platform.
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
								<h3 className="text-lg font-semibold">{feature.title}</h3>
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
							Ready to keep your systems running?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Get real-time visibility into your servers and containers with
							Dokploy&apos;s built-in monitoring.
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
		</div>
	);
}
