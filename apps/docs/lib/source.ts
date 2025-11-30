import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { createOpenAPI } from "fumadocs-openapi/server";
import { attachFile } from "fumadocs-openapi/server";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  // pageTree: {
  // 	attachFile,
  // },
});

export const openapi = createOpenAPI({
  // options
});
