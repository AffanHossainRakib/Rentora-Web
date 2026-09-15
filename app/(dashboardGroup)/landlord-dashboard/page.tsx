import { StatCard } from "@/app/(dashboardGroup)/_components/StatCard";
import { formatCurrency } from "@/lib/utils";
import { Building2, CircleDollarSign, ClipboardList, Home } from "lucide-react";
import { getLandlordRequests, getMyProperties } from "./_actions/landlordActions";

export default async function LandlordDashboardPage() {
  const [propertiesRes, pendingRes, activeRes, completedRes] = await Promise.all([
    getMyProperties({ limit: "1" }),
    getLandlordRequests({ status: "PENDING", limit: "1" }),
    getLandlordRequests({ status: "ACTIVE", limit: "100" }),
    getLandlordRequests({ status: "COMPLETED", limit: "100" }),
  ]);

  const activeRequests = activeRes.success ? activeRes.data.rentalRequests : [];
  const completedRequests = completedRes.success ? completedRes.data.rentalRequests : [];
  const earnings = [...activeRequests, ...completedRequests].reduce(
    (sum, request) => sum + (request.property?.price ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">A summary of your properties and requests.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Properties"
          value={propertiesRes.meta?.total ?? 0}
          icon={Building2}
        />
        <StatCard
          label="Pending Requests"
          value={pendingRes.meta?.total ?? 0}
          icon={ClipboardList}
        />
        <StatCard label="Active Rentals" value={activeRes.meta?.total ?? 0} icon={Home} />
        <StatCard label="Total Earnings" value={formatCurrency(earnings)} icon={CircleDollarSign} />
      </div>
    </div>
  );
}
