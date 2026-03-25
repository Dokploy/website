import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonStats } from "@/components/comparison-stats";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Check, X, Zap, Globe, Bell, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Dokploy vs. Portainer Comparison | Dokploy",
	description:
		"Comparing Dokploy vs. Portainer? See how these self-hosted or cloud container tools stack up on deployment, reverse proxy, multi-server support, and more.",
};

type FeatureValue = boolean | "limited";

interface FeatureRow {
	feature: string;
	dokploy: FeatureValue;
	portainer: FeatureValue;
	section?: string;
}

const featureComparisonRows: FeatureRow[] = [
	// Setup & Installation
	{ feature: "One-command installation", dokploy: true, portainer: true, section: "Setup & Installation" },
	{ feature: "Installation feedback and progress logs", dokploy: true, portainer: false },
	{ feature: "Works with firewall and Tailscale out of the box", dokploy: true, portainer: false },
	{ feature: "Lightweight CPU usage while idle", dokploy: true, portainer: true },
	// Deployment
	{ feature: "Deploy web apps from git repos (GitHub, GitLab, Bitbucket)", dokploy: true, portainer: "limited", section: "Deployment" },
	{ feature: "Auto-deploy on git push", dokploy: true, portainer: "limited" },
	{ feature: "Docker Compose support", dokploy: true, portainer: true },
	{ feature: "Deploy from custom Docker images", dokploy: true, portainer: true },
	{ feature: "Nixpacks and Heroku Buildpack support", dokploy: true, portainer: false },
	{ feature: "Preview deployments (review apps)", dokploy: true, portainer: false },
	{ feature: "One-click open source templates", dokploy: true, portainer: true },
	// Networking & Domains
	{ feature: "Built-in reverse proxy (Traefik)", dokploy: true, portainer: false, section: "Networking & Domains" },
	{ feature: "Automatic SSL / encrypt cert via Let's Encrypt", dokploy: true, portainer: false },
	{ feature: "Custom domain management", dokploy: true, portainer: false },
	// Infrastructure
	{ feature: "Multi-server support", dokploy: true, portainer: true, section: "Infrastructure" },
	{ feature: "Docker Swarm clustering", dokploy: true, portainer: true },
	{ feature: "Kubernetes support", dokploy: false, portainer: true },
	// Configuration & Services
	{ feature: "Real-time monitoring (CPU, RAM, disk)", dokploy: true, portainer: "limited", section: "Configuration & Services" },
	{ feature: "Metrics enabled by default", dokploy: true, portainer: false },
	{ feature: "Automated alerts from metrics", dokploy: true, portainer: false },
	{ feature: "Application and container log viewer", dokploy: true, portainer: true },
	// Teams & Access
	{ feature: "Teams and multi-user support", dokploy: true, portainer: true, section: "Teams & Access" },
	{ feature: "Role-based access control (RBAC)", dokploy: true, portainer: true },
	{ feature: "Projects grouping", dokploy: true, portainer: false },
	{ feature: "API and CLI access", dokploy: true, portainer: true },
	{ feature: "AI-assisted deployments", dokploy: true, portainer: false },
	{ feature: "Free community edition", dokploy: true, portainer: true },
	{ feature: "Full-featured without a paid plan", dokploy: true, portainer: false },
];

const whyChooseItems = [
	{
		icon: Zap,
		title: "Deploy web services end-to-end, don't just manage containers",
		description:
			"Dokploy is a full deployment platform. Connect your git repos, and it handles the rest: building code, running it in containers, routing traffic through its built-in reverse proxy, and issuing SSL certificates automatically. Whether you're deploying web apps with Docker Compose files or spinning up databases on a cheap VPS, there's no bash script to maintain and no separate proxy to configure.",
		image: {
			src: "/images/dokploy-deployment-log.png",
			alt: "Dokploy deployment panel showing build and deployment logs",
		},
	},
	{
		icon: Globe,
		title: "Get built-in networking without extra tools",
		description:
			"Dokploy offers SSL, built-in reverse proxy, and managed domains and cert issuance encryption. It ships with Traefik integrated, so assigning a domain to a service and getting a valid HTTPS certificate is a few clicks in the UI. You can also manage Traefik config directly via the file editor if you need more control.",
		image: {
			src: "/images/dokploy-provider-settings.png",
			alt: "Dokploy deploy settings with provider and domain configuration",
		},
	},
	{
		icon: Bell,
		title: "Monitor, back up, and alert from one dashboard",
		description:
			"Dokploy has real-time CPU, memory, and disk metrics enabled by default, automated alerts, and scheduled S3-compatible database and volume backups built in. There's less to install, less to maintain, and less to go wrong. Troubleshooting is also simpler: logs, metrics, and alerts all live in the same UI.",
		image: {
			src: "/images/dokploy-monitoring-dashboard.png",
			alt: "Dokploy monitoring dashboard showing CPU, memory, disk and I/O metrics",
		},
	},
	{
		icon: Users,
		title: "Switch to a more flexible workflow as your project grows",
		description:
			"Dokploy's open source version is genuinely full-featured for solo developers, startups, teams, and large enterprises alike. You can manage multi-server deployments, organize services into projects, control user permissions, and deploy across multiple environments—only upgrading as you grow. Whether you're a student running a side project or an agency managing client instances, the same tool scales with you.",
		image: {
			src: "/images/dokploy-projects-dashboard.png",
			alt: "Dokploy projects dashboard with services grid and environment selector",
		},
	},
];

const integrationRows = [
	{
		category: "Git providers",
		dokploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		portainer: "Git Generic (any URL with credentials)",
	},
	{
		category: "Build and deployment systems",
		dokploy: "Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks, Railpack",
		portainer: "Docker, Docker Compose",
	},
	{
		category: "Notifications and communication",
		dokploy: "Slack, Telegram, Discord, Lark, Email (SMTP), Resend, Gotify, Ntfy, Pushover, Webhook",
		portainer: "Slack, Microsoft Teams, Email (SMTP), Webhook",
	},
];

function FeatureCell({ value }: { value: FeatureValue }) {
	if (value === true) return <Check className="mx-auto h-5 w-5 text-green-500" />;
	if (value === "limited") return <span className="text-xs text-amber-500">Limited</span>;
	return <X className="mx-auto h-5 w-5 text-muted-foreground/50" />;
}

export default function DokployVsPortainerPage() {
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
							Dokploy vs. Portainer
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Both tools help you manage containers on your own server. But they
							solve very different problems—here's what that means for your setup.
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For scaling teams that want to self-host web apps and databases
									with a polished UI, automated deployments from git repos,
									multi-server support, a built-in reverse proxy, and SSL.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Portainer</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For enterprises that already run Kubernetes and want a GUI to
									manage containers, images, and stacks. A practical choice for
									ops-focused users who need visibility into existing
									infrastructure.
								</p>
							</div>
						</div>

						<Button className="mt-10 rounded-full" asChild>
							<Link
								href="https://app.dokploy.com/register"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get started with Dokploy
							</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Dokploy vs Portainer at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy vs. Portainer at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Read our comprehensive Dokploy vs. Portainer comparison before you
							make your decision.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-center font-semibold">Portainer</th>
								</tr>
							</thead>
							<tbody>
								{featureComparisonRows.map((row) => (
									<>
										{row.section && (
											<tr key={`section-${row.section}`} className="border-b border-border bg-muted/20">
												<td
													colSpan={3}
													className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
												>
													{row.section}
												</td>
											</tr>
										)}
										<tr
											key={row.feature}
											className="border-b border-border/50 hover:bg-muted/30"
										>
											<td className="px-4 py-3 text-sm">{row.feature}</td>
											<td className="px-4 py-3 text-center">
												<FeatureCell value={row.dokploy} />
											</td>
											<td className="px-4 py-3 text-center">
												<FeatureCell value={row.portainer} />
											</td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why you should go with Dokploy */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why you should go with Dokploy
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
									<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
										<Image
											src={item.image.src}
											alt={item.image.alt}
											fill
											className="object-cover object-top"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Dokploy integrates with the leading solutions */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy integrates with the leading solutions
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							When it comes to a Dokploy vs. Portainer comparison, you want the
							container management solution that syncs with the tools in your
							workflow.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Category</th>
									<th className="px-4 py-4 text-left font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-left font-semibold">Portainer</th>
								</tr>
							</thead>
							<tbody>
								{integrationRows.map((row) => (
									<tr
										key={row.category}
										className="border-b border-border/50"
									>
										<td className="px-4 py-3 font-medium">{row.category}</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.dokploy}
										</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.portainer}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why Dokploy is perfect for teams */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why Dokploy is perfect for teams of any size
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Whether you're a startup founder deploying your first web app on a
							cheap VPS or a growing team managing multiple services across
							servers, Dokploy's flexible, polished platform makes self-hosting
							accessible to everyone—from beginners and non-technical users who've
							never touched a bash script to engineers who want full control over
							their config, containers, and workflow.
						</p>
					</div>
				</Container>
			</section>

			{/* Stats */}
			<ComparisonStats />

			{/* Testimonials */}
			<Testimonials />

			{/* Final CTA */}
			<CallToAction />
		</div>
	);
}
