import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import { getAllAdminRentals } from "../_actions/adminActions";
import { RentalsTable } from "./_components/RentalsTable";

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminRentalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = first(params.page) ?? "1";

  const result = await getAllAdminRentals({ page, limit: "10" });
  const rentals = result.success ? result.data.rentalRequests : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Rentals</h1>
        <p className="text-muted-foreground">Every rental request across the platform.</p>
      </div>

      {rentals.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No rentals found.</p>
      ) : (
        <RentalsTable rentals={rentals} />
      )}

      {meta && <TablePagination meta={meta} basePath="/admin-dashboard/rentals" />}
    </div>
  );
}
