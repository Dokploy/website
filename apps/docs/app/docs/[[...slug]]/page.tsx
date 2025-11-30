import { source } from "@/lib/source";
import { openapi } from "@/lib/source";
import { baseUrl } from "@/utils/metadata";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound, permanentRedirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    permanentRedirect("/docs/core");
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            ImageZoom: (props) => <ImageZoom {...(props as any)} />,
            p: ({ children }) => (
              <p className="text-[#3E4342] dark:text-muted-foreground">
                {children}
              </p>
            ),
            li: ({ children, id }) => (
              <li
                {...{ id }}
                className="text-[#3E4342] dark:text-muted-foreground"
              >
                {children}
              </li>
            ),
            APIPage: openapi.APIPage,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,

    description: page.data.description,
    robots: "index,follow",
    alternates: {
      canonical: new URL(`${baseUrl}${page.url}`).toString(),
      languages: {
        en: `${baseUrl}/${page.url}`,
      },
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: new URL(`${baseUrl}`).toString(),
      images: [
        {
          url: new URL(`${baseUrl}/logo.png`).toString(),
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@getdokploy",
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: new URL(`${baseUrl}/logo.png`).toString(),
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    applicationName: "Dokploy Docs",
    keywords: [
      "dokploy",
      "vps",
      "open source",
      "cloud",
      "self hosting",
      "free",
    ],
    icons: {
      icon: "/icon.svg",
    },
  };
}
