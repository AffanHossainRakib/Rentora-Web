import { getRentalRequestById } from "@/app/(dashboardGroup)/tenant-dashboard/_actions/tenantActions";
import type { Metadata } from "next";
import { PaymentStatusPoller } from "./_components/PaymentStatusPoller";

export const metadata: Metadata = {
  title: "Payment Successful",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const rentalRequestId = first(params.rentalRequestId);

  if (!rentalRequestId) {
    return (
      <div className="mx-auto max-w-md space-y-4 px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Payment reference missing</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find your rental request. Please check your
          dashboard.
        </p>
      </div>
    );
  }

  const result = await getRentalRequestById(rentalRequestId);
  const status = result.success ? result.data.status : null;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-20">
      <PaymentStatusPoller
        rentalRequestId={rentalRequestId}
        initialStatus={status}
      />
    </div>
  );
}
