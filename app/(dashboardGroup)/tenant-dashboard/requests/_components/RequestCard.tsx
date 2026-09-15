import { StatusBadge } from "@/app/(dashboardGroup)/_components/StatusBadge";
import { PropertyImage } from "@/components/shared/property-image";
import { Button } from "@/components/ui/button";
import { IRentalRequest } from "@/lib/types";
import { formatCurrency, formatDate, propertyHref } from "@/lib/utils";
import Link from "next/link";
import { ReviewDialog } from "./ReviewDialog";

export function RequestCard({ request }: { request: IRentalRequest }) {
  const property = request.property;

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
        <PropertyImage
          src={property?.pictures[0]}
          alt={property?.title ?? "Property"}
          sizes="192px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {property ? (
              <Link
                href={propertyHref(property)}
                className="font-semibold hover:underline"
              >
                {property.title}
              </Link>
            ) : (
              <p className="font-semibold">Property unavailable</p>
            )}
            <p className="text-sm text-muted-foreground">
              {property?.location}
            </p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <p className="text-sm text-muted-foreground">
          {formatDate(request.startDate)} – {formatDate(request.endDate)}
        </p>

        {property && (
          <p className="font-semibold text-primary">
            {formatCurrency(property.price)}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              /month
            </span>
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {request.status === "APPROVED" && (
            <Button asChild size="sm">
              <Link href={`/tenant-dashboard/requests/${request.id}/pay`}>
                Pay Now
              </Link>
            </Button>
          )}
          {request.status === "COMPLETED" && (
            <ReviewDialog
              rentalRequestId={request.id}
              alreadyReviewed={!!request.review}
            />
          )}
        </div>
      </div>
    </div>
  );
}
