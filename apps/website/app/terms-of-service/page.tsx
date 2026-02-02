import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"Terms of Service for Dokploy's cloud and on-premise deployment platform.",
};

export default function TermsOfServicePage() {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-12">
			<h1 className="mb-6 text-center text-3xl font-bold">
				Terms of Service
			</h1>
			<p className="text-center text-sm text-muted-foreground">
				Dokploy.com · Last Updated: January 2026
			</p>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">Overview</h2>
				<p>
					This website and platform are operated by Dokploy Technologies, Inc.
					(&quot;Dokploy&quot;, &quot;we&quot;, &quot;us&quot;, or
					&quot;our&quot;). Dokploy provides a deployment and hosting platform
					available as both a cloud-hosted service (&quot;Cloud Services&quot;)
					and self-hosted software (&quot;On-Premise Software&quot;),
					collectively referred to as the &quot;Services.&quot;
				</p>
				<p>
					By accessing or using our Services, you (&quot;Customer&quot;,
					&quot;you&quot;, or &quot;your&quot;) agree to be bound by these Terms
					of Service (&quot;Terms&quot;), including our Privacy Policy and
					Acceptable Use Policy incorporated herein by reference. If you are
					entering into these Terms on behalf of an organization, you represent
					that you have authority to bind that organization.
				</p>
				<p>
					If you do not agree to these Terms, you may not access or use the
					Services.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 1 – Definitions
				</h2>
				<ul className="list-inside list-disc space-y-1">
					<li>
						<strong>&quot;Authorized Users&quot;</strong> means individuals
						authorized by Customer to access and use the Services under
						Customer&apos;s account.
					</li>
					<li>
						<strong>&quot;Cloud Services&quot;</strong> means the hosted version
						of the Dokploy platform provided and maintained by us, accessible
						via the internet.
					</li>
					<li>
						<strong>&quot;Customer Data&quot;</strong> means all data, content,
						code, applications, and materials uploaded, stored, or processed by
						Customer or its Authorized Users, or on behalf of Customer or its
						Authorized users, through the Services.
					</li>
					<li>
						<strong>&quot;Documentation&quot;</strong> means the user guides,
						technical documentation, and other materials we provide describing
						the functionality and use of the Services.
					</li>
					<li>
						<strong>&quot;Downtime&quot;</strong> means periods when the Cloud
						Services are unavailable, excluding Scheduled Maintenance and
						exclusions defined in the SLA.
					</li>
					<li>
						<strong>&quot;On-Premise Software&quot;</strong> means the
						self-hosted version of the Dokploy platform that Customer installs
						and operates on its own infrastructure.
					</li>
					<li>
						<strong>&quot;Scheduled Maintenance&quot;</strong> means planned
						maintenance windows communicated at least [48/72] hours in advance.
					</li>
					<li>
						<strong>&quot;Services&quot;</strong> means the Cloud Services
						and/or On-Premise Software, as applicable to Customer&apos;s
						subscription.
					</li>
					<li>
						<strong>&quot;Subscription Term&quot;</strong> means the period
						during which Customer has paid for and is entitled to use the
						Services.
					</li>
				</ul>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 2 – Services Description
				</h2>
				<h3 className="text-xl font-medium">2.1 Cloud Services</h3>
				<p>
					The Cloud Services provide a managed deployment and hosting platform
					accessible via the internet. We are responsible for infrastructure
					maintenance, security updates, and platform availability in accordance
					with our Service Level Agreement (Section 7). The services provided
					are permitted to be used by businesses and individuals over the age
					of 18 years.
				</p>
				<h3 className="text-xl font-medium">2.2 On-Premise Software</h3>
				<p>
					The On-Premise Software is licensed for installation on
					Customer&apos;s own infrastructure. Customer is solely responsible for
					the installation, configuration, maintenance, security, backups, and
					availability of the On-Premise Software and the infrastructure on
					which it operates. The Service Level Agreement (Section 7) does not
					apply to On-Premise Software. The services provided are permitted to
					be used by businesses and individuals over the age of 18 years.
				</p>
				<h3 className="text-xl font-medium">2.3 Modifications to Services</h3>
				<p>
					We reserve the right to modify, update, or discontinue features of the
					Services at any time. For material changes that negatively affect
					functionality, we will provide thirty [30] days&apos; notice in
					writing prior to the implementation of the change. Such modifications
					shall not materially reduce the core functionality of the Services
					during an active Subscription Term.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 3 – Account Registration and Responsibilities
				</h2>
				<h3 className="text-xl font-medium">3.1 Eligibility</h3>
				<p>
					You must be at least 18 years of age and capable of forming a binding
					contract to use the Services. By using the Services, you represent
					that you meet these requirements.
				</p>
				<h3 className="text-xl font-medium">3.2 Account Security</h3>
				<p>
					You are responsible for maintaining the confidentiality of your
					account credentials and for all activities that occur under your
					account. You must immediately notify us of any unauthorized use of your
					account or any other breach of security. We are not liable for any
					loss arising from unauthorized use of your account.
				</p>
				<h3 className="text-xl font-medium">3.3 Account Information</h3>
				<p>
					You agree to provide accurate, current, and complete information
					during registration and to update such information to keep it
					accurate, current, and complete. We reserve the right to suspend or
					terminate accounts with inaccurate or incomplete information.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">Section 4 – License Grant</h2>
				<h3 className="text-xl font-medium">4.1 Cloud Services License</h3>
				<p>
					Subject to these Terms and payment of applicable fees, we grant you a
					limited, non-exclusive, non-transferable, non-sublicensable right to
					access and use the Cloud Services during the Subscription Term for
					your internal business purposes.
				</p>
				<h3 className="text-xl font-medium">4.2 On-Premise Software License</h3>
				<p>
					Subject to these Terms and payment of applicable fees, we grant you a
					limited, non-exclusive, non-transferable, non-sublicensable license to
					install and use the On-Premise Software on your own infrastructure
					during the Subscription Term. This license is limited to the number
					of instances, nodes, or users specified in your subscription plan.
					The On-Premise Software may be used solely for Customer&apos;s internal
					business purposes and may not be used to provide services to third
					parties, operate as a managed service, or otherwise make the
					On-Premise Software available to any third party without our prior
					written consent.
				</p>
				<h3 className="text-xl font-medium">4.3 Documentation License</h3>
				<p>
					We grant you a limited, non-exclusive license to use the
					Documentation solely in connection with your authorized use of the
					Services.
				</p>
				<h3 className="text-xl font-medium">4.4 Restrictions</h3>
				<p>
					You shall not: (a) sublicense, sell, resell, transfer, assign, or
					distribute the Services; (b) modify or make derivative works based
					upon the Services; (c) reverse engineer, disassemble, or decompile the
					Services or attempt to discover the source code; (d) access the
					Services to build a competitive product or service; (e) copy any
					features, functions, or graphics of the Services; or (f) use the
					Services in violation of applicable laws.
				</p>
				<h3 className="text-xl font-medium">4.5 Usage Verification</h3>
				<p>
					We may, upon reasonable prior notice and not more than once annually,
					audit Customer&apos;s use of the On-Premise Software solely to verify
					compliance with the license scope and usage limits. Any such audit
					shall be conducted in a manner that does not unreasonably interfere
					with Customer&apos;s operations.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 5 – Acceptable Use Policy
				</h2>
				<h3 className="text-xl font-medium">5.1 General Prohibitions</h3>
				<p>
					You agree not to use the Services to: (a) violate any applicable law,
					regulation, or third-party rights; (b) upload, transmit, or store any
					content that is unlawful, harmful, threatening, abusive, defamatory,
					obscene, or otherwise objectionable; (c) infringe any intellectual
					property rights; (d) transmit viruses, malware, or other malicious
					code; (e) interfere with or disrupt the integrity or performance of
					the Services; (f) attempt to gain unauthorized access to the Services
					or related systems; (g) harass, abuse, or harm another person or
					entity; (h) collect personal information without proper consent; (i)
					access any computer systems without authorization or attempt to
					penetrate or disable any security system; or (j) issue fraudulent
					offers to sell or buy products, services, or investments or otherwise
					engage in fraud.
				</p>
				<p>
					If you discover a violation of the AUP, you must report it within 24
					(twenty-four) hours of the discovery to &lt;insert contact email&gt;
					with as much information as you have including, but not limited to,
					the date and time of the violation and any identifying information
					regarding the violator including e-mail or IP address, if available.
				</p>
				<h3 className="text-xl font-medium">5.2 Hosting-Specific Prohibitions</h3>
				<p>The following activities are strictly prohibited on our platform:</p>
				<ul className="list-inside list-disc space-y-1">
					<li>
						(a) Cryptocurrency mining or any resource-intensive computational
						activities not directly related to your hosted applications;
					</li>
					<li>
						(b) Hosting, distributing, or linking to malware, phishing sites,
						botnets, or any malicious software;
					</li>
					<li>
						(c) Hosting content that exploits minors in any way, including
						child sexual abuse material (CSAM);
					</li>
					<li>
						(d) Operating open proxies, anonymizers, or services designed to
						obscure network traffic origins;
					</li>
					<li>(e) Launching or facilitating denial-of-service (DoS/DDoS) attacks;</li>
					<li>
						(f) Sending spam, unsolicited bulk messages, or phishing
						communications;
					</li>
					<li>
						(g) Circumventing or attempting to circumvent resource limits,
						quotas, or usage restrictions;
					</li>
					<li>
						(h) Hosting content or applications that violate export control
						laws or sanctions.
					</li>
				</ul>
				<h3 className="text-xl font-medium">5.3 Resource Usage</h3>
				<p>
					Your use of computational resources must be consistent with your
					subscription plan. We reserve the right to throttle, suspend, or
					terminate access if your usage materially exceeds normal patterns or
					negatively impacts other customers.
				</p>
				<h3 className="text-xl font-medium">5.4 Enforcement</h3>
				<p>
					Violation of this Acceptable Use policy (hereinafter &quot;AUP&quot;)
					may lead to suspension or termination of your account and legal
					action. We reserve the right to take any other remedial action
					including reporting illegal activities to appropriate law enforcement
					authorities. You may be required to pay for the costs of
					investigation and remedial action related to AUP violations.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 6 – Fees and Payment
				</h2>
				<h3 className="text-xl font-medium">6.1 Subscription Fees</h3>
				<p>
					You agree to pay all fees specified in your subscription plan or Order
					Form. Fees are charged in advance on a monthly or annual basis as
					stated in the subscription plan or Order Form and are non-refundable
					except as expressly provided in these Terms.
				</p>
				<h3 className="text-xl font-medium">6.2 Payment Terms</h3>
				<p>
					Payment is due upon invoice or at the start of each billing period.
					You authorize us to charge your designated payment method for all
					applicable fees. If payment fails, we may suspend access to the
					Services until payment is received.
				</p>
				<h3 className="text-xl font-medium">6.3 Taxes</h3>
				<p>
					All fees are exclusive of taxes. You are responsible for paying all
					applicable taxes, except for taxes based on our net income. If we are
					required to collect or pay taxes, those taxes will be invoiced to you.
				</p>
				<h3 className="text-xl font-medium">6.4 Price Changes</h3>
				<p>
					We may change our pricing at any time. Price changes will take effect
					at the start of your next Subscription Term following thirty [30]
					days&apos; notice. Continued use after price changes constitutes
					acceptance of the new pricing.
				</p>
				<h3 className="text-xl font-medium">6.5 Refunds</h3>
				<p>
					All fees paid pursuant to these Terms of Service are non-refundable
					except as expressly stated in these Terms or required by applicable
					law. Service Credits under Section 7.3 of these Terms are
					Customer&apos;s sole and exclusive remedy for any failure to meet
					uptime commitments and are not cash refunds.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 7 – Service Level Agreement (Cloud Services Only)
				</h2>
				<p>
					This Section 7 applies only to Cloud Services. On-Premise Software
					customers are solely responsible for availability and performance of
					their self-hosted installations.
				</p>
				<h3 className="text-xl font-medium">7.1 Uptime Commitment</h3>
				<p>
					We commit to [99.9%] monthly uptime for the Cloud Services, measured
					as: ((Total Minutes in Month - Downtime Minutes) / Total Minutes in
					Month) × 100.
				</p>
				<h3 className="text-xl font-medium">7.2 Exclusions</h3>
				<p>
					The following are excluded from Downtime calculations: (a) Scheduled
					Maintenance; (b) outages caused by factors outside our reasonable
					control, including force majeure events, internet service provider
					failures, or third-party service outages; (c) outages resulting from
					Customer actions or inactions, including misconfiguration; (d)
					outages during beta or preview features.
				</p>
				<h3 className="text-xl font-medium">7.3 Service Credits</h3>
				<p>
					If we fail to meet our uptime commitment, you may request service
					credits as follows:
				</p>
				<ul className="list-inside list-disc space-y-1">
					<li>99.0% - 99.9% uptime: [10%] credit of monthly fees</li>
					<li>95.0% - 99.0% uptime: [25%] credit of monthly fees</li>
					<li>Below 95.0% uptime: [50%] credit of monthly fees</li>
				</ul>
				<p>
					Credits must be requested within 30 (thirty) days of the incident.
					Credits are applied to future invoices and do not exceed one
					month&apos;s fees. Credits are your sole and exclusive remedy for
					service level failures.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 8 – Support and Maintenance
				</h2>
				<h3 className="text-xl font-medium">8.1 Cloud Services Support</h3>
				<p>
					We provide technical support for Cloud Services via{" "}
					<a
						href="mailto:support@dokploy.com"
						className="text-primary underline hover:no-underline"
					>
						support@dokploy.com
					</a>{" "}
					or chat during Monday-Friday, 9am-6pm EST. Response times vary by plan
					tier as specified in your subscription agreement.
				</p>
				<h3 className="text-xl font-medium">8.2 On-Premise Software Support</h3>
				<p>
					Support for On-Premise Software is limited to software defects and
					installation guidance. We do not provide support for Customer&apos;s
					infrastructure, third-party integrations, or issues arising from
					Customer modifications to the software unless otherwise agreed upon
					with Dokploy.
				</p>
				<h3 className="text-xl font-medium">8.3 Updates and Upgrades</h3>
				<p>
					For Cloud Services, we apply updates and patches automatically. For
					On-Premise Software, we make updates available for download, and
					Customer is responsible for applying them. Major version upgrades may
					require additional fees as specified in your subscription.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">Section 9 – Customer Data</h2>
				<h3 className="text-xl font-medium">9.1 Ownership</h3>
				<p>
					You retain all rights, title, and interest in and to your Customer
					Data. Our use and possession thereof is solely on Customer&apos;s
					behalf and we claim no ownership over Customer Data.
				</p>
				<h3 className="text-xl font-medium">9.2 License to Customer Data</h3>
				<p>
					You grant us a limited, non-exclusive license to access, use, and
					process Customer Data solely as necessary to provide the Services,
					comply with the law, and enforce these Terms during the term defined
					in the Subscription plan. We may process Customer Data and usage
					solely to operate, maintain, support, and improve the Services,
					including for internal usage analytics, performance monitoring, and
					troubleshooting. Any such processing will be performed in accordance
					with the DPA incorporated herein.
				</p>
				<h3 className="text-xl font-medium">9.3 Data Security (Cloud Services)</h3>
				<p>
					We implement industry-standard security measures to protect Customer
					Data in our Cloud Services, including encryption in transit and at
					rest, access controls, and regular security assessments. Our security
					practices are described in our Security Documentation available at{" "}
					<a
						href="https://docs.dokploy.com/docs/core/remote-servers/security"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary underline hover:no-underline"
					>
						docs.dokploy.com/docs/core/remote-servers/security
					</a>
					.
				</p>
				<h3 className="text-xl font-medium">9.4 Data Security (On-Premise Software)</h3>
				<p>
					For On-Premise Software, Customer is solely responsible for
					implementing appropriate security measures, including encryption,
					access controls, network security, and compliance with applicable data
					protection regulations.
				</p>
				<h3 className="text-xl font-medium">9.5 Backups</h3>
				<p>
					For Cloud Services, we perform daily backups and retain them for one
					hundred (100) days. For On-Premise Software, Customer is solely
					responsible for implementing backup procedures.
				</p>
				<h3 className="text-xl font-medium">9.6 Data Portability</h3>
				<p>
					Upon termination, you may export your Customer Data for thirty (30)
					days following termination. After this period, we may delete your
					Customer Data. We are not obligated to retain Customer Data after the
					export period.
				</p>
				<h3 className="text-xl font-medium">9.7 Data Processing</h3>
				<p>
					Our processing of personal data is governed by our Privacy Policy and,
					where applicable, the Data Processing Agreement (hereinafter
					&quot;DPA&quot;) attached hereto as Appendix I and is incorporated by
					reference. The DPA applies only to the extent that the Services
					involve the processing of Personal Data on behalf of the customer. In
					the event of a conflict between these terms and the DPA, the DPA
					shall prevail solely with respect to the Processing of Personal Data.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 10 – Intellectual Property
				</h2>
				<h3 className="text-xl font-medium">10.1 Our Intellectual Property</h3>
				<p>
					The Services, including all software, designs, text, graphics, and
					other content (excluding Customer Data), are owned by us or our
					licensors and are protected by intellectual property laws. These Terms
					do not grant you any rights to our trademarks, service marks, or
					logos.
				</p>
				<h3 className="text-xl font-medium">10.2 Feedback</h3>
				<p>
					If you provide suggestions, ideas, or feedback about the Services
					(&quot;Feedback&quot;), you grant us a perpetual, irrevocable,
					royalty-free, worldwide license to use, modify, and incorporate such
					Feedback into the Services without obligation to you.
				</p>
				<h3 className="text-xl font-medium">10.3 Customer Applications</h3>
				<p>
					You retain all intellectual property rights in applications, code, and
					content you develop or deploy using the Services.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 11 – Confidentiality
				</h2>
				<h3 className="text-xl font-medium">11.1 Definition</h3>
				<p>
					&quot;Confidential Information&quot; means any non-public information
					disclosed by one party to the other that is designated as
					confidential or that a reasonable person would understand to be
					confidential, including pricing, business plans, technical data, and
					Customer Data.
				</p>
				<h3 className="text-xl font-medium">11.2 Obligations</h3>
				<p>
					Each party agrees to: (a) protect the other party&apos;s Confidential
					Information using at least the same degree of care it uses to protect
					its own confidential information of similar nature but with no less
					than reasonable care; (b) use Confidential Information only for
					purposes directly related to performing under these Terms and as
					described in the Subscription Plan or Order Form; and (c) not disclose
					Confidential Information to any third party except as permitted under
					these Terms or with the prior written consent of the disclosing party
					and in accordance with the disclosing party&apos;s privacy policy.
				</p>
				<p>
					Disclosure required by law: Recipient may disclose Confidential
					Information to the extent required by applicable law or a valid Court
					Order provided that the recipient: (a) notifies the disclosing party
					immediately upon receiving notice of such a law or Order so that the
					disclosing party may seek a protective order or other remedies; and
					(b) reasonably cooperates with any efforts by the disclosing party to
					limit or protect the disclosure.
				</p>
				<p>
					Recipient shall promptly notify the disclosing party upon becoming
					aware of any authorized access, use, or disclosure of Confidential
					Information.
				</p>
				<h3 className="text-xl font-medium">11.3 Exceptions</h3>
				<p>
					Confidentiality obligations do not apply to information that: (a) is
					or becomes publicly available without breach; (b) was known prior to
					disclosure; (c) is received from a third party without
					confidentiality restrictions; or (d) is independently developed
					without use of Confidential Information.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 12 – Third-Party Services
				</h2>
				<p>
					The Services may integrate with or rely upon third-party services,
					including container registries, cloud providers, and external APIs.
					Your use of third-party services is subject to their respective
					terms and conditions. We are not responsible for the availability,
					accuracy, or content of third-party services, and we make no
					warranties regarding them.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 13 – Term and Termination
				</h2>
				<h3 className="text-xl font-medium">13.1 Term</h3>
				<p>
					These Terms commence upon your first use of the Services and continue
					until terminated. Subscription Terms automatically renew for
					successive periods of the same duration unless either party provides
					written notice of non-renewal at least thirty [30] days before the
					end of the current term.
				</p>
				<h3 className="text-xl font-medium">13.2 Termination for Convenience</h3>
				<p>
					You may terminate your subscription at any time and without cause by
					providing thirty (30) days written notice. If you terminate for
					convenience under this Section, you will remain liable for the full
					balance of fees due for the remainder of the Term of the Agreement.
					No refunds are provided for unused portions of prepaid fees except as
					expressly stated in Section 6.5.
				</p>
				<h3 className="text-xl font-medium">13.3 Termination for Cause</h3>
				<p>
					Either party may terminate this Agreement for the other&apos;s
					material breach by written notice specifying, in detail, the nature
					of the breach. The breaching party will have thirty (30) days from the
					date the party receives notice of the breach to cure the breach. If
					the breaching party fails to cure the breach within thirty (30) days,
					the other party may terminate at the expiration of the cure period.
				</p>
				<p>
					Either party may terminate this Agreement without advance notice in
					the event that the other party becomes insolvent, files for
					bankruptcy, or ceases business operations.
				</p>
				<h3 className="text-xl font-medium">13.4 Suspension</h3>
				<p>
					We may suspend your access to the Services immediately without notice
					if: (a) you violate the Acceptable Use Policy; (b) your use poses a
					security risk to the Services or other customers; (c) you fail to pay
					fees when due; or (d) we are required to do so by law.
				</p>
				<h3 className="text-xl font-medium">13.5 Effect of Termination</h3>
				<p>
					Upon termination: (a) your license to use the Services immediately
					terminates; (b) you must cease all use of the Services and uninstall
					any On-Premise Software and delete all copies in its possession or
					control; (c) you may export Customer Data for thirty [30] days as
					provided in Section 9.6; (d) each party must return or destroy the
					other party&apos;s Confidential Information. Sections that by their
					nature should survive termination shall survive, including Sections
					9, 10, 11, 14, 15, and 16.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 14 – Warranties and Disclaimers
				</h2>
				<h3 className="text-xl font-medium">14.1 Our Warranties</h3>
				<p>
					We warrant that: (a) we have the authority to enter into these Terms;
					(b) the Services will perform materially in accordance with the
					Documentation; and (c) we will not knowingly introduce viruses or
					malicious code into the Services.
				</p>
				<h3 className="text-xl font-medium">14.2 Disclaimer</h3>
				<p className="uppercase">
					Except as expressly provided in Section 14.1, the Services are
					provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; with no
					representation or warranty of any kind. We disclaim all warranties,
					express or implied, including warranties of merchantability, fitness
					for a particular purpose, non-infringement of intellectual property
					rights, and any warranties arising from course of dealing or usage of
					trade. We do not warrant that the Services will be uninterrupted,
					error-free, or completely secure. Without limiting the generality of
					the foregoing, we have no obligation to indemnify, defend, or hold
					harmless Customer, including without limitation against claims related
					to product liability or infringement of intellectual property
					rights, unless this Agreement specifically provides for such an
					indemnity.
				</p>
				<h3 className="text-xl font-medium">14.3 Beta Features</h3>
				<p>
					Beta, preview, or experimental features are provided &quot;as
					is&quot; without any warranty. We may modify or discontinue beta
					features at any time without notice.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 15 – Limitation of Liability
				</h2>
				<h3 className="text-xl font-medium">15.1 Exclusion of Damages</h3>
				<p className="uppercase">
					To the maximum extent permitted by law, neither party shall be liable
					for any indirect, incidental, special, consequential, or punitive
					damages, including lost profits, lost revenue, lost data, or business
					interruption, regardless of the theory of liability and even if
					advised of the possibility of such damages.
				</p>
				<h3 className="text-xl font-medium">15.2 Liability Cap</h3>
				<p className="uppercase">
					Our total cumulative liability under these Terms shall not exceed the
					greater of: (A) the amounts paid by you to us in the twelve [12]
					months preceding the claim; or (B) the value of the Agreement for the
					preceding twelve (12) months. This limitation applies regardless of
					the form of action, whether in contract, tort, strict liability, or
					otherwise.
				</p>
				<h3 className="text-xl font-medium">15.3 Exceptions</h3>
				<p>
					The limitations in this Section 15 do not apply to: (a) your payment
					obligations; (b) either party&apos;s indemnification obligations; (c)
					breaches of confidentiality; (d) your violation of our intellectual
					property rights; or (e) claims arising from gross negligence or
					willful misconduct.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 16 – Indemnification
				</h2>
				<h3 className="text-xl font-medium">16.1 Your Indemnification</h3>
				<p>
					You agree to indemnify, defend, and hold harmless, at your own cost,
					Dokploy and its officers, directors, employees, and agents from any
					claims, damages, losses, and expenses (including reasonable
					attorneys&apos; fees) arising from: (a) your use of the Services; (b)
					your Customer Data; (c) your violation of these Terms; (d) your
					violation of any third-party rights; or (e) applications or content
					you deploy using the Services.
				</p>
				<h3 className="text-xl font-medium">16.2 Our Indemnification</h3>
				<p>
					We will indemnify and defend you, at our own cost, from third-party
					claims alleging that your authorized use of the Services infringes a
					third party&apos;s intellectual property rights, provided you: (a)
					promptly notify us of the claim; (b) give us sole control of the
					defense and settlement; and (c) provide reasonable cooperation.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 17 – Governing Law and Dispute Resolution
				</h2>
				<h3 className="text-xl font-medium">17.1 Governing Law</h3>
				<p>
					These Terms shall be governed by and construed in accordance with
					the laws of the State of Delaware, United States, without regard to
					its conflict of law principles.
				</p>
				<h3 className="text-xl font-medium">17.2 Dispute Resolution</h3>
				<p>
					[OPTION 1 - ARBITRATION: Any dispute arising from these Terms shall
					be resolved by binding arbitration administered by AAA in accordance
					with its Commercial Arbitration Rules. The arbitration shall be
					conducted in the State of Delaware. The arbitrator&apos;s decision
					shall be final and binding.]
				</p>
				<h3 className="text-xl font-medium">17.3 Waiver of Jury Trial</h3>
				<p className="uppercase">
					Each party waives its right to a jury trial for any dispute arising
					from these Terms.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 19 – Changes to Terms
				</h2>
				<p>
					We may update these Terms from time to time. For material changes, we
					will provide at least thirty [30] days&apos; notice via email or
					through the Services. Your continued use of the Services after the
					effective date of changes constitutes acceptance of the updated Terms.
					If you do not agree to the changes, you may terminate your subscription
					before the changes take effect.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 20 – General Provisions
				</h2>
				<h3 className="text-xl font-medium">20.1 Entire Agreement</h3>
				<p>
					This Agreement is the parties&apos; entire agreement regarding its
					subject matter and supersedes any prior or contemporaneous agreements
					regarding its subject matter. In this Agreement, headings are for
					convenience only and &quot;including&quot; and similar terms are to
					be construed without limitation. Excluding Orders, terms in business
					forms, purchase orders or quotes used by either party will not amend
					or modify this Agreement; any such documents are for administrative
					purposes only. This Agreement may be executed in counterparts
					(including electronic copies and PDFs), each of which is deemed an
					original and which together form one and the same Agreement.
				</p>
				<h3 className="text-xl font-medium">20.2 Waivers and Severability</h3>
				<p>
					Waivers must be signed by the waiving party&apos;s authorized
					representative and cannot be implied from conduct. If any provision of
					this Agreement is held invalid, illegal or unenforceable, it will be
					limited to the minimum extent necessary so the rest of this Agreement
					remains in effect.
				</p>
				<h3 className="text-xl font-medium">20.4 Assignment</h3>
				<p>
					Neither party may assign this Agreement without the prior consent of
					the other party, except that either party may assign this Agreement,
					with notice to the other party, in connection with the assigning
					party&apos;s merger, reorganization, acquisition or other transfer
					of all or substantially all of its assets or voting securities. Any
					non-permitted assignment is void. This Agreement will bind and inure
					to the benefit of each party&apos;s permitted successors and assigns.
				</p>
				<h3 className="text-xl font-medium">20.5 Notices</h3>
				<p>
					A. Except as set out in this Agreement, notices, requests and approvals
					under this Agreement must be in writing to the addresses on the Cover
					Page and will be deemed given: (1) upon receipt if by personal
					delivery, (2) upon receipt if by certified or registered U.S. mail
					(return receipt requested), (3) one day after dispatch if by a
					commercial overnight delivery or (4) upon delivery if by email.
					Either party may update its address with notice to the other.
				</p>
				<p>B. Provider may also send operational notices through the Cloud Service.</p>
				<h3 className="text-xl font-medium">20.6 Force Majeure</h3>
				<p>
					Neither party is liable for a delay or failure to perform this
					Agreement due to a Force Majeure. If a Force Majeure materially
					adversely affects the Cloud Service for 15 or more consecutive days,
					either party may terminate the affected Order(s) upon notice to the
					other and Provider will refund to Customer any pre-paid, unused fees
					for the terminated portion of the Subscription Term. However, this
					Section does not limit Customer&apos;s obligations to pay fees owed.
				</p>
				<h3 className="text-xl font-medium">20.7 Independent Contractors</h3>
				<p>
					The parties are independent contractors. Nothing in these Terms
					creates a partnership, joint venture, agency, or employment
					relationship.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="mb-2 text-2xl font-semibold">
					Section 21 – Contact Information
				</h2>
				<p>
					If you have questions about these Terms of Service, please contact us
					at:
				</p>
				<p className="font-medium">Dokploy Technologies, Inc.</p>
				<p>2912 Steiner St Unit 4
				San Francisco, CA 94123</p>
				<p>
					Email:{" "}
					<a
						href="mailto:contact@dokploy.com"
						className="text-primary underline hover:no-underline"
					>
						contact@dokploy.com
					</a>
				</p>
			</section>

			<section className="flex flex-col gap-2 border-t pt-8">
				<h2 className="mb-4 text-2xl font-semibold">
					Appendix I - Data Processing Addendum
				</h2>
				<p>
					This Data Protection Addendum (&quot;DPA&quot;) is attached to and
					incorporated into the Terms of Service. Customer and Provider enter
					into this DPA by agreeing to the Terms of Service. Capitalized terms
					not defined in this DPA are defined in the Terms of Service or DPA
					Setup Page.
				</p>
				<h3 className="text-xl font-medium">Definitions</h3>
				<ul className="list-inside list-disc space-y-1">
					<li>
						&quot;Agreement&quot; means the Agreement between Customer and
						Provider incorporating the Bonterms Cloud Terms which is specified
						on the DPA Setup Page.
					</li>
					<li>
						&quot;Audit&quot; and &quot;Audit Parameters&quot; are defined in
						Section 9.3 below.
					</li>
					<li>&quot;Audit Report&quot; is defined in Section 9.2 below.</li>
					<li>
						&quot;Controller&quot; means the natural or legal person, public
						authority, agency or other body which, alone or jointly with
						others, determines the purposes and means of Processing of
						Personal Data.
					</li>
					<li>&quot;Customer Instructions&quot; is defined in Section 3.1 below.</li>
					<li>
						&quot;Customer Personal Data&quot; means Personal Data in Customer
						Data (as defined in the Agreement).
					</li>
					<li>
						&quot;Data Protection Laws&quot; means all laws and regulations
						applicable to the Processing of Customer Personal Data under the
						Agreement, including, as applicable: (i) the California Consumer
						Privacy Act, as amended by the California Privacy Rights Act, and
						any binding regulations promulgated thereunder (&quot;CCPA&quot;),
						(ii) the General Data Protection Regulation (Regulation (EU)
						2016/679) (&quot;EU GDPR&quot; or &quot;GDPR&quot;), (iii) the
						Swiss Federal Act on Data Protection (&quot;FADP&quot;), (iv) the EU
						GDPR as it forms part of the law of England and Wales by virtue of
						section 3 of the European Union (Withdrawal) Act 2018 (the &quot;UK
						GDPR&quot;) and (v) the UK Data Protection Act 2018; in each case,
						as updated, amended or replaced from time to time.
					</li>
					<li>
						&quot;Data Subject&quot; means the identified or identifiable
						natural person to whom Customer Personal Data relates.
					</li>
					<li>
						&quot;DPA Effective Date&quot; is specified on the DPA Setup Page.
					</li>
					<li>
						&quot;DPA Setup Page&quot; means a separate document executed by
						Customer and Provider which causes this DPA to become an
						Attachment to their Agreement.
					</li>
					<li>&quot;EEA&quot; means European Economic Area.</li>
					<li>
						&quot;Key Terms&quot; means Agreement, DPA Effective Date and
						Subprocessor List as specified by the parties on the DPA Setup
						Page.
					</li>
					<li>
						&quot;Personal Data&quot; means information about an identified or
						identifiable natural person or which otherwise constitutes
						&quot;personal data&quot;, &quot;personal information&quot;,
						&quot;personally identifiable information&quot; or similar terms
						as defined in Data Protection Laws.
					</li>
					<li>
						&quot;Processing&quot; and inflections thereof refer to any
						operation or set of operations that is performed on Personal Data
						or on sets of Personal Data, whether or not by automated means.
					</li>
					<li>
						&quot;Processor&quot; means a natural or legal person, public
						authority, agency or other body which Processes Personal Data on
						behalf of the Controller.
					</li>
					<li>
						&quot;Restricted Transfer&quot; means: (i) where EU GDPR applies, a
						transfer of Customer Personal Data from the EEA to a country
						outside the EEA that is not subject to an adequacy determination,
						(ii) where UK GDPR applies, a transfer of Customer Personal Data
						from the United Kingdom to any other country that is not subject to
						an adequacy determination or (iii) where FADP applies, a transfer
						of Customer Personal Data from Switzerland to any other country
						that is not subject to an adequacy determination.
					</li>
					<li>
						&quot;Schedules&quot; means one or more schedules incorporated by
						the parties in their DPA Setup Page. The default Schedules for this
						DPA are: Schedule 1 Subject Matter and Details of Processing;
						Schedule 2 Technical and Organizational Measures; Schedule 3
						Cross-Border Transfer Mechanisms; Schedule 4 Region-Specific Term.
					</li>
					<li>
						&quot;Security Incident&quot; means any breach of security that
						leads to the accidental or unlawful destruction, loss, alteration,
						unauthorized disclosure of, or access to, Customer Personal Data
						being Processed by Provider.
					</li>
					<li>&quot;Specified Notice Period&quot; is 48 hours.</li>
					<li>
						&quot;Subprocessor&quot; means any third party authorized by
						Provider to Process any Customer Personal Data.
					</li>
					<li>
						&quot;Subprocessor List&quot; means the list of Provider&apos;s
						Subprocessors as identified or linked to on the DPA Setup Page.
					</li>
				</ul>
				<p className="mt-4">
					The full DPA continues with sections on Scope and Duration, Processing
					of Personal Data, Confidentiality, Compliance with Laws, Subprocessors,
					Security, Data Subject Requests, Data Return or Deletion, Audits, and
					Cross-Border Transfers/Region-Specific Terms. For the complete
					legal text of the Data Processing Addendum, please contact{" "}
					<a
						href="mailto:support@dokploy.com"
						className="text-primary underline hover:no-underline"
					>
						support@dokploy.com
					</a>
					.
				</p>
			</section>
		</div>
	);
}
