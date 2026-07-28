import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import { Activity, Bot, Eye, GitBranch, KeyRound, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Software Deployment Tools for Government Industry",
	description:
		"Use software deployment tools for government teams to release citizen services and internal apps in self-hosted, audit-ready environments.",
	alternates: {
		canonical: "https://dokploy.com/industries/government",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "Software deployment tools for governments",
		description:
			"Deploy citizen-facing services, case management systems, and internal department tools without handing infrastructure control to an outside vendor. Dokploy gives teams a self-hosted platform for private deployment and consistent oversight.",
	},
	features: {
		heading:
			"Ship public sector software without losing infrastructure control",
		description:
			"Government agencies need to ship software while keeping data and infrastructure under direct control. With Dokploy, teams release from Git and Docker, while IT manages access and audit trails.",
		items: [
			{
				icon: Server,
				title: "Host inside your own infrastructure",
				description:
					"Run citizen services and departmental apps on servers you control. Self-host the full platform, including air-gapped installs – data can't leave agency-owned infrastructure.",
			},
			{
				icon: GitBranch,
				title: "Connect Git workflows to governed deployments",
				description:
					"Deploy from GitHub, GitLab, Bitbucket, Gitea, generic Git, Docker, or Docker Compose. Development teams keep familiar workflows while IT maintains oversight.",
			},
			{
				icon: KeyRound,
				title: "Separate departments with roles and environments",
				description:
					"Create projects around agencies, departments, or programs. SSO, custom roles, and audit logs keep access aligned with agency policy.",
			},
			{
				icon: Eye,
				title: "Review changes before public release",
				description:
					"Use preview and staging environments to test updates before they reach citizens or staff. Reviewers can check the running application, not just a code diff.",
			},
			{
				icon: Activity,
				title: "Monitor services across departments",
				description:
					"Track application health, server metrics, logs, domains, and deployments from one platform, so IT teams have consistent visibility.",
			},
			{
				icon: Bot,
				title: "Power your AI deployment process",
				description:
					"Build AI sandboxes where non-technical staff can test vibe-coded software in a secure, controlled environment, without touching production systems.",
			},
		],
	},
	comparison: {
		heading: "Government software deployment without losing data control",
		description:
			"Commercial cloud accounts can become difficult to govern across departments, citizen-facing services, and compliance-sensitive systems. Dokploy centralizes the deployment layer while teams stay productive.",
		without: {
			title: "Generic cloud deployment",
			items: [
				"Teams may depend on infrastructure and data centers outside their control.",
				"Release processes vary between departments and vendors.",
				"Access reviews, logs, and backups can sit in different tools.",
				"Non-technical staff need IT support to test even simple AI-generated tools.",
				"Security teams have limited visibility into unsanctioned or shadow IT apps.",
			],
		},
		withDokploy: {
			title: "Dokploy self-hosted",
			items: [
				"Applications deploy inside self-hosted or air-gapped infrastructure your agency controls.",
				"Admins manage projects, users, services, and servers centrally.",
				"Enterprise options include SSO, custom roles, audit logs, and whitelabeling.",
				"Non-technical staff can test AI-built tools inside a sandboxed environment.",
				"IP allowlisting keeps internal systems off the public internet.",
			],
		},
	},
	workflow: {
		heading: "From government app repository to controlled release",
		description:
			"Dokploy makes release management a clear, repeatable workflow. Developers can ship from their repositories, while IT teams keep the environment, access model, and release path consistent.",
		steps: [
			{
				title: "Create the governed environment",
				description:
					"Set up a project for a citizen service, internal tool, or department platform. Use separate environments for development, review, staging, and production.",
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
					"Deploy changes into a preview or staging environment for IT, security, and department review. Stakeholders can test the running service before it reaches citizens or staff.",
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
		heading: "Built for government IT and departmental teams",
		paragraphs: [
			"Government IT teams often end up stitching together one-off servers, scripts, and vendor tools per department.",
			"Dokploy replaces that patchwork with a single deployment layer, so oversight bodies get one consistent audit trail instead of piecing records together from a dozen systems, and smaller departments can ship without waiting on a custom platform build.",
		],
		screenshotAlt:
			"Dokploy dashboard for a government project with production and staging environments and running services",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Government workflows",
			support:
				"Review environments, staging releases, webhook deploys, and deployment history",
		},
		{
			area: "Access control",
			support: "Owner, Admin, and Member roles, with custom Enterprise roles",
		},
		{
			area: "Governance options",
			support:
				"Enterprise SSO, audit logs, whitelabeling, IP allowlisting, and air-gapped self-hosted deployment",
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
		heading: "Government software deployment FAQs",
		items: [
			{
				question: "What is government software deployment?",
				answer:
					"Government software deployment is the process of releasing citizen-facing services, case management systems, internal dashboards, and other public sector applications into environments that agency IT teams can control and audit.",
			},
			{
				question: "Can Dokploy run in an air-gapped government environment?",
				answer:
					"Yes. Dokploy Enterprise Self-Hosted can run in air-gapped or private networks, so the application, database, and control plane stay inside infrastructure your agency owns.",
			},
			{
				question:
					"Does Dokploy support SSO and audit logs for government agencies?",
				answer:
					"Yes. Dokploy Enterprise includes SSO via SAML and OIDC, with native integrations for Okta, Azure AD, Auth0, and Keycloak, along with audit logs covering logins, deployments, and configuration changes, and custom RBAC roles.",
			},
			{
				question:
					"Can non-technical staff safely test AI-generated tools with Dokploy?",
				answer:
					"Yes. Dokploy is an application deployment platform that lets teams create sandboxed environments where non-technical staff can deploy and test AI-generated or vibe-coded tools without touching production systems, while IT keeps oversight through audit logs, multitenancy, and access controls.",
			},
			{
				question:
					"Should government agencies choose Dokploy Cloud or self-hosted Dokploy?",
				answer:
					"Use Dokploy Cloud when you want Dokploy to manage the control plane while your agency's applications run on your own servers. Choose self-hosted Dokploy, including air-gapped installs, when your agency needs to operate the full platform entirely within its own network.",
			},
		],
	},
};

export default function GovernmentPage() {
	return <IndustryPage data={data} />;
}
