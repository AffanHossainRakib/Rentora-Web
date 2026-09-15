import { Skeleton } from "@/components/ui/skeleton";

const LandlordDashboardLoading = () => {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default LandlordDashboardLoading;
