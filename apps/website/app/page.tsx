import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { FirstFeaturesSection } from "@/components/first-features";
import { Pricing } from "@/components/pricing";
import { SecondaryFeaturesSections } from "@/components/secondary-features";
import { Sponsors } from "@/components/sponsors";
import { StatsSection } from "@/components/stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		absolute: "Dokploy - Deploy your applications with ease",
	},
	description:
		"Open-source self-hostable Platform as a Service (PaaS) that simplifies the deployment and management of applications and databases",
};

export default function Home() {
	return (
		<div>
			<main>
				<Hero />
				<FirstFeaturesSection />
				<SecondaryFeaturesSections />
				<StatsSection />
				<Testimonials />
				<div className="relative w-full">
					<Pricing />
				</div>
				<Faqs />
				{/* <Sponsors /> */}
				<CallToAction />
			</main>
		</div>
	);
}
