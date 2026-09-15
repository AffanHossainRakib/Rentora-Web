import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetailsLoading = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-4 w-64" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-16/10 w-full rounded-xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsLoading;
