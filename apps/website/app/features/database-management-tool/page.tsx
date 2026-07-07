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
	Database,
	Activity,
	Shield,
	Archive,
	FileText,
	RotateCcw,
	Link2,
	Container as ContainerIcon,
	Terminal,
	HardDrive,
	Cpu,
	Keyboard,
	AlertTriangle,
	Lock,
	KeyRound,
	ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Database Management Tool & Deployment Software",
	description:
		"Create, manage, and back up databases easily with Dokploy's database management tool, and customize the process to suit your project needs.",
};

const databaseSystems = [
	{
		icon: Database,
		title: "PostgreSQL",
		description:
			"A robust, SQL-compliant relational database with high reliability\u2014a solid choice for production workloads that handle structured and transactional data and demand consistency and standards compliance.",
	},
	{
		icon: Database,
		title: "MySQL",
		description:
			"A widely used open source relational database known for its high performance and flexibility, with broad ecosystem support across frameworks and hosting environments.",
	},
	{
		icon: Database,
		title: "MariaDB",
		description:
			"A free and open source fork of MySQL with additional features and improved performance, maintained by an active community and great for MySQL applications.",
	},
	{
		icon: Database,
		title: "MongoDB",
		description:
			"A NoSQL database built for high scalability and flexibility, well-suited to applications with unstructured or semi-structured data and evolving data sources.",
	},
	{
		icon: Database,
		title: "Redis",
		description:
			"An in-memory key-value store often used as a database, cache, and message broker\u2014fast by design and easy to integrate for high-performance operations.",
	},
];

const protectionFeatures = [
	{
		icon: Archive,
		title: "Backups",
		description:
			"Schedule automated backups for any database and route them directly to an S3 bucket of your choice. Set a cron schedule, define a prefix, and test your configuration before relying on it so you know your stored data is secure before you ever need to recover it.",
	},
	{
		icon: FileText,
		title: "Logs",
		description:
			"View real-time logs from any running database directly in your Dokploy dashboard. Spot errors as they happen, trace unexpected behavior back to its source, and keep a clear record of what\u2019s happening inside your containers.",
	},
	{
		icon: RotateCcw,
		title: "Restore",
		description:
			"Restore any database from a backup stored in your S3 bucket in a few clicks\u2014critical for disaster recovery when you need to act fast. Select the source bucket, search for your backup file with autocomplete, and kick off the restoration process\u2014Dokploy handles the correct restore commands automatically.",
	},
	{
		icon: Link2,
		title: "Connections",
		description:
			"Connect to databases internally within your network or expose them externally via a generated connection URL. Use internal credentials for applications running in the same environment, and configure external access only when needed, with security controls in place to protect sensitive data.",
	},
];

const advancedOptions = [
	{
		icon: ContainerIcon,
		title: "Custom Docker Image",
		description:
			"Swap out the default Docker image for any database with one that fits your exact requirements and database development workflow.",
	},
	{
		icon: Terminal,
		title: "Run Command",
		description:
			"Execute custom commands directly inside the container for advanced management, complex queries, or troubleshooting.",
	},
	{
		icon: HardDrive,
		title: "Volumes",
		description:
			"Configure persistent storage volumes to make sure your data survives deployments and restarts.",
	},
	{
		icon: Cpu,
		title: "Resources",
		description:
			"Adjust CPU and memory allocation per database to optimize database performance and keep resource usage predictable as your infrastructure grows.",
	},
	{
		icon: Keyboard,
		title: "Keyboard Shortcuts",
		description:
			"Navigate between database tabs instantly with built-in keyboard shortcuts, keeping your workflow fast.",
	},
	{
		icon: AlertTriangle,
		title: "Danger Zone",
		description:
			"When you need a clean slate, the Danger Zone lets you wipe all data, tables, and configuration in one controlled action.",
	},
];

const securityFeatures = [
	{
		icon: Lock,
		title: "Your server, your data",
		description:
			"Dokploy creates Docker containers on your own server. Your database data never leaves your infrastructure\u2014you have full ownership and control over where it lives.",
	},
	{
		icon: KeyRound,
		title: "Isolated containers",
		description:
			"Each database runs in its own Docker container, isolated from other services. You control networking, access, and exposure\u2014nothing is shared unless you configure it.",
	},
	{
		icon: ShieldCheck,
		title: "No third-party access",
		description:
			"Dokploy doesn\u2019t store or proxy your data. Everything runs on your machine, so there\u2019s no middleman between your applications and your databases.",
	},
];

const faqs = [
	{
		question: "What are the key features of database management tools?",
		answer:
			"The best database management tools let you deploy, monitor, and optimize performance across multiple database systems from a single interface. Core capabilities typically include automated backups, connection management, resource controls, and the ability to track database changes over time. Support for custom functions, environment variables, and data privacy controls are also important\u2014especially for teams managing sensitive workloads in production.",
	},
	{
		question: "What is the best database management tool?",
		answer:
			"There\u2019s no single best tool. The right choice depends on your specific use cases, team size, and infrastructure. Some tools require expertise to configure and come with a steeper learning curve, which can slow teams down. Dokploy is designed to remove that friction and improve database performance, offering a secure, scalable solution that covers deployment, monitoring, backups, and data privacy without requiring specialist knowledge. It won\u2019t replace dedicated analysis or AI assistant tooling, but it gives developers a reliable foundation for managing databases in production.",
	},
	{
		question: "What database systems does Dokploy support?",
		answer:
			"Dokploy supports five widely used database tools: PostgreSQL, MySQL, MariaDB, MongoDB, and Redis. That covers the most common SQL server databases and NoSQL use cases, from relational workloads that rely on structured query language to flexible document and key-value stores. All five\u2014both SQL databases and noSQL systems\u2014can be deployed, backed up, and monitored using the same tools and workflows inside Dokploy.",
	},
];

export default function DatabaseManagementToolPage() {
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
							Database Management, Done Right
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Create, manage, and back up databases easily with Dokploy&apos;s
							database tool, and customize the process to suit your project
							needs. Deploy in minutes, maintain full control over your stored
							data, and recover fast when it matters.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href="/contact">Contact sales</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link
									href="https://docs.dokploy.com/docs/core/databases"
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

			{/* Deploy the database you already use */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Deploy the database you already use
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy&apos;s database management tool supports five widely used
							database systems out of the box, so you&apos;re not locked into a
							single technology. You pick what fits your stack and your data
							management needs.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{databaseSystems.map((db) => (
							<div
								key={db.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<db.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold">{db.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{db.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Watch your databases in real time */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
								<Activity className="h-7 w-7" />
							</div>
						</div>
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Watch your databases in real time
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy surfaces live monitoring graphs for memory, CPU, disk, and
							network directly in the dashboard. The data updates as you view
							it, so you can see exactly what your database is doing and catch
							problems before they become incidents.
						</p>
					</div>
				</Container>
			</section>

			{/* Protect, recover, and connect with confidence */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Protect, recover, and connect with confidence
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Automated backups, transparent logs, straightforward restores, and
							flexible connection options. Everything you need to manage a
							database reliably, all in one place.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{protectionFeatures.map((feature) => (
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

			{/* Advanced options, your way */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Advanced options, your way
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Dokploy goes beyond the basics, giving you granular control over
							how each database runs, from the image it uses to the resources it
							consumes and everything in between.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{advancedOptions.map((option) => (
							<div
								key={option.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<option.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold text-white">
									{option.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{option.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Your data stays secure */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
								<Shield className="h-7 w-7" />
							</div>
						</div>
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Your data stays secure
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Your database data is stored on your own server. Dokploy creates
							Docker containers on your infrastructure, so you have full
							control over your data&mdash;no third parties, no external
							dependencies.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{securityFeatures.map((feature) => (
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

			{/* Start managing databases smarter */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Start managing databases smarter
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Dokploy gives you everything you need to deploy, monitor, and
							protect your databases&mdash;without the complexity. Create your
							account and have your first database running in minutes with our
							database management tool.
						</p>
						<div className="mt-10">
							<Button className="rounded-full" asChild>
								<Link href="https://app.dokploy.com">Create your account</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Database management tool FAQs */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Database management tool FAQs
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
