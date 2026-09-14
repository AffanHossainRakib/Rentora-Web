import { SITE_URL } from "@/lib/utils";
import type { MetadataRoute } from "next";

const LEGAL_UPDATED_AT = new Date("2026-09-14");

// ponytail: static pages only for now; properties and city pages are added in F6/F8
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...[
      "privacy-policy",
      "terms-and-conditions",
      "cookie-policy",
      "refund-policy",
    ].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: LEGAL_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
