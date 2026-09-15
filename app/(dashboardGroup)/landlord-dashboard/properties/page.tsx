import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getMyProperties } from "../_actions/landlordActions";
import { LandlordPropertyCard } from "./_components/LandlordPropertyCard";

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function LandlordPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = first(params.page) ?? "1";

  const result = await getMyProperties({ page, limit: "12" });
  const properties = result.success ? result.data.properties : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">
            Manage your listed properties.
          </p>
        </div>
        <Button asChild>
          <Link href="/landlord-dashboard/properties/new">
            <Plus />
            Add property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          You haven&apos;t listed any properties yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <LandlordPropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {meta && (
        <TablePagination
          meta={meta}
          basePath="/landlord-dashboard/properties"
        />
      )}
    </div>
  );
}
