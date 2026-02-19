import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonStats } from "@/components/comparison-stats";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Check, X, Zap, Cpu, Plug, LayoutDashboard, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Dokploy Vs. Coolify Comparison",
	description:
		"Dokploy vs. Coolify at a glance: How to choose the right self-hosted open deployment option for your applications.",
};

const featureComparisonRows = [
	{ feature: "One-command installation", dokploy: true, coolify: true },
	{ feature: "Installation feedback and progress logs", dokploy: true, coolify: true },
	{ feature: "Works with firewall and TailScale out of the box", dokploy: true, coolify: false },
	{ feature: "Lightweight CPU usage while idle", dokploy: true, coolify: false },
	{ feature: "Low memory usage", dokploy: true, coolify: true },
	{ feature: "Teams and organizations support", dokploy: true, coolify: true },
	{ feature: "Projects grouping", dokploy: true, coolify: true },
	{ feature: "Consistent, responsive UI", dokploy: true, coolify: false },
	{ feature: "Built with Next.js / TypeScript", dokploy: true, coolify: false },
	{ feature: "AI-assisted deployments", dokploy: true, coolify: false },
	{ feature: "Deploy from custom Docker images", dokploy: true, coolify: true },
	{ feature: "Database deployment (Postgres, MySQL, Redis, etc.)", dokploy: true, coolify: true },
	{ feature: "Scheduled database backups (S3)", dokploy: true, coolify: true },
	{ feature: "Back up arbitrary Docker volumes, not just databases", dokploy: true, coolify: false },
	{ feature: "Preview deployments (review apps)", dokploy: true, coolify: true },
	{ feature: "API and CLI tools for automation", dokploy: true, coolify: true },
	{ feature: "Multi-server deployment", dokploy: true, coolify: true },
	{ feature: "Docker Swarm clustering", dokploy: true, coolify: "limited" },
	{ feature: "Cron jobs inside containers", dokploy: true, coolify: true },
	{ feature: "Cron jobs on your host machine", dokploy: true, coolify: false },
	{ feature: "Monitoring metrics (CPU, RAM, Disk)", dokploy: true, coolify: "limited" },
	{ feature: "Metrics enabled by default", dokploy: true, coolify: false },
	{ feature: "Automated alerts from metrics", dokploy: true, coolify: false },
];

const whyChooseItems = [
	{
		icon: Zap,
		title: "Benefit from a fast, reliable setup",
		description:
			"Use a single command to deploy with Dokploy, which works seamlessly across firewalls, TailScale, and secure environments. Launch applications faster with Dokploy's optimized build system.",
	},
	{
		icon: Cpu,
		title: "Do more with less",
		description:
			"Keep your VPS fast and responsive with Dokploy's lightweight architecture, which uses minimal CPU and memory, even while idle. Automate builds, alerts, and scaling events effortlessly.",
	},
	{
		icon: Plug,
		title: "Integrate with your favorite platforms",
		description:
			"Connect Dokploy to GitHub, GitLab, and Bitbucket. Dokploy supports Docker, Compose, Nixpacks, and Buildpacks, and even lets you add APIs and use CLI automation.",
	},
	{
		icon: LayoutDashboard,
		title: "Experience an intuitive, polished UX",
		description:
			"Enjoy a clean, consistent UI in the cloud, powered by Next.js and TypeScript. Dokploy is the modern deployment dashboard, optimized for productivity and clarity, with smooth navigation and predictable save behavior.",
	},
	{
		icon: Bell,
		title: "Know what's happening before it's a problem",
		description:
			"Built-in metrics, automated alerting, and volume backups make Dokploy ideal for serious deployments. Monitor CPU, memory, and disk usage, automate notifications, and keep data safe with S3-compatible backups.",
	},
];

const integrationRows = [
	{
		category: "Git providers",
		dokploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		coolify: "GitHub, Git Generic",
	},
	{
		category: "Build and deployment systems",
		dokploy: "Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks, Railpack",
		coolify: "Docker, Docker Compose, Nixpacks",
	},
	{
		category: "Notifications and communication",
		dokploy: "Slack, Telegram, Discord, Lark, Email (SMTP), Resend, Gotify, Ntfy, Pushover, Webhook",
		coolify: "Slack, Discord, Telegram, Email (SMTP), Pushover, Resend, Teams",
	},
];

export default function DokployVsCoolifyPage() {
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
							Dokploy vs. Coolify
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							If you're looking for a self-hosted, open deployment solution that
							lets you run applications on your own VPS or hardware, Dokploy and
							Coolify are the two leading options. But which should you choose?
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For a polished, intuitive, open deployment solution with
									powerful automation, AI, monitoring and integration features –
									designed for developers who want control without complexity –
									choose Dokploy.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Coolify</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For an open source deployment tool that's geared toward indie
									devs and OSS hobbyists, with an accessible, less polished
									approach that suits individuals over businesses, choose
									Coolify.
								</p>
							</div>
						</div>

						<Button className="mt-10 rounded-full" asChild>
							<Link
								href="https://app.dokploy.com/register"
								target="_blank"
								rel="noopener noreferrer"
							>
								Register now
							</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Dokploy vs Coolify at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy vs. Coolify at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Read our comprehensive Coolify vs. Dokploy features comparison
							before you make your decision.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-center font-semibold">Coolify</th>
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
											{row.coolify === true ? (
												<Check className="mx-auto h-5 w-5 text-green-500" />
											) : row.coolify === "limited" ? (
												<span className="text-xs text-amber-500">Limited</span>
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
												src="/images/dokploy-monitoring-dashboard.png"
												alt="Dokploy monitoring dashboard showing CPU, memory, disk and I/O metrics"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 2 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-provider-settings.png"
												alt="Dokploy deploy settings with GitHub, GitLab, Bitbucket and other providers"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 3 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-projects-dashboard.png"
												alt="Dokploy projects dashboard with services grid and environment selector"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : index === 4 ? (
										<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
											<Image
												src="/images/dokploy-create-backup.png"
												alt="Dokploy Create Backup modal for database and volume backups"
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : (
										<div className="aspect-video rounded-xl border border-border/50 bg-muted/30" />
									)}
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
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Category</th>
									<th className="px-4 py-4 text-left font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-left font-semibold">Coolify</th>
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
											{row.coolify}
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
							Empower every team, from solo developers to enterprise engineering
							squads, with a deployment platform built for collaboration and
							control. Dokploy's organizational and project structuring features
							make it simple for you to manage users, permissions, and
							environments, while its automation and monitoring tools scale
							seamlessly as your team grows. Whether you're running one app or
							hundreds, Dokploy adapts to your needs without adding complexity.
						</p>
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
