import {
	IndustryPage,
	type IndustryPageData,
} from "@/components/industries/IndustryPage";
import {
	Database,
	Eye,
	FlaskConical,
	History,
	Layers,
	ScrollText,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pharmaceutical Deployment for Regulated Teams",
	description:
		"Use pharmaceutical deployment software to release research tools, lab apps, and regulated internal platforms in controlled environments.",
	alternates: {
		canonical: "https://dokploy.com/industries/pharmaceuticals",
	},
};

const data: IndustryPageData = {
	hero: {
		title: "Pharmaceutical deployment software for controlled releases",
		description:
			"Deploy research tools, lab applications, quality systems, and internal platforms in environments your technology teams can govern. Get a repeatable deployment layer with access control, review workflows, logs, monitoring, and rollback options.",
	},
	features: {
		heading: "Release pharma software with more control and less manual work",
		description:
			"Pharmaceutical teams need to support research, quality, digital operations, and internal tools without letting deployments fragment. Dokploy creates a single deployment workflow that teams can adapt to different applications.",
		items: [
			{
				icon: FlaskConical,
				title: "Deploy lab and research tools privately",
				description:
					"Run internal applications, data tools, dashboards, and service APIs on infrastructure that matches your policy. Choose self-hosted Dokploy or Dokploy Cloud.",
			},
			{
				icon: ScrollText,
				title: "Govern releases with roles and audit logs",
				description:
					"Use permissions to separate developers, reviewers, and administrators. Enterprise teams can add SSO, custom roles, audit logs, and whitelabeling.",
			},
			{
				icon: Eye,
				title: "Review validation environments before merge",
				description:
					"Use preview deployments and staging environments to test changes before they reach production users. Review the running service while prepping for release.",
			},
			{
				icon: Database,
				title: "Support databases and service stacks",
				description:
					"Deploy Docker Compose applications, APIs, background services, and supported databases from the same platform.",
			},
			{
				icon: Layers,
				title: "Keep environments consistent",
				description:
					"Create repeatable projects for research, quality, lab operations, digital products, and internal platforms.",
			},
			{
				icon: History,
				title: "Restore and roll back critical services",
				description:
					"Use backups, deployment history, and rollback options when a release needs to be recovered, so teams can respond faster.",
			},
		],
	},
	comparison: {
		heading: "Regulated software delivery without fragmented infrastructure",
		description:
			"Pharmaceutical technology environments often include research tools, vendor systems, internal apps, and controlled workflows. Dokploy gives teams one platform for releasing and operating software safely.",
		without: {
			title: "Fragmented pharma deployments",
			items: [
				"Teams may use different servers, scripts, or cloud accounts.",
				"Review environments can be inconsistent between applications.",
				"Access, logs, backups, and rollback paths may not be standardized.",
				"Internal tools become harder to support as teams grow.",
				"Deployments depend too heavily on individual infrastructure knowledge.",
				"Separate tools means more work to maintain security.",
			],
		},
		withDokploy: {
			title: "Dokploy for pharmaceutical deployment",
			items: [
				"Applications deploy through a repeatable platform.",
				"Projects and environments can support research, quality, and digital operations.",
				"Git, Docker, Docker Compose, and supported databases are available.",
				"Enterprise controls include SSO, custom roles, audit logs, and whitelabeling.",
				"Monitoring, logs, backups, and rollbacks support ongoing operations.",
				"Create sandboxes where you can deploy safely, even AI-coded software.",
			],
		},
	},
	workflow: {
		heading: "From pharma software repository to controlled release",
		description:
			"Pharmaceutical technology teams can move from code to running service through a clear release path. Each step keeps deployment practical for developers and visible to platform owners.",
		steps: [
			{
				title: "Create the controlled environment",
				description:
					"Set up a project for a lab tool, research app, quality workflow, or internal platform. Use separate environments for review, validation, staging, and production.",
				flow: "Create project → Add environment → Assign roles",
			},
			{
				title: "Connect the service",
				description:
					"Connect a Git repository, Docker image, or Docker Compose file. Dokploy supports flexible build types so each app can use the deployment model that fits its stack.",
				flow: "Select provider → Configure build → Set variables",
			},
			{
				title: "Review the running app",
				description:
					"Deploy changes to preview or staging so reviewers can test the service before production. Logs and deployment history help keep the release path visible.",
				flow: "Open preview → Review logs → Approve release",
			},
			{
				title: "Deploy and operate",
				description:
					"Release the approved version, monitor health, and use rollback or backup options if the service needs to be restored. Keep operations close to the deployment record.",
				flow: "Deploy → Monitor → Restore if needed",
			},
		],
	},
	builtFor: {
		heading: "Built for R&D, quality, and digital operations teams",
		paragraphs: [
			"Dokploy gives pharmaceutical organizations a flexible deployment layer for internal software.",
			"Teams can deploy research platforms, lab tooling, dashboards, APIs, and multi-service apps without creating a separate process for every system.",
			"The platform supports both self-hosted and cloud control-plane models, which gives infrastructure and compliance stakeholders room to choose how closely the deployment platform should sit inside the organization’s own environment.",
		],
		screenshotAlt:
			"Dokploy dashboard for a pharmaceutical R&D platform with separate production and staging environments and running services",
	},
	detailRows: [
		{
			area: "Deployment methods",
			support:
				"Git, Docker, Docker Compose, Nixpacks, Heroku Buildpacks, and custom Dockerfiles",
		},
		{
			area: "Pharma workflows",
			support:
				"Review environments, staging releases, webhook deploys, templates, and deployment history",
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
		heading: "Pharmaceutical deployment software FAQs",
		items: [
			{
				question: "What is pharmaceutical deployment?",
				answer:
					"Pharmaceutical deployment is the process of releasing research tools, lab applications, quality workflows, internal platforms, and related services into controlled environments.",
			},
			{
				question: "How does Dokploy support regulated software teams?",
				answer:
					"Dokploy supports controlled deployment workflows with projects, environments, permissions, logs, monitoring, backups, and rollback options. Enterprise features add SSO, custom roles, audit logs, and whitelabeling.",
			},
			{
				question: "Can Dokploy run private pharmaceutical applications?",
				answer:
					"Yes. Dokploy can be self-hosted, or teams can use Dokploy Cloud while deploying applications on their own connected servers. Both models can support internal and private application deployment.",
			},
			{
				question: "Does Dokploy support databases for pharma apps?",
				answer:
					"Yes. Dokploy supports PostgreSQL, MySQL, MongoDB, Redis, and MariaDB, which can be used for internal tools, dashboards, and application services.",
			},
			{
				question: "Should pharmaceutical teams self-host Dokploy?",
				answer:
					"Self-hosting is a good fit when teams need to operate the full platform internally. Dokploy Cloud can be a better fit when teams want a managed control plane while keeping application workloads on their own servers.",
			},
		],
	},
};

export default function PharmaceuticalsPage() {
	return <IndustryPage data={data} />;
}
