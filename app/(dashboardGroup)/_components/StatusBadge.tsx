import { Badge } from "@/components/ui/badge";
import { IPaymentStatus, IRentalStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const RENTAL_STATUS_STYLES: Record<IRentalStatus, string> = {
  PENDING:
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  APPROVED: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  ACTIVE:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  COMPLETED: "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400",
};

const RENTAL_STATUS_LABELS: Record<IRentalStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

export function StatusBadge({ status }: { status: IRentalStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent font-medium",
        RENTAL_STATUS_STYLES[status],
      )}
    >
      {RENTAL_STATUS_LABELS[status]}
    </Badge>
  );
}

const PAYMENT_STATUS_STYLES: Record<IPaymentStatus, string> = {
  PENDING:
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  COMPLETED:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
};

const PAYMENT_STATUS_LABELS: Record<IPaymentStatus, string> = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export function PaymentStatusBadge({ status }: { status: IPaymentStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent font-medium",
        PAYMENT_STATUS_STYLES[status],
      )}
    >
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
}
