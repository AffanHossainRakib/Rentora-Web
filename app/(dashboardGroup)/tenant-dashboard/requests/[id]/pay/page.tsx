import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getRentalRequestById } from "../../../_actions/tenantActions";
import { PayButton } from "./_components/PayButton";

type Props = { params: Promise<{ id: string }> };

export default async function PayPage({ params }: Props) {
  const { id } = await params;
  const result = await getRentalRequestById(id);

  if (!result.success) notFound();

  const request = result.data;

  if (request.status === "ACTIVE" || request.status === "COMPLETED") {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-xl border p-6 text-center">
        <h1 className="text-xl font-semibold">Already paid</h1>
        <p className="text-muted-foreground">This rental request has already been paid for.</p>
      </div>
    );
  }

  if (request.status !== "APPROVED") {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-xl border p-6 text-center">
        <h1 className="text-xl font-semibold">Payment not available</h1>
        <p className="text-muted-foreground">
          This rental request is {request.status.toLowerCase()} and isn&apos;t ready for payment.
        </p>
      </div>
    );
  }

  const property = request.property;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Complete Payment</h1>
        <p className="text-muted-foreground">Review your rental before paying.</p>
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        {property && (
          <>
            <p className="font-semibold">{property.title}</p>
            <p className="text-sm text-muted-foreground">{property.location}</p>
          </>
        )}
        <p className="text-sm text-muted-foreground">
          {formatDate(request.startDate)} – {formatDate(request.endDate)}
        </p>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg text-primary">
            {property ? formatCurrency(property.price) : "—"}
          </span>
        </div>
      </div>

      <PayButton rentalRequestId={request.id} />
    </div>
  );
}
