import { Skeleton } from "@/components/ui/skeleton";

const AdminCategoriesLoading = () => {
  return (
    <div className="max-w-xl space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-28 w-full rounded-xl" />
    </div>
  );
};

export default AdminCategoriesLoading;
