import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Security",
	description:
		"How Dokploy protects customer data and systems: encryption, access control, secure development, vulnerability disclosure, incident response and compliance.",
	alternates: {
		canonical: "https://dokploy.com/security",
	},
};

const linkClass = "text-blue-500 hover:underline";

function ExternalLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={linkClass}
		>
			{children}
		</a>
	);
}

export default function SecurityPage() {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
			<header className="flex flex-col gap-2 text-center">
				<h1 className="text-3xl font-bold">Security at Dokploy</h1>
				<p className="text-muted-foreground">Last updated: November 19, 2026</p>
			</header>

			<section className="flex flex-col gap-4">
				<p>
					Dokploy is used to deploy and operate production applications and
					databases, so customers trust us with source code access, server
					credentials and secrets. This page describes how we protect that data
					on Dokploy Cloud (app.dokploy.com) and how we build and maintain the
					open source Dokploy platform.
				</p>
				<p>
					Questions about this page or our security program can be sent to{" "}
					<a href="mailto:contact@dokploy.com" className={linkClass}>
						contact@dokploy.com
					</a>
					.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Architecture and scope</h2>
				<p>
					Dokploy is available as self-hosted software and as a managed service,
					Dokploy Cloud.
				</p>
				<ul className="list-inside list-disc space-y-2">
					<li>
						<strong>Dokploy Cloud</strong> hosts the control plane: the
						dashboard, API, database and deployment orchestration. Your
						applications and databases run on servers you own, which Dokploy
						Cloud manages over SSH. Application traffic and application data
						stay on your servers and do not pass through Dokploy&apos;s
						infrastructure.
					</li>
					<li>
						<strong>Self-hosted Dokploy</strong> runs entirely on infrastructure
						you control. Dokploy has no access to self-hosted instances, their
						data or their servers. You are responsible for operating and
						updating the instance.
					</li>
				</ul>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Data protection</h2>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Encryption in transit</h3>
					<p>
						All traffic to dokploy.com and app.dokploy.com is served over HTTPS
						with TLS. Communication between Dokploy Cloud and your servers uses
						SSH with key-based authentication.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Encryption at rest</h3>
					<p>
						Sensitive values are encrypted at the application layer with
						AES-256-GCM before they are written to the database, so they are not
						readable in a database dump. This covers environment variables,
						build arguments and build secrets, SSH private keys and telemetry
						provider credentials. User passwords are stored as salted bcrypt
						hashes and are never stored in plain text. Saved AI provider API
						keys are never sent back to the browser.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Backups</h3>
					<p>
						Dokploy Cloud data is backed up automatically twice a day and
						backups are retained for 30 days. Deleted data is permanently purged
						once the backups that contain it expire.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Payment data</h3>
					<p>
						Payments are processed by Stripe. Dokploy never receives or stores
						credit card numbers; we only keep the Stripe customer and
						subscription identifiers.
					</p>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Access control</h2>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Internal access</h3>
					<p>
						Access to Dokploy Cloud production infrastructure is restricted to
						two members of the engineering team, on a least-privilege basis.
						Multi-factor authentication is required for every account with
						production access.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Customer account security</h3>
					<ul className="list-inside list-disc space-y-1">
						<li>Email verification is required to sign up on Dokploy Cloud.</li>
						<li>
							Two-factor authentication (TOTP) and passkeys are available on
							every plan.
						</li>
						<li>
							Users can review their active sessions and revoke any of them.
						</li>
						<li>
							Organizations can control access with built-in roles, and
							Enterprise customers can create custom roles with resource-level
							permissions.
						</li>
						<li>
							Enterprise customers can sign in through their identity provider
							with SSO (OIDC or SAML 2.0) and provision users with SCIM.
						</li>
						<li>
							Audit logs record logins, member and role changes, deployments and
							configuration changes, and can be exported as CSV or JSON.
						</li>
					</ul>
					<p>
						See{" "}
						<Link href="/features/security" className={linkClass}>
							Security, Access Control &amp; Governance
						</Link>{" "}
						for details on these features.
					</p>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Secure development</h2>
				<p>
					Dokploy is open source and developed in public on{" "}
					<ExternalLink href="https://github.com/Dokploy/dokploy">
						GitHub
					</ExternalLink>
					, so anyone can inspect the code that runs our product.
				</p>
				<ul className="list-inside list-disc space-y-1">
					<li>
						Every change is merged through a pull request that requires an
						approving review. Direct pushes and force pushes to the release
						branches are blocked.
					</li>
					<li>
						Every pull request runs automated build, test and type checking
						jobs.
					</li>
					<li>
						Dependabot security updates and GitHub secret scanning are enabled
						on the repository.
					</li>
					<li>
						Security fixes are developed privately and shipped as patch
						releases, so self-hosted users can update before details are
						published.
					</li>
				</ul>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Vulnerability disclosure</h2>
				<p>
					We welcome reports from security researchers. Please report
					vulnerabilities privately through{" "}
					<ExternalLink href="https://github.com/Dokploy/dokploy/security/advisories/new">
						GitHub Security Advisories
					</ExternalLink>{" "}
					or by email to{" "}
					<a href="mailto:contact@dokploy.com" className={linkClass}>
						contact@dokploy.com
					</a>
					, and do not disclose them publicly until a fix is available. Once a
					fix is released, we publish a GitHub Security Advisory and credit the
					reporter unless they prefer to stay anonymous. Our full policy is in{" "}
					<ExternalLink href="https://github.com/Dokploy/dokploy/blob/canary/SECURITY.md">
						SECURITY.md
					</ExternalLink>
					, and past advisories are listed on{" "}
					<ExternalLink href="https://github.com/Dokploy/dokploy/security/advisories">
						GitHub
					</ExternalLink>
					.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Incident response</h2>
				<p>When we become aware of a security incident, we:</p>
				<ol className="list-inside list-decimal space-y-1">
					<li>Investigate the report and contain the issue.</li>
					<li>Fix the root cause and release the fix.</li>
					<li>
						Notify affected customers directly by email, with the actions they
						should take.
					</li>
					<li>
						Publish a public security notice on our{" "}
						<Link href="/blog" className={linkClass}>
							blog
						</Link>{" "}
						with what happened, a timeline, what we changed and what customers
						should do, and update it as we learn more.
					</li>
				</ol>
				<p>
					For an example, see our{" "}
					<Link
						href="/blog/security-notice-ai-provider-api-keys-on-dokploy-cloud"
						className={linkClass}
					>
						security notice about AI provider API keys on Dokploy Cloud
					</Link>
					.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Compliance and privacy</h2>
				<ul className="list-inside list-disc space-y-2">
					<li>
						<strong>SOC 2.</strong> We are working toward SOC 2 compliance.
					</li>
					<li>
						<strong>GDPR and CCPA.</strong> We support data subject rights,
						including access, correction and deletion. Dokploy Cloud accounts
						can be deleted at any time from account settings. See our{" "}
						<Link href="/privacy" className={linkClass}>
							Privacy Policy
						</Link>
						.
					</li>
					<li>
						<strong>Subprocessors.</strong> We use a small number of third
						parties to operate the service, including Stripe (payments), HubSpot
						(product analytics and communications), Google Analytics (website
						analytics) and ProfitWell (subscription metrics). The full list and
						what each one receives is in our{" "}
						<Link href="/privacy" className={linkClass}>
							Privacy Policy
						</Link>
						.
					</li>
					<li>
						<strong>Contracts.</strong> Enterprise customers can request an MSA,
						SLA and compliance documentation by{" "}
						<Link href="/contact" className={linkClass}>
							contacting us
						</Link>
						.
					</li>
				</ul>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Related resources</h2>
				<ul className="list-inside list-disc space-y-1">
					<li>
						<Link href="/privacy" className={linkClass}>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link href="/terms-of-service" className={linkClass}>
							Terms of Service
						</Link>
					</li>
					<li>
						<Link href="/features/security" className={linkClass}>
							Product security features
						</Link>
					</li>
					<li>
						<ExternalLink href="https://github.com/Dokploy/dokploy/blob/canary/SECURITY.md">
							Security policy and vulnerability reporting (SECURITY.md)
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://github.com/Dokploy/dokploy/security/advisories">
							Published security advisories
						</ExternalLink>
					</li>
				</ul>
			</section>
		</div>
	);
}
