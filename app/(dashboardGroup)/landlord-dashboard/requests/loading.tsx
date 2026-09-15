import { Skeleton } from "@/components/ui/skeleton";

const LandlordRequestsLoading = () => {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default LandlordRequestsLoading;
