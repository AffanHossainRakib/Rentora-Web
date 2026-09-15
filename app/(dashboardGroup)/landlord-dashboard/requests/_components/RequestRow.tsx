import { StatusBadge } from "@/app/(dashboardGroup)/_components/StatusBadge";
import { PropertyImage } from "@/components/shared/property-image";
import { Button } from "@/components/ui/button";
import { IRentalRequest } from "@/lib/types";
import { formatCurrency, formatDate, propertyHref } from "@/lib/utils";
import { Check, User, X } from "lucide-react";
import Link from "next/link";

export function RequestRow({
  request,
  onAction,
}: {
  request: IRentalRequest;
  onAction: (id: string, status: "APPROVED" | "REJECTED") => void;
}) {
  const property = request.property;

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row">
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:w-40">
        <PropertyImage
          src={property?.pictures[0]}
          alt={property?.title ?? "Property"}
          sizes="160px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {property ? (
              <Link href={propertyHref(property)} className="font-semibold hover:underline">
                {property.title}
              </Link>
            ) : (
              <p className="font-semibold">Property unavailable</p>
            )}
            <p className="text-sm text-muted-foreground">{property?.location}</p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {request.tenant && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="size-3.5 shrink-0" />
            {request.tenant.name}
            <span className="text-muted-foreground/70">({request.tenant.email})</span>
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          {formatDate(request.startDate)} – {formatDate(request.endDate)}
        </p>

        {property && (
          <p className="font-semibold text-primary">
            {formatCurrency(property.price)}
            <span className="text-sm font-normal text-muted-foreground"> /month</span>
          </p>
        )}

        {request.status === "PENDING" && (
          <div className="mt-auto flex gap-2 pt-2">
            <Button size="sm" onClick={() => onAction(request.id, "APPROVED")}>
              <Check />
              Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAction(request.id, "REJECTED")}>
              <X />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
