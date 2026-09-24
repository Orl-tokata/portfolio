import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Pre-rendered at build time for the static export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
