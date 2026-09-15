import { propertyHref, SITE_URL } from "@/lib/utils";
import type { MetadataRoute } from "next";
import {
  getAllPropertiesForSitemap,
  getCitySummaries,
} from "./(publicGroup)/_actions/propertyActions";

const LEGAL_UPDATED_AT = new Date("2026-09-14");

const STATIC_PAGES = [
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, cities] = await Promise.all([
    getAllPropertiesForSitemap(),
    getCitySummaries(),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/properties`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...STATIC_PAGES.map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: LEGAL_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...cities.map((city) => ({
      url: `${SITE_URL}/basha-vara/${city.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...properties.map((property) => ({
      url: `${SITE_URL}${propertyHref(property)}`,
      lastModified: new Date(property.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
