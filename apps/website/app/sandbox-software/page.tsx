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
	Bot,
	Box,
	Check,
	Code,
	Cpu,
	FileCode,
	FlaskConical,
	Layers,
	Network,
	Server,
	ShieldCheck,
	Sparkles,
	Terminal,
	Timer,
	Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const SANDBOX_DOCS_URL = "https://docs.dokploy.com/docs/core/sandboxes";

export const metadata: Metadata = {
	title: "Sandbox Software for AI Agents and Code Execution",
	description:
		"Run AI-generated code and scripts in isolated Docker sandboxes. Control resources, network access, and execution through Dokploy's API and MCP server.",
	alternates: {
		canonical: "https://dokploy.com/sandbox-software",
	},
	openGraph: {
		title: "Sandbox Software for AI Agents and Code Execution | Dokploy",
		description:
			"Run AI-generated code and scripts in isolated Docker sandboxes. Control resources, network access, and execution through Dokploy's API and MCP server.",
		images: "/og.png",
		type: "website",
	},
};

const useCases = [
	{
		icon: Bot,
		title: "AI agent code execution",
		description:
			"Let AI agents execute code they generate in temporary Docker containers, without accessing your application networks. Run scripts, inspect their output, and remove the sandbox when the task is complete.",
	},
	{
		icon: FlaskConical,
		title: "Test scripts and dependencies",
		description:
			"Try new packages, commands, and scripts without installing anything on your server. Test new code, identify bugs, and inspect results in a disposable sandbox environment.",
	},
	{
		icon: FileCode,
		title: "Run user-submitted code",
		description:
			"Execute user-submitted scripts in resource-limited containers for code interpreters and software testing. Restrict network access, and use gVisor for stronger isolation when running untrusted code.",
	},
	{
		icon: Workflow,
		title: "Run one-off automations",
		description:
			"Execute automated scripts and background tasks in temporary environments with the dependencies they need. Set resource limits and control network access. Dokploy will clean up the container when it is no longer active.",
	},
];

const workflowSteps = [
	{
		icon: Box,
		title: "Create your sandbox",
		description:
			"Select a server, choose a built-in runtime or custom Docker image, and configure the hardware resources your code can use. Dokploy creates a separate container with your chosen settings.",
	},
	{
		icon: Terminal,
		title: "Run code and manage files",
		description:
			"Execute commands from the built-in console or through the API. Write files into the sandbox, read the output, and retrieve results without needing direct access to the host.",
	},
	{
		icon: Timer,
		title: "Clean up automatically",
		description:
			"Set an inactivity timeout to remove sandboxes that are no longer being used. Sandboxes default to a five-minute inactivity timeout and have a maximum lifetime of 24 hours. Files and processes are lost when the sandbox stops.",
	},
];

const controlFeatures = [
	{
		icon: Layers,
		title: "Choose your preferred runtime",
		href: `${SANDBOX_DOCS_URL}#templates`,
		description:
			"Start with built-in templates for Python, Node.js, Go, Rust, Java, and other languages, or use your own Docker image. Each sandbox comes with a working directory and runs commands as a non-root user.",
	},
	{
		icon: Cpu,
		title: "Set CPU and memory limits",
		href: "https://docs.dokploy.com/docs/core/monitoring",
		description:
			"Control how much CPU and memory each sandbox can use, with process limits and swap disabled. Set an inactivity timeout so temporary containers don't keep consuming resources when they're no longer needed.",
	},
	{
		icon: Network,
		title: "Control network access",
		href: "https://docs.dokploy.com/docs/core/networks",
		description:
			"Run sandboxes with network access disabled by default, or enable internet access if your code needs it. Each sandbox gets a dedicated network and can't connect directly to other sandboxes or your application networks.",
	},
	{
		icon: Code,
		title: "Execute commands through the API",
		href: "https://docs.dokploy.com/docs/api",
		description:
			"Create sandboxes, execute commands, and read or write files using the Dokploy API. Retrieve command output and exit codes programmatically, or stream output as commands run.",
	},
	{
		icon: Server,
		title: "Run sandboxes on your infrastructure",
		href: "https://docs.dokploy.com/docs/core/remote-servers",
		description:
			"Run sandboxes on the Dokploy server or a connected remote server, depending on your setup. Dokploy Cloud requires a connected remote server for sandboxes. For untrusted code, use a server separate from your applications.",
	},
	{
		icon: ShieldCheck,
		title: "Strengthen sandbox isolation",
		href: `${SANDBOX_DOCS_URL}#using-gvisor`,
		description:
			"Dokploy drops Linux capabilities, restricts privilege escalation, and runs commands as a non-root user. Standard Docker sandboxes share the host operating system kernel; install gVisor for stronger isolation of untrusted code.",
	},
];

const mcpPoints = [
	"Create sandboxes with your preferred runtime and resource limits",
	"Execute commands and retrieve their output",
	"Read, write, and list files inside a sandbox",
	"Manage timeouts and stop sandboxes when tasks are complete",
];

const inlineLinkClassName = "text-white hover:underline";

const faqs: { question: string; answer: ReactNode[] }[] = [
	{
		question: "What is sandbox software?",
		answer: [
			"Sandbox software provides an isolated space to run programs and test code outside your application containers.",
			"Dokploy's Sandboxes feature uses temporary Docker containers rather than full virtual machines. Run AI-generated code or automations with resource limits, network controls, and a defined lifetime.",
		],
	},
	{
		question: "How do I create a sandbox in Dokploy?",
		answer: [
			"Open Sandboxes in the Dokploy dashboard, select your server, and click Create Sandbox. Choose a runtime template or custom Docker image, configure the CPU, memory, network access, and timeout, then create the sandbox. You can also create sandboxes programmatically using the API or MCP server.",
		],
	},
	{
		question: "Can AI agents run code in Dokploy Sandboxes?",
		answer: [
			"Yes. Dokploy's MCP server exposes sandbox operations to compatible AI agents, including creating containers, running commands, and managing files. Agents can execute generated code and inspect the results without connecting directly to your application networks.",
		],
	},
	{
		question: "How secure are Dokploy Sandboxes?",
		answer: [
			"Dokploy Sandboxes drop Linux capabilities, run commands as a non-root user, and enforce CPU, memory, and process limits. Network access is disabled by default.",
			<Fragment key="security-runtime">
				The default Docker runtime shares the host operating system kernel. For
				stronger isolation when running untrusted or potentially malicious code,
				configure gVisor. Grant sandbox{" "}
				<Link
					href={`${SANDBOX_DOCS_URL}#permissions`}
					className={inlineLinkClassName}
				>
					Create permission
				</Link>{" "}
				only to trusted users, since they can control container files and extend
				the sandbox&apos;s lifetime.
			</Fragment>,
		],
	},
	{
		question: "How long does a sandbox last?",
		answer: [
			"Sandboxes have a configurable inactivity timeout, which defaults to five minutes. Activity such as executing commands or writing files resets the timeout. Sandboxes also have a default maximum lifetime of 24 hours. When a sandbox stops, its files and processes are lost.",
		],
	},
	{
		question: "Can I deploy applications inside a sandbox?",
		answer: [
			"Dokploy Sandboxes are designed for temporary code execution, not application hosting. They don't support public domains, exposed ports, or persistent volumes. To deploy an application that users can access, use Dokploy's normal application deployment features instead.",
		],
	},
	{
		question: "What are the benefits of using sandbox software?",
		answer: [
			"Sandbox software reduces the risk of testing scripts directly in development or production environments. Developers can experiment with new code and inspect its behavior in a separate container.",
			"With Dokploy, test AI-generated code, debug errors, and run automated tasks in temporary Docker containers. Set CPU and memory limits, restrict network access, and remove inactive sandboxes automatically.",
		],
	},
	{
		question: "How do I use sandbox software?",
		answer: [
			"In Dokploy, open Sandboxes in the dashboard, select a server, and create a sandbox using a built-in runtime template or custom Docker image.",
			"Configure its CPU, memory, network access, and inactivity timeout, then execute commands through the built-in console. You can also use Dokploy's API or MCP server to create sandboxes, execute code, and manage files programmatically.",
		],
	},
];

export default function SandboxSoftwarePage() {
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
							Run AI code in isolated sandboxes
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Give AI agents and team members a controlled sandbox environment
							to execute code, run commands, and work with files. Dokploy
							creates temporary Docker containers with CPU and memory limits and
							configurable network access.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
									target="_blank"
								>
									Get Started
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link href={SANDBOX_DOCS_URL}>Read the Docs</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Run and test code in a sandbox */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Run and test code in a sandbox
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							From AI-generated scripts to automated tasks, Dokploy&apos;s
							sandbox software gives software developers an isolated environment
							for testing and debugging code. Run new code without installing
							dependencies on your server or connecting to your application
							networks.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
						{useCases.map((feature) => (
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

			{/* Create and manage sandboxes in minutes */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Create and manage sandboxes in minutes
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Set up a temporary execution environment directly from the Dokploy
							dashboard, or create and control sandboxes programmatically
							through the API.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
						{workflowSteps.map((step) => (
							<div
								key={step.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<step.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold text-white">
									{step.title}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{step.description}
								</p>
							</div>
						))}
					</div>
					<div className="mt-12 text-center">
						<Button variant="outline" className="rounded-full" asChild>
							<Link href={SANDBOX_DOCS_URL}>Explore Dokploy Sandboxes</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Control every sandbox environment */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Control every sandbox environment
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Configure where your code runs, limit the hardware resources it
							can use, and manage sandbox operations and network settings
							through Dokploy&apos;s dashboard and API.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{controlFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border border-border/50 bg-card p-6"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold">
									<Link href={feature.href} className={inlineLinkClassName}>
										{feature.title}
									</Link>
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* From sandbox to deployment */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							From sandbox to deployment
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Sandboxes are designed for temporary code execution, not
							application hosting. They don&apos;t expose public ports, support
							domains, or retain files after they stop.
						</p>
						<p className="mt-4 text-lg text-muted-foreground">
							Once you&apos;ve tested your code, deploy your application
							separately using Dokploy&apos;s{" "}
							<Link
								href="/features/application-deployment-platform"
								className={inlineLinkClassName}
							>
								application deployment
							</Link>{" "}
							features, including Docker images, buildpacks, and Git-based
							deployments.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href="/deploy-ai">
									Deploy AI applications with Dokploy
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Connect AI agents to sandboxes with MCP */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
						<div>
							<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
								Connect AI agents to sandboxes with MCP
							</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Dokploy&apos;s Model Context Protocol (MCP) server lets AI
								coding agents create and manage sandboxes. Connect a supported
								MCP client using a Dokploy API key. The agent inherits the key
								owner&apos;s permissions, so restrict access to the operations
								it needs.
							</p>
							<ul className="mt-8 space-y-4">
								{mcpPoints.map((point) => (
									<li key={point} className="flex items-start gap-3">
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
											<Check className="h-3.5 w-3.5" />
										</span>
										<span className="text-sm text-muted-foreground">
											{point}
										</span>
									</li>
								))}
							</ul>
							<div className="mt-8">
								<Button variant="outline" className="rounded-full" asChild>
									<Link href="https://docs.dokploy.com/docs/core/mcp">
										Explore the Dokploy MCP server
									</Link>
								</Button>
							</div>
						</div>
						<div className="flex aspect-square items-center justify-center rounded-2xl border border-border/50 bg-card sm:aspect-video lg:aspect-square">
							<div className="flex flex-col items-center gap-4 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 text-primary">
									<Sparkles className="h-8 w-8" />
								</div>
								<p className="max-w-[220px] text-sm text-muted-foreground">
									Cursor, Copilot, Claude, and any MCP-compatible agent
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Start running code in sandboxes
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Give AI agents and automation tools a temporary environment to
							execute code, with configurable resource limits, network controls,
							and API access.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
							<Button className="rounded-full" asChild>
								<Link href={SANDBOX_DOCS_URL} target="_blank">
									Read the docs
								</Link>
							</Button>
							<Button variant="outline" className="rounded-full" asChild>
								<Link
									href="https://app.dokploy.com/register"
									aria-label="Get Started with Dokploy"
								>
									Get started
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* FAQs */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Sandbox software FAQs
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						defaultValue={faqs[0].question}
						className="mx-auto mt-16 w-full max-w-3xl [&_[role=region][data-state=closed]]:hidden"
					>
						{faqs.map((faq) => (
							<AccordionItem value={faq.question} key={faq.question}>
								<AccordionTrigger className="text-left text-white">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent forceMount>
									<div className="space-y-3">
										{faq.answer.map((paragraph, index) => (
											<p key={`${faq.question}-${index}`}>{paragraph}</p>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>
		</div>
	);
}
