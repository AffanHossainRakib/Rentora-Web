import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

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

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Rentora</h1>
      <p className="max-w-md text-muted-foreground">
        Find &amp; list rental properties with ease.
      </p>
      <Button asChild size="lg">
        <Link href="/properties">Browse properties</Link>
      </Button>
    </section>
  );
}
