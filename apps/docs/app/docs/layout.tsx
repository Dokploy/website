import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { baseUrl, createMetadata } from "@/utils/metadata";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

export const metadata = createMetadata({
  title: {
    template: "%s | Dokploy",
    default: "Dokploy",
  },
  description: "The Open Source Alternative to Vercel, Heroku, and Netlify",
  metadataBase: new URL(baseUrl),
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
