import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const rentalRequestId = first(params.rentalRequestId);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15">
        <XCircle className="size-8" />
      </span>
      <h1 className="text-2xl font-bold tracking-tight">Payment Cancelled</h1>
      <p className="text-muted-foreground">
        Your payment wasn&apos;t completed. You can try again whenever
        you&apos;re ready.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {rentalRequestId ? (
          <Button asChild size="lg">
            <Link href={`/tenant-dashboard/requests/${rentalRequestId}/pay`}>
              Try again
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link href="/tenant-dashboard/requests">Go to my requests</Link>
          </Button>
        )}
        <Button asChild variant="outline" size="lg">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
