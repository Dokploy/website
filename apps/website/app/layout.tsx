import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/tailwind.css";
import "react-photo-view/dist/react-photo-view.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
	children: ReactNode;
};

// export const metadata: Metadata = {
// 	metadataBase: new URL("https://dokploy.com"),
// 	title: "Dokploy - Deploy your applications with ease",
// 	description: "Deploy your applications with ease using Dokploy",
// 	icons: {
// 		icon: "icon.svg",
// 		apple: "apple-touch-icon.png",
// 	},
// 	openGraph: {
// 		title: "Dokploy - Deploy your applications with ease",
// 		description: "Deploy your applications with ease using Dokploy",
// 		images: "favicon.ico",
// 		type: "website",
// 	},
// 	twitter: {
// 		card: "summary_large_image",
// 		title: "Dokploy - Deploy your applications with ease",
// 		description: "Deploy your applications with ease using Dokploy",
// 		images: ["/og.png"],
// 	},
// };
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
});
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={clsx(
				"h-full scroll-smooth antialiased",
				inter.variable,
				lexend.variable,
			)}
		>
			<head>
				<script
					type="text/javascript"
					id="hs-script-loader"
					async
					defer
					src="//js-eu1.hs-scripts.com/147033433.js"
				/>
			</head>
			<body>
				<GoogleAnalytics gaId="G-0RTZ5EPB26" />
				<div className="flex h-full flex-col">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
