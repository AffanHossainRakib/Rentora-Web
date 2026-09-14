import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "./_components/PropertyGridSkeleton";

// Lives inside the public group so the navbar and footer stay visible while a page loads
const Loading = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading…</span>
      <div className="space-y-3">
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <PropertyGridSkeleton />
    </div>
  );
};

export default Loading;
