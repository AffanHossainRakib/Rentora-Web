import { Skeleton } from "@/components/ui/skeleton";

const PayLoading = () => {
  return (
    <div className="mx-auto max-w-md space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  );
};

export default PayLoading;
