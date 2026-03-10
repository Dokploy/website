import { Pricing } from "@/components/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pricing",
	description:
		"Simple, affordable pricing for Dokploy. Choose the plan that fits your needs.",
};

export default function PricingPage() {
	return (
		<div className="relative w-full">
			<Pricing />
		</div>
	);
}
