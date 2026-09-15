import { PropertyGridSkeleton } from "@/app/(publicGroup)/_components/PropertyGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const AdminPropertiesLoading = () => {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <PropertyGridSkeleton count={6} />
    </div>
  );
};

export default AdminPropertiesLoading;
