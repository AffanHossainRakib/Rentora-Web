import { backendGet } from "@/lib/api";
import { IApiResponse, IProperty } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { cache } from "react";

export type IPropertyQuery = {
  searchTerm?: string;
  location?: string;
  category?: string;
  amenities?: string;
  isAvailable?: string;
  priceMin?: string;
  priceMax?: string;
  page?: string;
  limit?: string;
};

export const getProperties = async (query: IPropertyQuery = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ properties: IProperty[] }>(
    `/properties?${params.toString()}`,
    {
      next: { revalidate: 60, tags: ["properties"] },
    },
  );
};

export const getPropertyById = async (
  id: string,
): Promise<IApiResponse<IProperty>> => {
  const result = await backendGet<{ property: IProperty }>(
    `/properties/${id}`,
    {
      next: { revalidate: 60, tags: ["properties", `property-${id}`] },
    },
  );

  return result.success
    ? { ...result, data: result.data.property }
    : (result as unknown as IApiResponse<IProperty>);
};

export const getCategories = async () => {
  return backendGet<{ categories: string[] }>("/categories", {
    next: { revalidate: 3600, tags: ["categories"] },
  });
};

const MAX_SITEMAP_PAGES = 10;

export const getAllPropertiesForSitemap = cache(async () => {
  const properties: IProperty[] = [];
  let page = 1;

  while (page <= MAX_SITEMAP_PAGES) {
    const result = await getProperties({ page: String(page), limit: "100" });
    if (!result.success) break;

    properties.push(...result.data.properties);

    if (!result.meta || page >= result.meta.totalPage) break;
    page += 1;
  }

  return properties;
});

export const cityNameFromLocation = (location?: string | null) =>
  (location ?? "").split(",")[0].trim();

export type ICitySummary = { slug: string; name: string; count: number };

export const getCitySummaries = cache(async (): Promise<ICitySummary[]> => {
  const properties = await getAllPropertiesForSitemap();
  const cities = new Map<string, ICitySummary>();

  properties.forEach((property) => {
    const name = cityNameFromLocation(property.location);
    const slug = slugify(name);
    if (!slug) return;

    const existing = cities.get(slug);
    cities.set(slug, { slug, name, count: (existing?.count ?? 0) + 1 });
  });

  return Array.from(cities.values());
});
