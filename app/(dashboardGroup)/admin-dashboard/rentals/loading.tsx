import { Skeleton } from "@/components/ui/skeleton";

const AdminRentalsLoading = () => {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
};

export default AdminRentalsLoading;
