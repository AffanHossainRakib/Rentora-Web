"use client";

import { IRentalRequest, IRentalStatus } from "@/lib/types";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { updateRequestStatus } from "../_actions/landlordRequestActions";
import { RequestRow } from "./RequestRow";

export function RequestsList({ requests }: { requests: IRentalRequest[] }) {
  const [optimisticRequests, setOptimisticStatus] = useOptimistic(
    requests,
    (state, update: { id: string; status: IRentalStatus }) =>
      state.map((request) =>
        request.id === update.id ? { ...request, status: update.status } : request,
      ),
  );
  const [, startTransition] = useTransition();

  const handleAction = (id: string, status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      setOptimisticStatus({ id, status });
      const result = await updateRequestStatus(id, status);

      if (result.success) {
        toast.success(status === "APPROVED" ? "Request approved" : "Request rejected");
      } else {
        toast.error(result.message);
      }
    });
  };

  if (optimisticRequests.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No requests found.</p>;
  }

  return (
    <div className="space-y-4">
      {optimisticRequests.map((request) => (
        <RequestRow key={request.id} request={request} onAction={handleAction} />
      ))}
    </div>
  );
}
