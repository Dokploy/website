import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonStats } from "@/components/comparison-stats";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Archive,
	Building2,
	Check,
	Clock,
	Container as ContainerIcon,
	Gauge,
	ShieldCheck,
	X,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Dokploy vs. Railway: The Best Railway Alternative",
	description:
		"Compare Dokploy vs. Railway to find the best Railway alternative: flat server pricing, no per-seat fees, and full control over your own infrastructure.",
};

const featureComparisonRows: {
	feature: string;
	dokploy: boolean | string;
	railway: boolean | string;
}[] = [
	{
		feature: "Self-hostable on your own VPS or server",
		dokploy: true,
		railway: false,
	},
	{ feature: "Native Docker Compose support", dokploy: true, railway: false },
	{ feature: "Static site / build support", dokploy: true, railway: true },
	{
		feature: "Preview deployments",
		dokploy: "PR-based",
		railway: "PR-based",
	},
	{ feature: "Scheduled jobs (cron)", dokploy: true, railway: true },
	{ feature: "Background workers", dokploy: true, railway: true },
	{
		feature: "Choice of any server region",
		dokploy: true,
		railway: "Within plan limits",
	},
	{
		feature: "Managed databases",
		dokploy: "Self-managed on your server",
		railway: "Native backups, PITR & opt-in HA clustering",
	},
	{ feature: "MCP server for AI agents", dokploy: true, railway: true },
	{ feature: "SSO & custom roles on Enterprise", dokploy: true, railway: true },
	{
		feature: "Predictable per-server pricing",
		dokploy: true,
		railway: false,
	},
];

const whyChooseItems = [
	{
		icon: Building2,
		title: "Own your infrastructure",
		description:
			"Deploy to any Linux server reachable by SSH—Hetzner, DigitalOcean, AWS, or your own hardware. Railway runs every workload on its own infrastructure, so you can't move your apps elsewhere.",
		image: "/images/dokploy-remote-servers.webp",
		alt: "Dokploy remote servers showing connected VPS infrastructure",
	},
	{
		icon: ContainerIcon,
		title: "Deploy your existing Docker Compose stacks",
		description:
			"Dokploy runs your Compose file as written, no rework needed. Railway can import a Compose file to scaffold services, but it doesn't run Compose natively, and not every configuration is supported.",
		image: "/images/dokploy-compose-editor.webp",
		alt: "Dokploy Docker Compose editor with multi-service configuration",
	},
	{
		icon: Archive,
		title: "Back up to storage you actually control",
		description:
			"Dokploy backs up any named Docker volume, not just databases, straight to S3-compatible storage you own. Railway's native backups are internal snapshots that stay on its infrastructure. To move them to your storage, you need to deploy a separate script.",
		image: "/images/dokploy-create-backup.webp",
		alt: "Dokploy Create Backup modal for database and volume backups",
	},
	{
		icon: Clock,
		title: "Run background workers and cron jobs without usage billing",
		description:
			"Scheduled jobs and background workers run on your server at no extra per-resource cost, alongside your applications and databases.",
		image: "/images/dokploy-projects-dashboard.webp",
		alt: "Dokploy projects dashboard with applications, databases and workers",
	},
	{
		icon: ShieldCheck,
		title: "Get Enterprise security on infrastructure you control",
		description:
			"Dokploy's Enterprise license adds SSO and custom roles to a self-hosted instance you run yourself, air-gapped setups included. Railway's equivalent Enterprise tier for these features only runs on its own managed cloud.",
		image: "/images/dokploy-users.webp",
		alt: "Dokploy user management with custom roles and permissions",
	},
	{
		icon: Gauge,
		title: "See your metrics with zero setup",
		description:
			"Dokploy shows CPU, RAM, and disk metrics for every application by default, no extra tool required. Railway offers the same base metrics on all plans, but automated threshold alerts require upgrading to Pro.",
		image: "/images/dokploy-monitoring-dashboard.webp",
		alt: "Dokploy monitoring dashboard showing CPU, memory and disk metrics",
	},
];

const whenToUse = {
	dokploy: [
		"You're running three or more always-on apps and want a flat server rate instead of metered billing.",
		"You want full control over your servers, operating system, and region.",
		"You need native Docker Compose support for multi-service apps.",
		"You want the option to run Enterprise security features like SSO and audit logs on your own infrastructure someday.",
		"Your costs shouldn't grow just because you add teammates.",
	],
	railway: [
		"You're spinning up a hobby project or prototype and don't want to provision a server.",
		"You want a CLI-first, git-push workflow with zero infrastructure setup.",
		"Your usage is low enough that pay-as-you-go pricing beats the cost of a VPS.",
		"You don't want to own or maintain any servers at all.",
		"You want built-in private networking and replicas without configuring them yourself.",
	],
};

const pricingRows = [
	{
		label: "Entry price",
		dokploy: "Free (open source, self-hosted)",
		railway: "$5/month (Hobby) + usage",
	},
	{
		label: "Production tier",
		dokploy: "$15/month (Startup, 3 servers)",
		railway: "$20/month per seat (Pro) + usage",
	},
	{
		label: "Per-seat cost",
		dokploy: "None—priced per server",
		railway: "$20/month per team member",
	},
	{
		label: "Resource usage",
		dokploy: "Your server's capacity",
		railway: "$10/GB RAM/month, $20/vCPU/month",
	},
	{
		label: "Bandwidth",
		dokploy: "Your server's allowance",
		railway: "$0.05/GB egress",
	},
	{
		label: "Free tier",
		dokploy: "Self-hosted edition is free indefinitely",
		railway: "30-day trial credit, not an ongoing production tier",
	},
];

const integrationRows = [
	{
		category: "Git providers",
		dokploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		railway: "GitHub, CLI",
	},
	{
		category: "Notifications and communication",
		dokploy: "Slack, Telegram, Discord, Lark, Email, Webhook, and more",
		railway: "Primarily webhooks and email",
	},
];

function InlineCode({ children }: { children: ReactNode }) {
	return (
		<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
			{children}
		</code>
	);
}

const migrationSteps: { title: string; description: ReactNode }[] = [
	{
		title: "Export your environment variables from Railway.",
		description: (
			<>
				Run the following command to output your variables in{" "}
				<InlineCode>KEY=VALUE</InlineCode> format, ready to save as a{" "}
				<InlineCode>.env</InlineCode> file:{" "}
				<InlineCode>railway variables --kv</InlineCode>.
			</>
		),
	},
	{
		title: "Connect your repository in Dokploy.",
		description:
			"Create a new Application (or Compose project for multi-service apps) and point it at the same GitHub, GitLab, Bitbucket, or Gitea repository you used on Railway.",
	},
	{
		title: "Import your environment variables.",
		description: (
			<>
				Paste them into Dokploy's Environment tab, or push the whole file at
				once from the CLI:{" "}
				<InlineCode>dokploy env push &lt;file&gt;</InlineCode>.
			</>
		),
	},
	{
		title: "Provision your database and migrate the data.",
		description: (
			<>
				Create a matching database in Dokploy—PostgreSQL, MySQL, MongoDB,
				MariaDB, or Redis—then pull your connection string from Railway:{" "}
				<InlineCode>
					railway variables -s db --kv | grep DATABASE_PUBLIC_URL
				</InlineCode>{" "}
				and use <InlineCode>pg_dump</InlineCode>/
				<InlineCode>pg_restore</InlineCode> (or{" "}
				<InlineCode>mongodump</InlineCode>/<InlineCode>mongorestore</InlineCode>
				) to move the data across.
			</>
		),
	},
	{
		title: "Deploy and verify.",
		description: (
			<>
				Trigger a deployment and check it on Dokploy's generated{" "}
				<InlineCode>traefik.me</InlineCode> domain before touching DNS.
			</>
		),
	},
	{
		title: "Cut over your domain.",
		description:
			"Add your custom domain in Dokploy's Domains tab and update your DNS once you've confirmed everything works.",
	},
];

const faqs = [
	{
		question: "Is Dokploy a good Railway alternative?",
		answer:
			"Yes, if you want control over your own servers and predictable, flat pricing instead of usage-based billing. Dokploy gives you the same Git-push deployment experience as Railway, plus native Docker Compose support, on infrastructure you choose and own.",
	},
	{
		question: "Does Railway have a free tier?",
		answer:
			"Railway does not have a free tier. Its free option is a one-time 30-day trial with $5 of credit, not an ongoing production-ready free tier. Once the trial ends, you're moved to a paid plan or a heavily limited allowance. Dokploy's self-hosted edition is free indefinitely, with only your server costs to cover.",
	},
	{
		question: "Can I run Docker Compose on Railway?",
		answer:
			"Railway can import a Compose file to scaffold individual services on its canvas, but it doesn't run Compose natively. Some configurations aren't supported, and multi-volume setups often need manual adjustment. Dokploy deploys your existing Compose file directly, as written.",
	},
	{
		question: "Does Dokploy support background workers and cron jobs?",
		answer:
			"Yes. Dokploy runs scheduled jobs and background workers on your server at no extra charge, alongside your applications and databases.",
	},
	{
		question: "Is Dokploy cheaper than Railway?",
		answer:
			"For most workloads, yes. Dokploy Cloud starts at $4.50/month per server with unlimited apps and databases included, or you can self-host for free. Railway charges a plan fee plus usage-based rates for compute, storage, and egress, so costs grow with resource use and team size.",
	},
	{
		question: "Can I self-host Dokploy on my own AWS or DigitalOcean account?",
		answer:
			"Yes. Dokploy connects to any Linux server that is reachable via SSH—including AWS, DigitalOcean, Hetzner, or your own hardware—so you can choose your provider and region freely.",
	},
	{
		question: "What happens if I outgrow a single Dokploy server?",
		answer:
			"You can add remote servers over SSH for isolation, or join servers to a Docker Swarm cluster to run replicas of the same app across machines for high availability. Both scale beyond a single server without switching platforms.",
	},
	{
		question: "Does Dokploy support monorepos?",
		answer:
			"Yes, deploy it as a Docker Compose stack, where each service's build context can point to a different subdirectory of the same repository.",
	},
];

function ComparisonCell({ value }: { value: boolean | string }) {
	if (typeof value === "string") {
		return <span className="text-sm text-muted-foreground">{value}</span>;
	}
	return value ? (
		<Check className="mx-auto h-5 w-5 text-green-500" />
	) : (
		<X className="mx-auto h-5 w-5 text-muted-foreground/50" />
	);
}

export default function DokployVsRailwayPage() {
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
						<p className="text-sm font-semibold uppercase tracking-wider text-primary">
							Railway alternative
						</p>
						<h1 className="mt-4 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
							Dokploy vs. Railway
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Choose Dokploy as your Railway alternative and take control of
							your servers, setup, and infrastructure bill.
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									Dokploy gives you PaaS-level simplicity on infrastructure you
									own. Deploy apps, Docker Compose stacks, databases, and
									background workers on your preferred VPS or cloud server, with
									predictable pricing and no vendor lock-in.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Railway</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									Railway is a fully managed platform that deploys straight from
									GitHub or the CLI, handling servers, scaling, and networking
									for you. It's a strong pick for teams that would rather not
									think about infrastructure at all, billed by the second for
									the compute you use.
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

			{/* Dokploy vs Railway at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Dokploy vs. Railway at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Both platforms simplify deploying apps and databases from Git, but
							they give you different levels of control. Read our comprehensive
							Railway vs. Dokploy features comparison before you decide.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">
										Dokploy
									</th>
									<th className="px-4 py-4 text-center font-semibold">
										Railway
									</th>
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
											<ComparisonCell value={row.dokploy} />
										</td>
										<td className="px-4 py-3 text-center">
											<ComparisonCell value={row.railway} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why Dokploy is the best Railway alternative */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why Dokploy is the best Railway alternative
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
									<p className="mt-3 text-muted-foreground">
										{item.description}
									</p>
								</div>
								<div className="flex-1">
									<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
										<Image
											src={item.image}
											alt={item.alt}
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

			{/* When to use Dokploy vs Railway */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							When to use Dokploy vs. Railway
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							The right choice depends on how much infrastructure you want to
							own, not which platform is objectively better.
						</p>
					</div>

					<div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
						{(
							[
								["Dokploy", whenToUse.dokploy],
								["Railway", whenToUse.railway],
							] as const
						).map(([name, reasons]) => (
							<div
								key={name}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<h3 className="text-xl font-semibold">Choose {name} if:</h3>
								<ul className="mt-4 space-y-3">
									{reasons.map((reason) => (
										<li
											key={reason}
											className="flex gap-3 text-sm text-muted-foreground"
										>
											<Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
											<span>{reason}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Pricing comparison */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Pricing comparison: platform fees vs. usage-based billing
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy charges for the platform, not your workload. You cover
							your server costs, often through a VPS provider. One Dokploy
							server covers unlimited apps, databases, and deployments for a
							fixed monthly cost. Railway bundles infrastructure and platform
							into one usage-based bill, metering CPU, RAM, storage, and egress
							by the second, so usage increases the bill.
						</p>
						<p className="mt-4 text-lg text-muted-foreground">
							Team size is also a factor. Dokploy Cloud is priced per connected
							server, not per person, while Railway's Pro plan charges $20 per
							team member per month on top of usage.
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
									<th className="px-4 py-4 text-left font-semibold">Railway</th>
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
											{row.railway}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Static sites and multi-region deployment */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Static sites and multi-region deployment
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy and Railway take different approaches here, and this is
							one area where it makes sense to consider Railway's managed model.
						</p>
					</div>

					<div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<h3 className="text-xl font-semibold">Dokploy</h3>
							<p className="mt-3 text-sm text-muted-foreground">
								Deploy static builds on any server, in any region you choose—US
								East, US West, EU, or wherever your provider has capacity.
								There's no built-in CDN, so for edge caching you'd add a service
								like Cloudflare in front yourself.
							</p>
						</div>
						<div className="rounded-xl border border-border/50 bg-card p-6">
							<h3 className="text-xl font-semibold">Railway</h3>
							<p className="mt-3 text-sm text-muted-foreground">
								Railway includes a global CDN with edge caching for static
								assets and HTML on every plan, at no extra cost, plus
								multi-region placement within plan limits. Dokploy has no
								built-in equivalent, as traffic routes through Traefik on your
								own server, in whichever region you chose.
							</p>
						</div>
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
						<p className="mt-4 text-lg text-muted-foreground">
							Both platforms connect to the tools you already use, but Dokploy
							supports a wider range of Git providers and notification channels
							out of the box.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">
										Category
									</th>
									<th className="px-4 py-4 text-left font-semibold">Dokploy</th>
									<th className="px-4 py-4 text-left font-semibold">Railway</th>
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
											{row.railway}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Migrating from Railway to Dokploy */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Migrating from Railway to Dokploy
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Moving a production app across platforms sounds daunting, but you
							can complete the whole process in six steps, with no downtime if
							you deploy to Dokploy first and verify before cutting over.
						</p>
					</div>

					<ol className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{migrationSteps.map((step, index) => (
							<li
								key={step.title}
								className="relative rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="absolute right-6 top-6 font-display text-4xl font-bold text-primary/30">
									{index + 1}
								</div>
								<h3 className="pr-12 text-lg font-semibold">{step.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									{step.description}
								</p>
							</li>
						))}
					</ol>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							FAQs
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="mx-auto mt-12 w-full max-w-3xl"
					>
						{faqs.map((faq, index) => (
							<AccordionItem value={`faq-${index}`} key={faq.question}>
								<AccordionTrigger className="text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
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
