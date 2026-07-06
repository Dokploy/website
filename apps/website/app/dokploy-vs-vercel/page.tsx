import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonStats } from "@/components/comparison-stats";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {
	Check,
	X,
	Container as ContainerLucide,
	Settings,
	HardDrive,
	Gauge,
	Bot,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Dokploy vs. Vercel: Docker-Native vs. Serverless",
	description:
		"Compare Dokploy vs. Vercel: Docker support, runtime limits, persistent storage, pricing, and full-stack infrastructure. Decide which fits your team.",
};

const featureComparisonRows = [
	{ feature: "Self-hostable on your own VPS or server", dokploy: true, vercel: false },
	{ feature: "Run on any cloud provider via SSH", dokploy: true, vercel: false },
	{ feature: "Deploy Docker images and containers", dokploy: true, vercel: false },
	{ feature: "Docker Compose support", dokploy: true, vercel: false },
	{ feature: "Docker Stack support", dokploy: true, vercel: false },
	{ feature: "Persistent filesystem (Docker volumes)", dokploy: true, vercel: false },
	{ feature: "Persistent disk shared across services", dokploy: true, vercel: false },
	{ feature: "Named Docker volume backups to S3", dokploy: true, vercel: false },
	{ feature: "One-click scheduled database backups to S3", dokploy: true, vercel: false },
	{ feature: "Long-running processes and background workers", dokploy: true, vercel: false },
	{
		feature: "WebSocket connections without function duration limits",
		dokploy: true,
		vercel: false,
	},
	{ feature: "Unlimited function duration", dokploy: true, vercel: false },
	{ feature: "Custom build servers", dokploy: true, vercel: false },
	{ feature: "Nixpacks build support", dokploy: true, vercel: false },
	{ feature: "Heroku Buildpacks support", dokploy: true, vercel: false },
	{ feature: "Preview deployments", dokploy: true, vercel: true },
	{ feature: "Multi-server deployment", dokploy: true, vercel: false },
	{ feature: "Docker Swarm clustering", dokploy: true, vercel: false },
	{ feature: "One-command installation", dokploy: true, vercel: false },
	{ feature: "Scheduled jobs (cron)", dokploy: true, vercel: true },
	{ feature: "Built-in monitoring metrics (CPU, RAM, Disk)", dokploy: true, vercel: false },
	{ feature: "Automated metric alerts built in", dokploy: true, vercel: true },
	{ feature: "AI-assisted deployments", dokploy: true, vercel: true },
	{ feature: "MCP server support", dokploy: true, vercel: true },
	{ feature: "API and CLI automation", dokploy: true, vercel: true },
	{ feature: "Fine-grained RBAC", dokploy: true, vercel: false },
	{ feature: "SSO / SAML", dokploy: true, vercel: true },
	{ feature: "Audit logs", dokploy: true, vercel: true },
	{ feature: "Predictable per-server platform pricing", dokploy: true, vercel: false },
	{ feature: "No per-seat billing", dokploy: true, vercel: false },
];

const whyChooseItems = [
	{
		icon: ContainerLucide,
		title: "Deploy apps with Docker, Compose, and Stack",
		description:
			"Dokploy supports Docker, Docker Compose, and Docker Stack, so your containers run exactly as they do locally—no rewriting for a serverless model. Vercel does not support deploying Docker images or running Docker containers.",
	},
	{
		icon: Settings,
		title: "Run services without runtime limits",
		description:
			"Dokploy runs apps as containers on servers you control, with no platform-imposed timeouts. Vercel Functions have duration, memory, and payload caps that rule out long-running processes, persistent connections, and media pipelines.",
	},
	{
		icon: HardDrive,
		title: "Keep persistent data on your own servers",
		description:
			"Dokploy supports persistent Docker volumes with scheduled S3 backups, making it a stronger fit for stateful apps, SQLite-backed tools, and self-hosted services that need durable local storage. Vercel's filesystem is read-only outside a small scratch space.",
	},
	{
		icon: Gauge,
		title: "Monitor and alert without extra tooling",
		description:
			"Get CPU, memory, and disk metrics out of the box, with automated alerts built in. Vercel offers observability for function invocations and edge requests, but not server-level infrastructure metrics.",
	},
	{
		icon: Bot,
		title: "Deploy AI-built apps in governed environments",
		description:
			"Give your team a governed sandbox to ship AI-assisted apps, complete with RBAC, audit logs, SSO, and a path from AI-generated code to a live URL.",
	},
];

const pricingRows = [
	{ label: "Pricing model", dokploy: "Per server", vercel: "Per seat + metered usage" },
	{
		label: "Entry price",
		dokploy: "Free (open source, self-hosted)",
		vercel: "Free (Hobby, non-commercial only)",
	},
	{
		label: "Production tier",
		dokploy: "$15/month (Startup, 3 servers)",
		vercel: "$20/month per deploying seat",
	},
	{ label: "Apps per plan", dokploy: "Unlimited", vercel: "Unlimited on Pro" },
	{ label: "Databases", dokploy: "Unlimited per server", vercel: "Not included – third-party add-ons" },
	{
		label: "Bandwidth",
		dokploy: "Included (your server's allowance)",
		vercel: "1 TB included on Pro; metered above that",
	},
	{ label: "Infrastructure", dokploy: "Your own servers (any provider)", vercel: "Vercel-managed only" },
];

const integrationRows = [
	{
		category: "Git providers",
		dokploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		vercel: "GitHub, GitLab, Bitbucket, Azure DevOps",
	},
	{
		category: "Build and deployment systems",
		dokploy:
			"Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks, Railpack",
		vercel: "Vercel framework detection (35+ frameworks), Vercel CLI",
	},
	{
		category: "Notifications and communication",
		dokploy:
			"Slack, Telegram, Discord, Lark, Email (SMTP), Resend, Gotify, Ntfy, Pushover, Webhook",
		vercel: "Slack, Email, Webhook",
	},
];

export default function DokployVsVercelPage() {
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
							Dokploy vs. Vercel
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Learn why so many teams are choosing Dokploy as their application
							deployment tool over Vercel.
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									Dokploy is built for full-stack, Docker-native deployment on
									infrastructure you own. Choose Vercel if your app is
									primarily frontend or serverless and you want a managed
									platform optimized for that model.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Vercel</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For frontend and serverless-first teams that want a managed
									platform with a global edge network, zero-config framework
									support, and instant preview deployments—without managing
									infrastructure.
								</p>
							</div>
						</div>

						<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
									rel="noopener noreferrer"
								>
									Register now
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href="/contact">Talk to sales</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Dokploy vs Vercel at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy vs. Vercel at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Read our comprehensive Vercel vs. Dokploy features comparison
							before you make your decision.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-center font-semibold">Vercel</th>
								</tr>
							</thead>
							<tbody>
								{featureComparisonRows.map((row) => (
									<tr
										key={row.feature}
										className="border-b border-border/50 hover:bg-muted/30"
									>
										<td className="px-4 py-3 text-sm">{row.feature}</td>
										<td className="px-4 py-3 text-center">
											{row.dokploy ? (
												<Check className="mx-auto h-5 w-5 text-green-500" />
											) : (
												<X className="mx-auto h-5 w-5 text-muted-foreground/50" />
											)}
										</td>
										<td className="px-4 py-3 text-center">
											{row.vercel ? (
												<Check className="mx-auto h-5 w-5 text-green-500" />
											) : (
												<X className="mx-auto h-5 w-5 text-muted-foreground/50" />
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why you should choose Dokploy */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why you should choose Dokploy
						</h2>
					</div>

					<div className="mx-auto mt-16 max-w-6xl space-y-20">
						{whyChooseItems.map((item, index) => (
							<div
								key={item.title}
								className={`flex flex-col gap-8 md:flex-row md:items-center ${
									index % 2 === 1 ? "md:flex-row-reverse" : ""
								}`}
							>
								<div className="flex-1">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
										<item.icon className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-semibold text-white">
										{item.title}
									</h3>
									<p className="mt-3 text-muted-foreground">{item.description}</p>
								</div>
								<div className="flex-1">
									{index === 0 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-deployment-log.png"
												alt="Dokploy deployment panel showing build and deployment logs"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 1 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-provider-settings.png"
												alt="Dokploy deploy settings showing server and provider configuration"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 2 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-create-backup.png"
												alt="Dokploy Create Backup modal for database and volume backups"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 3 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-monitoring-dashboard.png"
												alt="Dokploy monitoring dashboard showing CPU, memory, disk and I/O metrics"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-projects-dashboard.png"
												alt="Dokploy projects dashboard showing AI app deployments"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Pricing comparison */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Pricing comparison: per-server vs. per-seat and per-function
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy Cloud charges per server, not per seat or per function, so
							your platform cost stays flat as your team and app count grow.
							Vercel charges $20 per deploying team member per month, plus
							metered usage across bandwidth, function invocations, active CPU
							time, and edge requests. For backend-heavy or multi-developer
							teams, costs can accrue quickly.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold" />
									<th className="px-4 py-4 text-left font-semibold">
										Dokploy Cloud
									</th>
									<th className="px-4 py-4 text-left font-semibold">Vercel</th>
								</tr>
							</thead>
							<tbody>
								{pricingRows.map((row) => (
									<tr key={row.label} className="border-b border-border/50">
										<td className="px-4 py-3 font-medium">{row.label}</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.dokploy}
										</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.vercel}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Dokploy integrates with the leading solutions */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Dokploy integrates with the leading solutions
						</h2>
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Category</th>
									<th className="px-4 py-4 text-left font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-left font-semibold">Vercel</th>
								</tr>
							</thead>
							<tbody>
								{integrationRows.map((row) => (
									<tr key={row.category} className="border-b border-border/50">
										<td className="px-4 py-3 font-medium">{row.category}</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.dokploy}
										</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.vercel}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Thousands have chosen Dokploy - Stats */}
			<ComparisonStats />

			{/* Testimonials */}
			<Testimonials />

			{/* Final CTA */}
			<CallToAction />
		</div>
	);
}
