import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import { Activity, Bot, Eye, GitBranch, Lock, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Private Deployment in Finance Software",
	description:
		"Keep banking apps, internal tools, and fintech services in controlled environments with private deployment in finance that your teams manage.",
	alternates: {
		canonical: "https://dokploy.com/industries/finance-banking",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "Private deployment in finance for safer app releases",
		description:
			"Deploy internal banking tools, fintech services, and customer-facing apps without giving up control of infrastructure. Dokploy gives financial technology teams a governed platform for private deployment and ongoing operations.",
	},
	features: {
		heading: "Ship regulated software without slowing release teams",
		description:
			"Financial institutions need software teams to move quickly, but deployments need clear boundaries. Dokploy lets developers release from Git and Docker-based workflows while platform teams manage access, environments, logs, and rollback paths.",
		items: [
			{
				icon: Lock,
				title: "Control releases inside private infrastructure",
				description:
					"Run banking apps, internal tools, and fintech services on infrastructure you control. Self-host the full platform when internal teams need complete ownership.",
			},
			{
				icon: GitBranch,
				title: "Connect Git workflows to governed deployments",
				description:
					"Deploy from GitHub, GitLab, Bitbucket, Gitea, generic Git, Docker, or Docker Compose. Teams keep familiar workflows.",
			},
			{
				icon: Users,
				title: "Separate teams with roles and environments",
				description:
					"Create projects around business units, teams, or platforms. Permissions, SSO, custom roles, and audit logs keep access aligned with finance governance.",
			},
			{
				icon: Eye,
				title: "Review changes before customer impact",
				description:
					"Use preview and staging environments to test pull requests, policy updates, and product changes before release. Reviewers don’t have to rely on code diffs.",
			},
			{
				icon: Activity,
				title: "Monitor services across servers",
				description:
					"Track application health, server metrics, logs, domains, and deployments from one platform, so platform teams have clear visibility.",
			},
			{
				icon: Bot,
				title: "Power your AI deployment process",
				description:
					"Build AI sandboxes where even your non-technical team members can test vibe-coded software in a secure, controlled environment.",
			},
		],
	},
	comparison: {
		heading: "Private deployment without cloud account sprawl",
		description:
			"Separate cloud accounts can work for individual projects, but they become difficult to govern across banking products, internal tools, and compliance-sensitive workflows. Dokploy centralizes the deployment layer while keeping teams productive.",
		without: {
			title: "Generic cloud accounts",
			items: [
				"Teams may need broad infrastructure permissions.",
				"Release processes vary between products and departments.",
				"Cost, cleanup, and access reviews become harder to manage.",
				"Logs, rollbacks, domains, and backups can sit in different tools.",
				"Security teams have limited visibility into smaller internal apps.",
			],
		},
		withDokploy: {
			title: "Dokploy for finance and banking",
			items: [
				"Applications deploy inside controlled public, private, or self-hosted environments.",
				"Admins manage projects, users, services, and servers centrally.",
				"Teams can use Git, Docker, Docker Compose, and supported databases.",
				"Enterprise options include SSO, custom roles, audit logs, and whitelabeling.",
				"Finance teams get repeatable workflows across internal and customer-facing apps.",
			],
		},
	},
	workflow: {
		heading: "From financial app repository to controlled release",
		description:
			"Dokploy turns release management into a clear workflow. Developers can ship from their repositories, while platform teams keep the environment, access model, process, and release path consistent.",
		steps: [
			{
				title: "Create the regulated environment",
				description:
					"Set up a project for a banking service, internal tool, fintech app, or shared platform. Use separate environments for development, review, staging, and production.",
				flow: "Create project → Add environment → Assign owners",
			},
			{
				title: "Connect the repository",
				description:
					"Connect a Git provider or bring a Docker-based deployment. Dokploy can trigger deployments through webhooks when approved changes are pushed.",
				flow: "Select provider → Choose repository → Set branch",
			},
			{
				title: "Review before release",
				description:
					"Deploy changes into a preview or staging environment for product, security, and platform review. Stakeholders can test the running service before it reaches customers or staff.",
				flow: "Open preview → Check logs → Approve release",
			},
			{
				title: "Deploy and monitor",
				description:
					"Promote the release, watch logs and metrics, and use rollback options if the service needs to be restored. The full deployment history stays tied to the service.",
				flow: "Deploy → Monitor → Roll back if needed",
			},
		],
	},
	builtFor: {
		heading: "Built for banking platforms, internal tools, and fintech teams",
		paragraphs: [
			"Dokploy gives finance teams a practical middle ground between unmanaged cloud hosting and heavy internal platform projects.",
			"Developers can keep simple release workflows, while infrastructure owners retain control over servers, access, domains, databases, and operational visibility.",
			"Teams can run Dokploy in the model that fits their requirements. Use Dokploy Cloud when you want the control plane managed by Dokploy and apps running on your own servers, or choose self-hosting when the full platform should stay under internal operations.",
		],
		screenshotAlt:
			"Dokploy project dashboard for a banking platform with environments for review, staging, and production, plus visible deployments, logs, monitoring, domains, and rollback history",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Git workflows",
			support:
				"GitHub, GitLab, Bitbucket, Gitea, generic Git, and webhook-based auto deploys",
		},
		{
			area: "Access control",
			support: "Owner, Admin, and Member roles, with custom Enterprise roles",
		},
		{
			area: "Governance options",
			support:
				"Enterprise SSO, audit logs, whitelabeling, and role-based access control",
		},
		{
			area: "Databases",
			support: "PostgreSQL, MySQL, MongoDB, Redis, and MariaDB",
		},
		{
			area: "Operations",
			support:
				"Monitoring, logs, backups, rollbacks, preview deployments, MCP, and remote server management",
		},
	],
	faqs: {
		heading: "Finance and banking deployment FAQs",
		items: [
			{
				question: "What is private deployment in finance?",
				answer:
					"Private deployment in finance means releasing applications into environments that a financial organization can control, govern, and monitor. It can apply to banking tools, fintech products, internal APIs, customer portals, and data-backed services.",
			},
			{
				question: "Can Dokploy support internal banking tools?",
				answer:
					"Yes. Dokploy can deploy internal tools, dashboards, APIs, background services, and database-backed applications from the same platform. Teams can use self-hosted or managed control-plane models depending on infrastructure policy. Dokploy empowers finance teams to build and test internal tools, including vibe-coded and AI-powered apps, in safe sandbox environments.",
			},
			{
				question: "Does Dokploy support SSO and access control?",
				answer:
					"Dokploy Enterprise includes single sign-on, custom roles, audit logs, and whitelabeling. These options help platform teams define who can view, deploy, manage, or audit services.",
			},
			{
				question: "Can finance teams use Docker Compose with Dokploy?",
				answer:
					"Yes. Dokploy supports Docker Compose for more complex services, including applications that need multiple containers, databases, queues, or supporting infrastructure.",
			},
			{
				question:
					"Should financial institutions choose Dokploy Cloud or self-hosted Dokploy?",
				answer:
					"Use Dokploy Cloud when you want Dokploy to manage the control plane while your apps run on your own servers. Choose self-hosted Dokploy when your institution wants to operate the full platform internally.",
			},
		],
	},
};

export default function FinanceBankingPage() {
	return <IndustryPage data={data} />;
}
