import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getLandlordRequests } from "../_actions/landlordActions";
import { RequestsList } from "./_components/RequestsList";

const STATUS_TABS: { label: string; value?: string }[] = [
  { label: "All" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
];

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function LandlordRequestsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const status = first(params.status);
  const page = first(params.page) ?? "1";

  const result = await getLandlordRequests({ status, page, limit: "10" });
  const requests = result.success ? result.data.rentalRequests : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground">Review and respond to incoming requests.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.label}
            href={
              tab.value
                ? `/landlord-dashboard/requests?status=${tab.value}`
                : "/landlord-dashboard/requests"
            }
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              status === tab.value
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <RequestsList requests={requests} />

      {meta && (
        <TablePagination meta={meta} basePath="/landlord-dashboard/requests" query={{ status }} />
      )}
    </div>
  );
}
