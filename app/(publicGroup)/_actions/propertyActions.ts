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

// Bangladesh's 64 districts. A "city" only counts if it matches one of these, so bad free-text
// location data (e.g. a landlord entering "Pent-House" as the location) can't produce a fake city.
const BANGLADESH_DISTRICTS = new Set(
  [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Barisal", "Bhola", "Bogura", "Bogra",
    "Brahmanbaria", "Chandpur", "Chattogram", "Chittagong", "Chuadanga", "Cox's Bazar",
    "Coxs Bazar", "Cumilla", "Comilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
    "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jessore", "Jhalokati",
    "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia",
    "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
    "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
    "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur",
    "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur",
    "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
  ].map((district) => district.toLowerCase()),
);

const isKnownCity = (name: string) => BANGLADESH_DISTRICTS.has(name.toLowerCase());

export type ICitySummary = { slug: string; name: string; count: number };

export const getCitySummaries = cache(async (): Promise<ICitySummary[]> => {
  const properties = await getAllPropertiesForSitemap();
  const cities = new Map<string, ICitySummary>();

  properties.forEach((property) => {
    const name = cityNameFromLocation(property.location);
    if (!isKnownCity(name)) return;

    const slug = slugify(name);
    if (!slug) return;

    const existing = cities.get(slug);
    cities.set(slug, { slug, name, count: (existing?.count ?? 0) + 1 });
  });

  return Array.from(cities.values());
});
