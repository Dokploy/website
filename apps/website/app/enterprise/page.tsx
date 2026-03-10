import { EnterpriseLanding } from "@/components/EnterpriseLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dokploy Enterprise | Secure, Flexible App Deployment",
	description:
		"Deploy on-premises or in the cloud with enterprise-grade security, SSO, audit logs, fine-grained RBAC, and dedicated SLAs. Scale on your own terms.",
};

export default function EnterprisePage() {
	return <EnterpriseLanding />;
}
