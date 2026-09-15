import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "@/app/(publicGroup)/_components/PropertyGridSkeleton";

const LandlordPropertiesLoading = () => {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <PropertyGridSkeleton count={6} />
    </div>
  );
};

export default LandlordPropertiesLoading;
