import { Inter, Lexend } from "next/font/google";
import "@/styles/tailwind.css";
import "react-photo-view/dist/react-photo-view.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
	metadataBase: new URL("https://dokploy.com"),
	title: {
		default: "Dokploy - Effortless Deployment Solutions",
		template: "%s | Simplify Your DevOps",
	},
	icons: {
		icon: "icon.svg",
		apple: "apple-touch-icon.png",
	},
	alternates: {
		canonical: "https://dokploy.com",
		languages: {
			en: "https://dokploy.com",
		},
	},
	description:
		"Streamline your deployment process with Dokploy. Effortlessly manage applications and databases on any VPS using Docker and Traefik for improved performance and security.",
	applicationName: "Dokploy",
	keywords: [
		"Dokploy",
		"Docker",
		"Traefik",
		"deployment",
		"VPS",
		"application management",
		"database management",
		"DevOps",
		"cloud infrastructure",
		"UI Self hosted",
	],
	referrer: "origin",
	robots: "index, follow",
	openGraph: {
		type: "website",
		url: "https://dokploy.com",
		title: "Dokploy - Effortless Deployment Solutions",
		description:
			"Simplify your DevOps with Dokploy. Deploy applications and manage databases efficiently on any VPS.",
		siteName: "Dokploy",
		images: [
			{
				url: "https://dokploy.com/og.png",
			},
			{
				url: "https://dokploy.com/icon.svg",
				width: 24,
				height: 24,
				alt: "Dokploy Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@Dokploy",
		creator: "@Dokploy",
		title: "Dokploy - Simplify Your DevOps",
		description:
			"Deploy applications and manage databases with ease using Dokploy. Learn how our platform can elevate your infrastructure management.",
		images: "https://dokploy.com/og.png",
	},
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<div className="flex h-full flex-col">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
