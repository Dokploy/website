import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonStats } from "@/components/comparison-stats";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {
	Check,
	X,
	Building2,
	Container as ContainerIcon,
	Archive,
	Gauge,
	Bot,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Dokploy Vs. Render: Self-Hosted Vs. Managed PaaS",
	description:
		"Compare Dokploy vs. Render: infrastructure ownership, Docker Compose support, pricing, and deployment architecture—decide which fits your team.",
};

const featureComparisonRows = [
	{ feature: "Self-hostable on your own VPS or server", dokploy: true, render: false },
	{ feature: "Run on any cloud provider via SSH", dokploy: true, render: false },
	{ feature: "Docker Compose support", dokploy: true, render: false },
	{ feature: "Docker Stack support", dokploy: true, render: false },
	{ feature: "Dockerfile and prebuilt image deploys", dokploy: true, render: true },
	{ feature: "Nixpacks build support", dokploy: true, render: false },
	{ feature: "Heroku Buildpacks support", dokploy: true, render: true },
	{ feature: "Paketo Buildpacks support", dokploy: true, render: false },
	{ feature: "Railpack build support", dokploy: true, render: false },
	{ feature: "Custom build servers", dokploy: true, render: false },
	{ feature: "Named Docker volume backups to S3", dokploy: true, render: false },
	{ feature: "Scheduled database backups to S3 (built-in)", dokploy: true, render: false },
	{ feature: "Preview deployments", dokploy: true, render: true },
	{ feature: "Multi-server deployment", dokploy: true, render: false },
	{ feature: "Docker Swarm clustering", dokploy: true, render: false },
	{ feature: "One-command installation", dokploy: true, render: false },
	{ feature: "Scheduled jobs (cron)", dokploy: true, render: true },
	{ feature: "Background workers", dokploy: true, render: true },
	{ feature: "Built-in monitoring metrics (CPU, RAM, Disk)", dokploy: true, render: false },
	{ feature: "Automated metric alerts", dokploy: true, render: false },
	{ feature: "Metrics enabled by default", dokploy: true, render: false },
	{ feature: "AI-assisted deployments", dokploy: true, render: false },
	{ feature: "MCP server support", dokploy: true, render: true },
	{ feature: "API and CLI automation", dokploy: true, render: true },
	{ feature: "Fine-grained RBAC", dokploy: true, render: false },
	{ feature: "SSO / SAML", dokploy: true, render: true },
	{ feature: "Audit logs", dokploy: true, render: true },
	{ feature: "Predictable per-server platform pricing", dokploy: true, render: false },
	{ feature: "Persistent disk shared across services", dokploy: true, render: false },
];

const whyChooseItems = [
	{
		icon: Building2,
		title: "Own your infrastructure",
		description:
			"Deploy to any VPS, cloud instance, or dedicated server reachable by SSH—Hetzner, DigitalOcean, AWS, or your own hardware. Render runs services on its own infrastructure; Dokploy puts you in control.",
	},
	{
		icon: ContainerIcon,
		title: "Keep your Docker Compose workflow",
		description:
			"Deploy multi-service applications directly from your existing Docker Compose or Docker Stack files. Render has no native Compose support, so teams lose the same architecture they use locally.",
	},
	{
		icon: Archive,
		title: "Back up volumes and databases reliably",
		description:
			"Schedule backups of any named Docker volume, not just managed databases, to S3-compatible storage. Render's persistent disks are tied to a single service instance with no native volume backup export.",
	},
	{
		icon: Gauge,
		title: "Monitor and alert without extra tooling",
		description:
			"Get CPU, memory, and disk metrics out of the box, with automated alerts built in. Render has no native monitoring dashboard or automated alerting—you need a third-party solution.",
	},
	{
		icon: Bot,
		title: "Deploy AI-built apps in governed environments",
		description:
			"Give your team a governed sandbox to ship AI-assisted apps, complete with RBAC, audit logs, SSO, and a path from AI-generated code to a live URL.",
	},
];

const pricingRows = [
	{ label: "Pricing model", dokploy: "Per server", render: "Workspace plan + per-service compute" },
	{
		label: "Entry price",
		dokploy: "Free (open source, self-hosted)",
		render: "$0/month workspace + compute per service",
	},
	{
		label: "Production tier",
		dokploy: "$15/month (Startup, 3 servers)",
		render: "$25/month workspace + compute per service",
	},
	{ label: "Apps per server or plan", dokploy: "Unlimited", render: "No service cap on paid plans" },
	{ label: "Databases", dokploy: "Unlimited per server", render: "Billed separately per instance" },
	{
		label: "Bandwidth",
		dokploy: "Included (your server's allowance)",
		render: "25 GB included on Pro; metered above that",
	},
	{ label: "Infrastructure", dokploy: "Your own servers (any provider)", render: "Render-managed only" },
];

const integrationRows = [
	{
		category: "Git providers",
		dokploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		render: "GitHub, GitLab, Bitbucket",
	},
	{
		category: "Build and deployment systems",
		dokploy:
			"Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks, Railpack",
		render: "Docker (Dockerfile + prebuilt images), Heroku Buildpacks",
	},
	{
		category: "Notifications and communication",
		dokploy:
			"Slack, Telegram, Discord, Lark, Email (SMTP), Resend, Gotify, Ntfy, Pushover, Webhook",
		render: "Slack, Email, Webhook (Pro plan+)",
	},
];

export default function DokployVsRenderPage() {
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
							Dokploy vs. Render
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Choose Dokploy and choose control over your servers, setup, and
							infrastructure bill.
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									Dokploy gives you PaaS-level simplicity on infrastructure you
									own. Deploy apps, Docker Compose stacks, databases, and
									background workers on any VPS or cloud server, with
									predictable pricing and no vendor lock-in.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Render</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									A hosted, fully managed PaaS, Render handles servers,
									networking, and scaling for you, with service types for web
									apps, background workers, cron jobs, and managed databases,
									all billed per service.
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

			{/* Dokploy vs Render at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy vs. Render at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Read our comprehensive Render vs. Dokploy features comparison
							before you make your decision.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-center font-semibold">Render</th>
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
											{row.render ? (
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
												src="/images/dokploy-remote-servers.png"
												alt="Dokploy remote servers showing connected VPS infrastructure"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 1 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-compose-editor.png"
												alt="Dokploy Docker Compose editor with multi-service configuration"
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
												alt="Dokploy monitoring dashboard showing CPU, memory and disk metrics"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-audit-logs.png"
												alt="Dokploy audit logs tracking deployments in governed environments"
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
							Pricing comparison: platform fees vs. per-service compute
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy Cloud charges per server, not per service, so your platform
							cost stays flat as your app count grows. Render charges a workspace
							plan fee plus a separate compute for every service instance, with
							managed databases, storage, and bandwidth each billed on top.
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
									<th className="px-4 py-4 text-left font-semibold">Render</th>
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
											{row.render}
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
									<th className="px-4 py-4 text-left font-semibold">Render</th>
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
											{row.render}
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
