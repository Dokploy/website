import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { FirstFeaturesSection } from "@/components/first-features";
import { Pricing } from "@/components/pricing";
import { SecondaryFeaturesSections } from "@/components/secondary-features";
import { Sponsors } from "@/components/sponsors";
import { StatsSection } from "@/components/stats";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
	params,
}: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<div>
			<main>
				<Hero />
				<FirstFeaturesSection />
				<SecondaryFeaturesSections />
				<StatsSection />
				<Testimonials />
				<div className="w-full relative">
					<Pricing />
				</div>
				<Faqs />
				<Sponsors />
				<CallToAction />
			</main>
		</div>
	);
}
