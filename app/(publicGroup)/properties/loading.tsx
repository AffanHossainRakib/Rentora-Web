import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "../_components/PropertyGridSkeleton";

const PropertiesLoading = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-4 w-48" />
      <div className="space-y-3">
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <PropertyGridSkeleton count={12} />
    </div>
  );
};

export default PropertiesLoading;
