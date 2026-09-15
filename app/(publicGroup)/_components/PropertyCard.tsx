import { PropertyImage } from "@/components/shared/property-image";
import { Badge } from "@/components/ui/badge";
import { IProperty } from "@/lib/types";
import { formatCurrency, propertyHref } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";

export function PropertyCard({ property }: { property: IProperty }) {
  return (
    <Link
      href={propertyHref(property)}
      className="group flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <PropertyImage
          src={property.pictures[0]}
          alt={`${property.title} in ${property.location}`}
          className="transition-transform group-hover:scale-105"
        />
        {!property.isAvailable && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            Not available
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{property.title}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        {property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="font-normal">
                {amenity}
              </Badge>
            ))}
          </div>
        )}

        <p className="mt-auto pt-2 text-lg font-bold text-primary">
          {formatCurrency(property.price)}
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            /month
          </span>
        </p>
      </div>
    </Link>
  );
}
