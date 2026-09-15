import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { formatCurrency, SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCitySummaries, getProperties } from "../../_actions/propertyActions";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { PropertyCard } from "../../_components/PropertyCard";

type Props = { params: Promise<{ city: string }> };

const loadCitySummary = async (slug: string) => {
  const summaries = await getCitySummaries();
  return summaries.find((summary) => summary.slug === slug) ?? null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const summary = await loadCitySummary(city);

  if (!summary) notFound();

  return {
    title: `বাসা ভাড়া in ${summary.name}`,
    description: `Find ${summary.count} flats, houses, studios and hostels for rent in ${summary.name}, Bangladesh, listed directly by landlords on Rentora.`,
    alternates: { canonical: `/basha-vara/${city}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const summary = await loadCitySummary(city);

  if (!summary) notFound();

  const result = await getProperties({ location: summary.name, limit: "24" });
  const properties = result.success ? result.data.properties : [];

  if (properties.length === 0) notFound();

  const prices = properties.map((property) => property.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const pageTitle = `বাসা ভাড়া in ${summary.name}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: `${SITE_URL}/properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: `${SITE_URL}/basha-vara/${city}`,
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbJsonLd} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: pageTitle },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"} available in{" "}
          {summary.name}, from {formatCurrency(minPrice)} to{" "}
          {formatCurrency(maxPrice)} per month. Browse verified listings from
          landlords across {summary.name} and request to rent online.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline">
          <Link
            href={`/properties?location=${encodeURIComponent(summary.name)}`}
          >
            See all listings in {summary.name} with filters
          </Link>
        </Button>
      </div>
    </div>
  );
}
