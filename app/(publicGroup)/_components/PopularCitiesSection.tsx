import { MapPin } from "lucide-react";
import Link from "next/link";
import { ICitySummary } from "../_actions/propertyActions";

export function PopularCitiesSection({ cities }: { cities: ICitySummary[] }) {
  const topCities = [...cities].sort((a, b) => b.count - a.count).slice(0, 6);

  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            বাসা ভাড়া by City
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse listings in popular cities across Bangladesh.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/basha-vara/${city.slug}`}
              className="flex items-center justify-between rounded-xl border bg-background p-4 transition-colors hover:border-primary"
            >
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="size-4 text-primary" />
                {city.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {city.count} {city.count === 1 ? "listing" : "listings"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
