import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  extractIdFromSlug,
  formatCurrency,
  isValidImageUrl,
  propertyHref,
  SITE_URL,
} from "@/lib/utils";
import { getMe } from "@/service/getMe";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getPropertyById } from "../../_actions/propertyActions";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { ImageGallery } from "./_components/ImageGallery";
import { LandlordCard } from "./_components/LandlordCard";
import { RequestRentDialog } from "./_components/RequestRentDialog";
import { ReviewList } from "./_components/ReviewList";

type Props = { params: Promise<{ slug: string }> };

const loadProperty = async (slug: string) => {
  const id = extractIdFromSlug(slug);
  if (!id) return null;

  const result = await getPropertyById(id);
  return result.success ? result.data : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await loadProperty(slug);

  if (!property) notFound();

  const ogImage = property.pictures.find(isValidImageUrl);

  return {
    title: `${property.title} for Rent in ${property.location}`,
    description:
      property.description?.slice(0, 155) ??
      `${property.title} for rent in ${property.location} at ${formatCurrency(property.price)}/month on Rentora.`,
    alternates: { canonical: propertyHref(property) },
    openGraph: ogImage ? { images: [ogImage] } : undefined,
  };
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) notFound();

  const [result, user] = await Promise.all([getPropertyById(id), getMe()]);

  if (!result.success) notFound();

  const property = result.data;
  const canonicalSlug = propertyHref(property).replace("/properties/", "");

  if (slug !== canonicalSlug) {
    permanentRedirect(`/properties/${canonicalSlug}`);
  }

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
        name: property.title,
        item: `${SITE_URL}${propertyHref(property)}`,
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
          { label: property.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ImageGallery pictures={property.pictures} title={property.title} />

          <div className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {property.title}
              </h1>
              {!property.isAvailable && (
                <Badge variant="secondary">Not available</Badge>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {property.location}
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(property.price)}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                /month
              </span>
            </p>
          </div>

          {property.description && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="whitespace-pre-line text-muted-foreground">
                {property.description}
              </p>
            </div>
          )}

          {property.amenities.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <ReviewList reviews={property.reviews} />
          </div>
        </div>

        <div className="space-y-4">
          <LandlordCard landlord={property.landlord} />

          <div className="rounded-xl border p-4">
            {!user && (
              <Button asChild size="lg" className="w-full">
                <Link
                  href={`/login?redirectTo=${encodeURIComponent(propertyHref(property))}`}
                >
                  Login to Request
                </Link>
              </Button>
            )}

            {user?.role === "TENANT" && property.isAvailable && (
              <RequestRentDialog propertyId={property.id} />
            )}

            {user?.role === "TENANT" && !property.isAvailable && (
              <Button size="lg" disabled className="w-full">
                Not Available
              </Button>
            )}

            {user && user.role !== "TENANT" && (
              <p className="text-sm text-muted-foreground">
                Only tenant accounts can request to rent a property.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
