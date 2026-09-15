import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { getProperties } from "./_actions/propertyActions";
import { PropertyCard } from "./_components/PropertyCard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rentora",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  areaServed: { "@type": "Country", name: "Bangladesh" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rentora",
  url: SITE_URL,
  inLanguage: "en-BD",
};

export default async function Home() {
  const result = await getProperties({ limit: "6", isAvailable: "true" });
  const properties = result.success ? result.data.properties : [];

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      <section className="flex flex-col items-center justify-center gap-6 px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find Basha Vara Anywhere in Bangladesh
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Browse flats, houses, studios and hostels listed directly by landlords
          across Bangladesh, and pay securely online.
        </p>
        <Button asChild size="lg">
          <Link href="/properties">Browse properties</Link>
        </Button>
      </section>

      {properties.length > 0 && (
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Featured properties
            </h2>
            <Link
              href="/properties"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
