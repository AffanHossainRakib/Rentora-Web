import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "../../_components/PropertyGridSkeleton";

const CityLoading = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-4 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <PropertyGridSkeleton count={9} />
    </div>
  );
};

export default CityLoading;
