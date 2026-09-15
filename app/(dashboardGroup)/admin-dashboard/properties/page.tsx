import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import { PropertyImage } from "@/components/shared/property-image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, propertyHref } from "@/lib/utils";
import Link from "next/link";
import { getAllAdminProperties } from "../_actions/adminActions";

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = first(params.page) ?? "1";

  const result = await getAllAdminProperties({ page, limit: "12" });
  const properties = result.success ? result.data.properties : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Properties</h1>
        <p className="text-muted-foreground">
          Every property listed on Rentora.
        </p>
      </div>

      {properties.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No properties found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col overflow-hidden rounded-xl border"
            >
              <div className="relative aspect-4/3 w-full">
                <PropertyImage
                  src={property.pictures[0]}
                  alt={property.title}
                />
                <Badge
                  variant={property.isAvailable ? "default" : "secondary"}
                  className="absolute left-2 top-2"
                >
                  {property.isAvailable ? "Available" : "Not available"}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <Link
                  href={propertyHref(property)}
                  className="line-clamp-1 font-semibold hover:underline"
                >
                  {property.title}
                </Link>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {property.location}
                </p>
                <p className="font-semibold text-primary">
                  {formatCurrency(property.price)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    /month
                  </span>
                </p>
                {property.landlord && (
                  <p className="text-xs text-muted-foreground">
                    Listed by {property.landlord.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {meta && (
        <TablePagination meta={meta} basePath="/admin-dashboard/properties" />
      )}
    </div>
  );
}
