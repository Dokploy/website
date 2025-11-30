import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch with our team. We're here to help with any questions about Dokploy.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

