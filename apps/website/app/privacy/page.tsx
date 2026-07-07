import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"Learn about how Dokploy collects, uses, and safeguards your personal information when you use our website and services.",
};

export default function PrivacyPage() {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-12">
			<h1 className="mb-6 text-center text-3xl font-bold">
				 Dokploy Privacy Policy
			</h1>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Introduction</h2>
				<p>
					At Dokploy, we are committed to protecting your privacy. This Privacy
					Policy explains how we collect, use and safeguard your personal
					information when you use our website (dokploy.com), documentation
					(docs.dokploy.com) and services, including our hosted platform
					(app.dokploy.com). By using Dokploy, you agree to the practices
					described in this policy. If you do not agree with these practices,
					please do not use our services.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">1. Information We Collect</h2>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">
						Website and documentation analytics
					</h3>
					<p>
						We use Google Analytics to measure traffic and usage on dokploy.com
						and docs.dokploy.com. Google Analytics collects cookies, IP
						addresses, device and browser information and usage statistics (for
						example, page views and session duration) to generate anonymised
						reports. This data helps us understand how users interact with the
						site and improve the user experience. We do not combine this data
						with information that directly identifies you.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Application analytics</h3>
					<p>
						Our hosted platform (app.dokploy.com) uses{" "}
						<a
							href="https://legal.hubspot.com/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:underline"
						>
							HubSpot analytics
						</a>{" "}
						and marketing tools to understand how users navigate the app and to
						send product updates and marketing communications. HubSpot may
						collect usage metrics, device information, contact details you
						voluntarily provide (such as name and email) and marketing
						preferences.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Contact and account information</h3>
					<p>
						If you contact us, request a demo or register for an account, we may
						collect your name, email address, company name and any message you
						include. When you sign up for the hosted platform, we collect account
						details and log‑in credentials as described in our main privacy
						policy.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">Payment and subscription data</h3>
					<p>
						When you subscribe to Dokploy Cloud, we use Stripe to process
						payments and ProfitWell to analyse subscription metrics. Stripe
						collects payment details (e.g., credit‑card numbers) and billing
						information; we receive the Stripe customer ID and subscription ID
						only. ProfitWell aggregates revenue data to provide insights into
						subscription metrics; it does not receive individual user contact
						information.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-medium">
						Server metrics and deployment data
					</h3>
					<p>
						If you deploy applications or databases through Dokploy, our platform
						collects server and container metrics (CPU, memory, disk and network
						usage), environment variables, deployment logs and backup credentials
						to operate and maintain your deployments. This data is used strictly
						to provide the service and is retained as configured by you (see
						Section 5). No PII data is collected through these processes.
					</p>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">2. How We Use the Information</h2>
				<p>We use the information we collect to:</p>
				<ul className="list-inside list-disc space-y-1">
					<li>
						Provide and maintain our services, including hosting deployments and
						processing subscriptions.
					</li>
					<li>
						Improve the functionality and user experience of our website and
						platform.
					</li>
					<li>
						Communicate with you about updates, promotions or service‑related
						notices.
					</li>
					<li>
						Analyse aggregated metrics (e.g., website traffic, subscription
						revenue) to improve our business.
					</li>
					<li>
						Comply with legal obligations and enforce our terms of service.
					</li>
				</ul>
				<p>We do not sell, trade or rent your personal data.</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">
					3. Cookies and Tracking Technologies
				</h2>
				<p>
					Dokploy uses cookies and similar technologies for two purposes: (1) to
					manage user sessions (authentication cookies) and (2) to run analytics
					and marketing tools. Google Analytics sets cookies to distinguish
					individual browsers and report usage statistics. HubSpot sets cookies
					to track visits, remember preferences and send marketing messages. You
					can opt out of Google Analytics by installing the Google Analytics
					opt‑out browser add‑on or by adjusting your browser settings to block
					cookies. HubSpot's tracking can be limited by adjusting cookie
					preferences in the cookie banner (when available) or by sending a "Do
					Not Track" signal through your browser. If you disable cookies
					entirely, some features of the site or app may not function properly.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">4. Third‑Party Services</h2>
				<p>
					We work with a small number of trusted third parties to operate our
					platform:
				</p>
				<ul className="list-inside list-disc space-y-1">
					<li>
						<strong>Google Analytics</strong> – provides anonymised website and
						documentation analytics.
					</li>
					<li>
						<strong>HubSpot</strong> – provides analytics and marketing services
						for our website and app.
					</li>
					<li>
						<strong>Stripe</strong> – processes payments for our cloud service; we
						receive customer and subscription IDs only.
					</li>
					<li>
						<strong>ProfitWell</strong> – provides subscription and revenue
						metrics for internal business analysis.
					</li>
					<li>
						<strong>Version‑control providers and storage services</strong> – when
						you deploy applications, you may authorise us to access code
						repositories (e.g., GitHub, GitLab) and backup storage (e.g., AWS S3,
						Backblaze B2, Cloudflare R2); we securely encrypt and store the
						credentials you provide only to deliver the service.
					</li>
				</ul>
				<p>
					We share your information with these providers only to the extent
					necessary to perform their services. Each third party is contractually
					obligated to protect your data.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">5. Data Retention</h2>
				<ul className="list-inside list-disc space-y-2">
					<li>
						Analytics data is stored by Google and HubSpot according to their
						retention policies. We review aggregated analytics data periodically
						and delete or anonymise it when no longer needed.
					</li>
					<li>
						Server metrics and logs are retained for the period you configure
						(e.g., metrics retention days, backup schedules).
					</li>
					<li>
						Account and contact information is retained while you have an active
						relationship with us; if you delete your account or unsubscribe, we
						will delete or anonymise your personal data, except to comply with
						legal obligations.
					</li>
				</ul>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">6. Data Security</h2>
				<p>
					We take reasonable technical and organisational measures to protect
					your data from loss, misuse and unauthorised access. This includes
					using encryption for data in transit, secure storage of access keys and
					credentials and limiting employee access to personal data. However, no
					method of transmission or storage is 100% secure; please use strong
					passwords and keep your login credentials confidential.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">7. Your Rights and Choices</h2>
				<p>
					If you are located in the European Economic Area (EEA), United Kingdom
					or Switzerland, you have rights under the General Data Protection
					Regulation (GDPR), including the right to access, rectify or delete
					your personal data, restrict or object to processing and data
					portability. You may also withdraw consent at any time. If you are a
					California resident, you have rights under the California Consumer
					Privacy Act (CCPA), including the right to know what personal
					information we collect, the right to request deletion of your personal
					information and the right to opt out of the sale or sharing of your
					data. Dokploy does not sell your personal data.
				</p>
				<p>
					To exercise these rights or opt out of analytics and marketing cookies,
					please contact us at{" "}
					<a
						href="mailto:support@dokploy.com"
						className="text-blue-500 hover:underline"
					>
						support@dokploy.com
					</a>
					. We will honour verified requests within the time frames required by
					law.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">
					8. Changes to This Privacy Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. Any changes will
					be posted on this page, and it is your responsibility to review this
					policy periodically. Continued use of the services after any changes
					constitutes acceptance of the new policy.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">9. Contact Information</h2>
				<p>
					If you have any questions or concerns regarding this Privacy Policy or
					wish to exercise your privacy rights, please contact us at:
				</p>
				<p>
					Email:{" "}
					<a
						href="mailto:support@dokploy.com"
						className="text-blue-500 hover:underline"
					>
						support@dokploy.com
					</a>
				</p>
			</section>
		</div>
	);
}
