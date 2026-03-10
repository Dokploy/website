import { Pricing } from "@/components/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dokploy Pricing—Simple, Affordable Pricing. For Your Team",
	description:
		"Deploy and manage apps with Dokploy. Compare Dokploy's Hobby, Startup, and Enterprise plans to find the right fit for your team.",
};

export default function PricingPage() {
	return (
		<div className="relative w-full">
			<Pricing />
		</div>
	);
}
