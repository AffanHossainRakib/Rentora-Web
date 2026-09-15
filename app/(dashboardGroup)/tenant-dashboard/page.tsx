import { StatCard } from "@/app/(dashboardGroup)/_components/StatCard";
import { StatusBadge } from "@/app/(dashboardGroup)/_components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate, propertyHref } from "@/lib/utils";
import { CheckCircle2, ClipboardList, Clock, Home } from "lucide-react";
import Link from "next/link";
import { getMyRentalRequests } from "./_actions/tenantActions";

export default async function TenantDashboardPage() {
  const [totalRes, pendingRes, activeRes, completedRes, recentRes] =
    await Promise.all([
      getMyRentalRequests({ limit: "1" }),
      getMyRentalRequests({ status: "PENDING", limit: "1" }),
      getMyRentalRequests({ status: "ACTIVE", limit: "1" }),
      getMyRentalRequests({ status: "COMPLETED", limit: "1" }),
      getMyRentalRequests({ limit: "5" }),
    ]);

  const recent = recentRes.success ? recentRes.data.rentalRequests : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          A summary of your rental activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Requests"
          value={totalRes.meta?.total ?? 0}
          icon={ClipboardList}
        />
        <StatCard
          label="Pending"
          value={pendingRes.meta?.total ?? 0}
          icon={Clock}
        />
        <StatCard
          label="Active Rentals"
          value={activeRes.meta?.total ?? 0}
          icon={Home}
        />
        <StatCard
          label="Completed"
          value={completedRes.meta?.total ?? 0}
          icon={CheckCircle2}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Requests</h2>
          <Button asChild variant="link" size="sm">
            <Link href="/tenant-dashboard/requests">View all</Link>
          </Button>
        </div>

        {recent.length === 0 ? (
          <p className="text-muted-foreground">
            You haven&apos;t made any rental requests yet.
          </p>
        ) : (
          <div className="divide-y rounded-xl border">
            {recent.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0">
                  {request.property ? (
                    <Link
                      href={propertyHref(request.property)}
                      className="font-medium hover:underline"
                    >
                      {request.property.title}
                    </Link>
                  ) : (
                    <p className="font-medium">Property unavailable</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formatDate(request.startDate)} –{" "}
                    {formatDate(request.endDate)}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
