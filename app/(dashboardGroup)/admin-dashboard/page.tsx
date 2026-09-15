import { StatCard } from "@/app/(dashboardGroup)/_components/StatCard";
import { Building2, ClipboardList, Users } from "lucide-react";
import {
  getAllAdminProperties,
  getAllAdminRentals,
  getAllUsers,
} from "./_actions/adminActions";

export default async function AdminDashboardPage() {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAllUsers({ limit: "1" }),
    getAllAdminProperties({ limit: "1" }),
    getAllAdminRentals({ limit: "200" }),
  ]);

  const rentals = rentalsRes.success ? rentalsRes.data.rentalRequests : [];
  const pendingCount = rentals.filter(
    (rental) => rental.status === "PENDING",
  ).length;
  const isTruncated =
    !!rentalsRes.meta && rentalsRes.meta.total > rentals.length;
  const pendingValue = isTruncated ? `${pendingCount}+` : pendingCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Platform-wide activity at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Users"
          value={usersRes.meta?.total ?? 0}
          icon={Users}
        />
        <StatCard
          label="Total Properties"
          value={propertiesRes.meta?.total ?? 0}
          icon={Building2}
        />
        <StatCard
          label="Pending Requests"
          value={pendingValue}
          icon={ClipboardList}
        />
      </div>
    </div>
  );
}
