import { SITE_URL } from "@/lib/utils";
import type { MetadataRoute } from "next";

// Only private areas are disallowed. Login, register and payment pages stay crawlable
// and use a noindex meta tag instead, because Google can't see noindex on blocked URLs.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/tenant-dashboard",
        "/landlord-dashboard",
        "/admin-dashboard",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
