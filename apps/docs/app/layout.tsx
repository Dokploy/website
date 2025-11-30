import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({
  subsets: ["latin"],
});

export default async function Layout({
  children,
  ...rest
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics gaId="G-HZ71HG38HN" />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
