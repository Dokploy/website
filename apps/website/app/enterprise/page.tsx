import { EnterpriseLanding } from "@/components/EnterpriseLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Enterprise - Deploy Anywhere, Without Compromise",
	description:
		"Scale with confidence. Deploy on-premises or in the cloud with enterprise security, compliance, and support built for organizations that demand the best.",
};

export default function EnterprisePage() {
	return <EnterpriseLanding />;
}
