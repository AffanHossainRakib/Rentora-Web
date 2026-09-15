import type { Metadata } from "next";
import { getCategories, getProperties } from "../_actions/propertyActions";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { PropertyCard } from "../_components/PropertyCard";
import { PropertyFilters } from "./_components/PropertyFilters";
import { PropertyPagination } from "./_components/PropertyPagination";

export const metadata: Metadata = {
  title: "Browse Properties",
  description:
    "Search flats, houses, studios and hostels for rent across Bangladesh by location, price and category.",
  alternates: { canonical: "/properties" },
};

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = {
    searchTerm: first(params.searchTerm),
    location: first(params.location),
    category: first(params.category),
    amenities: first(params.amenities),
    isAvailable: first(params.isAvailable),
    priceMin: first(params.priceMin),
    priceMax: first(params.priceMax),
    page: first(params.page) ?? "1",
  };

  const [propertiesResult, categoriesResult] = await Promise.all([
    getProperties({ ...query, limit: "12" }),
    getCategories(),
  ]);

  const properties = propertiesResult.success
    ? propertiesResult.data.properties
    : [];
  const meta = propertiesResult.meta;
  const categories = categoriesResult.success
    ? categoriesResult.data.categories
    : [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Properties" }]}
      />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Properties</h1>
        <p className="mt-1 text-muted-foreground">
          {meta
            ? `${meta.total} properties found`
            : "Search for your next home"}
        </p>
      </div>

      <PropertyFilters categories={categories} />

      {properties.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No properties match your search. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {meta && meta.totalPage > 1 && (
        <PropertyPagination meta={meta} query={query} />
      )}
    </div>
  );
}
