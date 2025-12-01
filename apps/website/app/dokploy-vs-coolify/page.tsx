'use client'

import { CallToAction } from '@/components/CallToAction'
import { Container } from '@/components/Container'
import { StatsSection } from '@/components/stats'
import { Testimonials } from '@/components/Testimonials'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'

export default function DokployVsCoolifyPage() {
	return (
		<div className="bg-black">
			<main>
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-black px-4 py-20 lg:py-32">
					<div className="bottom-0 flex w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
						<div className="relative px-4">
							<Container>
						<div className="mx-auto max-w-4xl text-center">
							<h1 className="font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
								Dokploy vs. Coolify
							</h1>
							<p className="mt-6 text-lg tracking-tight text-muted-foreground">
								If you're looking for a self-hosted, open deployment
								solution that lets you run applications on your own VPS
								or hardware, Dokploy and Coolify are the two leading
								options. But which should you choose?
							</p>
						</div>

						{/* Quick Comparison */}
						<div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-primary/50 bg-gradient-to-b from-primary/10 to-transparent p-8">
								<h3 className="text-2xl font-bold text-primary">
									Dokploy
								</h3>
								<p className="mt-4 text-base leading-relaxed text-muted-foreground">
									For a polished, intuitive, open deployment solution
									with powerful automation, AI, monitoring and
									integration features – designed for developers who
									want control without complexity – choose Dokploy.
								</p>
							</div>
							<div className="rounded-2xl border border-border/50 bg-gradient-to-b from-muted/10 to-transparent p-8">
								<h3 className="text-2xl font-bold text-white">
									Coolify
								</h3>
								<p className="mt-4 text-base leading-relaxed text-muted-foreground">
									For an open source deployment tool that's geared
									toward indie devs and OSS hobbyists, with an
									accessible, less polished approach that suits
									individuals over businesses, choose Coolify.
								</p>
							</div>
						</div>

						{/* CTA */}
						<div className="mt-12 text-center">
							<p className="mb-6 text-lg font-medium text-white">
								Unlock seamless deployments with Dokploy today
							</p>
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									target="_blank"
								>
									Register now
								</Link>
							</Button>
						</div>
					</Container>
						</div>
						<AnimatedGridPattern
							numSquares={30}
							maxOpacity={0.1}
							height={40}
							width={40}
							duration={3}
							repeatDelay={1}
							className={cn(
								'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
								'absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
							)}
						/>
					</div>
				</section>

				{/* Feature Comparison Table */}
				<section className="border-y border-border/30 py-20">
					<Container>
						<div className="mx-auto max-w-4xl">
							<div className="mb-12 text-center">
								<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
									Dokploy vs. Coolify at a glance
								</h2>
								<p className="mt-4 text-lg text-muted-foreground">
									Read our comprehensive Coolify vs. Dokploy
									features comparison before you make your decision.
								</p>
							</div>

							{/* Comparison Table */}
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-border/30">
											<th className="pb-4 text-left text-sm font-semibold text-white">
												Feature
											</th>
											<th className="pb-4 text-center text-sm font-semibold text-primary">
												Dokploy
											</th>
											<th className="pb-4 text-center text-sm font-semibold text-white">
												Coolify
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border/20">
										{comparisonFeatures.map((feature, index) => (
											<tr key={index} className="group hover:bg-muted/50">
												<td className="py-4 text-sm text-muted-foreground">
													{feature.name}
												</td>
												<td className="py-4 text-center">
													{feature.dokploy ? (
														<Check className="mx-auto h-5 w-5 text-primary" />
													) : (
														<X className="mx-auto h-5 w-5 text-red-500" />
													)}
												</td>
												<td className="py-4 text-center">
													{typeof feature.coolify === 'string' ? (
														<span className="text-xs text-muted-foreground">
															{feature.coolify}
														</span>
													) : feature.coolify ? (
														<Check className="mx-auto h-5 w-5 text-green-500" />
													) : (
														<X className="mx-auto h-5 w-5 text-red-500" />
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</Container>
				</section>

				{/* Why Choose Dokploy Section */}
				<section className="py-20">
					<Container>
						<div className="mx-auto max-w-4xl">
							<h2 className="mb-16 text-center font-display text-3xl tracking-tight text-white sm:text-4xl">
								Why you should choose Dokploy
							</h2>

							<div className="space-y-16">
								{benefits.map((benefit, index) => (
									<div
										key={index}
										className={`grid gap-8 md:grid-cols-2 md:items-center ${
											index % 2 === 1 ? 'md:flex-row-reverse' : ''
										}`}
									>
										<div className={index % 2 === 1 ? 'md:order-2' : ''}>
											<h3 className="text-2xl font-bold text-white">
												{benefit.title}
											</h3>
											<p className="mt-4 text-base leading-relaxed text-muted-foreground">
												{benefit.description}
											</p>
										</div>
										<div
											className={`flex items-center justify-center rounded-2xl border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-8 ${
												index % 2 === 1 ? 'md:order-1' : ''
											}`}
										>
											<div className="flex h-48 w-full items-center justify-center text-muted-foreground">
												{benefit.icon}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</Container>
				</section>

				{/* Integration Comparison */}
				<section className="border-y border-border/30 py-20">
					<Container>
						<div className="mx-auto max-w-4xl">
							<h2 className="mb-12 text-center font-display text-3xl tracking-tight text-white sm:text-4xl">
								Dokploy integrates with the leading solutions
							</h2>

							<div className="space-y-6">
								{integrations.map((integration, index) => (
									<div
										key={index}
										className="grid gap-6 rounded-xl border border-border/30 p-6 md:grid-cols-3"
									>
										<div className="font-semibold text-white">
											{integration.category}
										</div>
										<div className="text-sm text-muted-foreground">
											<div className="mb-1 text-xs font-semibold text-primary">
												Dokploy
											</div>
											{integration.dokploy}
										</div>
										<div className="text-sm text-muted-foreground">
											<div className="mb-1 text-xs font-semibold text-white">
												Coolify
											</div>
											{integration.coolify}
										</div>
									</div>
								))}
							</div>
						</div>
					</Container>
				</section>

				{/* Teams Section */}
				<section className="py-20">
					<Container>
						<div className="mx-auto max-w-4xl text-center">
							<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
								Why Dokploy is perfect for teams of any size
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-muted-foreground">
								Empower every team, from solo developers to enterprise
								engineering squads, with a deployment platform built
								for collaboration and control. Dokploy's organizational
								and project structuring features make it simple for you
								to managing users, permissions, and environments, while
								its automation and monitoring tools scale seamlessly as
								your team grows. Whether you're running one app or
								hundreds, Dokploy adapts to your needs without adding
								complexity.
							</p>
						</div>
					</Container>
				</section>

				{/* Stats Section */}
				<section className="border-y border-border/30">
					<Container>
						<StatsSection />
					</Container>
				</section>

				{/* Testimonials */}
				<Testimonials />

				{/* Final CTA */}
				<CallToAction />
			</main>
		</div>
	)
}

// Data
const comparisonFeatures = [
	{ name: 'One-command installation', dokploy: true, coolify: true },
	{
		name: 'Installation feedback and progress logs',
		dokploy: true,
		coolify: true,
	},
	{
		name: 'Works with firewall and TailScale out of the box',
		dokploy: true,
		coolify: false,
	},
	{
		name: 'Lightweight CPU usage while idle',
		dokploy: true,
		coolify: false,
	},
	{ name: 'Low memory usage', dokploy: true, coolify: true },
	{ name: 'Teams and organizations support', dokploy: true, coolify: true },
	{ name: 'Projects grouping', dokploy: true, coolify: true },
	{ name: 'Consistent, responsive UI', dokploy: true, coolify: false },
	{
		name: 'Built with Next.js / TypeScript',
		dokploy: true,
		coolify: false,
	},
	{ name: 'AI-assisted deployments', dokploy: true, coolify: false },
	{
		name: 'Deploy from custom Docker images',
		dokploy: true,
		coolify: true,
	},
	{
		name: 'Database deployment (Postgres, MySQL, Redis, etc.)',
		dokploy: true,
		coolify: true,
	},
	{
		name: 'Scheduled database backups (S3)',
		dokploy: true,
		coolify: true,
	},
	{
		name: 'Back up arbitrary Docker volumes, not just databases',
		dokploy: true,
		coolify: false,
	},
	{
		name: 'Preview deployments (review apps)',
		dokploy: true,
		coolify: true,
	},
	{ name: 'API and CLI tools for automation', dokploy: true, coolify: true },
	{ name: 'Multi-server deployment', dokploy: true, coolify: true },
	{
		name: 'Docker Swarm clustering',
		dokploy: true,
		coolify: 'Limited',
	},
	{ name: 'Cron jobs inside containers', dokploy: true, coolify: true },
	{
		name: 'Cron jobs on your host machine',
		dokploy: true,
		coolify: false,
	},
	{
		name: 'Monitoring metrics (CPU, RAM, Disk)',
		dokploy: true,
		coolify: 'Limited',
	},
	{ name: 'Metrics enabled by default', dokploy: true, coolify: false },
	{ name: 'Automated alerts from metrics', dokploy: true, coolify: false },
]

const benefits = [
	{
		title: 'Benefit from a fast, reliable setup',
		description:
			"Use a single command to deploy with Dokploy, which works seamlessly across firewalls, TailScale, and secure environments. Launch applications faster with Dokploy's optimized build system.",
		icon: (
			<svg
				className="h-24 w-24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
	},
	{
		title: 'Do more with less',
		description:
			"Keep your VPS fast and responsive with Dokploy's lightweight architecture, which uses minimal CPU and memory, even while idle. Automate builds, alerts, and scaling events effortlessly.",
		icon: (
			<svg
				className="h-24 w-24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
		),
	},
	{
		title: 'Integrate with your favorite platforms',
		description:
			'Connect Dokploy to GitHub, GitLab, and Bitbucket. Dokploy supports Docker, Compose, Nixpacks, and Buildpacks, and even lets you add APIs and use CLI automation.',
		icon: (
			<svg
				className="h-24 w-24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
					d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
				/>
			</svg>
		),
	},
	{
		title: 'Experience an intuitive, polished UX',
		description:
			'Enjoy a clean, consistent UI in the cloud, powered by Next.js and TypeScript. Dokploy is the modern deployment dashboard, optimized for productivity and clarity, with smooth navigation and predictable save behavior.',
		icon: (
			<svg
				className="h-24 w-24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
					d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		title: "Know what's happening before it's a problem",
		description:
			'Built-in metrics, automated alerting, and volume backups make Dokploy ideal for serious deployments. Monitor CPU, memory, and disk usage, automate notifications, and keep data safe with S3-compatible backups.',
		icon: (
			<svg
				className="h-24 w-24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1}
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		),
	},
]

const integrations = [
	{
		category: 'Git providers',
		dokploy: 'GitHub, GitLab, Bitbucket',
		coolify: 'GitHub',
	},
	{
		category: 'Build and deployment systems',
		dokploy:
			'Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks',
		coolify: 'Docker, Docker Compose, Nixpacks',
	},
	{
		category: 'Notifications and communication',
		dokploy: 'Slack, Discord, Telegram, Email (SMTP), Goify (automation bus)',
		coolify: 'Slack, Discord, Telegram, Email (SMTP), Pushover, Resend',
	},
]

