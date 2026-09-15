"use client";

import { StatusBadge } from "@/app/(dashboardGroup)/_components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRentalRequest } from "@/lib/types";
import { formatDate, propertyHref } from "@/lib/utils";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { markRentalCompleted } from "../_actions/rentalActions";

export function RentalsTable({ rentals }: { rentals: IRentalRequest[] }) {
  const [optimisticRentals, setCompleted] = useOptimistic(
    rentals,
    (state, id: string) =>
      state.map((rental) =>
        rental.id === id ? { ...rental, status: "COMPLETED" as const } : rental,
      ),
  );
  const [, startTransition] = useTransition();

  const handleComplete = (id: string) => {
    startTransition(async () => {
      setCompleted(id);
      const result = await markRentalCompleted(id);

      if (result.success) {
        toast.success("Rental marked as completed");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticRentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>
                {rental.property ? (
                  <Link
                    href={propertyHref(rental.property)}
                    className="font-medium hover:underline"
                  >
                    {rental.property.title}
                  </Link>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>{rental.tenant?.name ?? "—"}</TableCell>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
              </TableCell>
              <TableCell>
                <StatusBadge status={rental.status} />
              </TableCell>
              <TableCell className="text-right">
                {rental.status === "ACTIVE" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleComplete(rental.id)}
                  >
                    Mark completed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
