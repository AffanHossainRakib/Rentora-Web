"use client";

import { Button } from "@/components/ui/button";
import { IRentalStatus } from "@/lib/types";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRentalStatus } from "../_actions/paymentStatusActions";

const POLL_INTERVAL_MS = 3000;

export function PaymentStatusPoller({
  rentalRequestId,
  initialStatus,
}: {
  rentalRequestId: string;
  initialStatus: IRentalStatus | null;
}) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (status === "ACTIVE") return;

    const interval = setInterval(async () => {
      const next = await getRentalStatus(rentalRequestId);
      if (next) setStatus(next);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [status, rentalRequestId]);

  if (status === "ACTIVE") {
    return (
      <div className="space-y-4 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight">
          Payment Successful
        </h1>
        <p className="text-muted-foreground">
          Your rental is now active. Enjoy your new home!
        </p>
        <Button asChild size="lg">
          <Link href="/tenant-dashboard/requests">View my requests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <Loader2 className="mx-auto size-10 animate-spin text-primary" />
      <h1 className="text-2xl font-bold tracking-tight">
        Confirming your payment…
      </h1>
      <p className="text-muted-foreground">
        This usually takes a few seconds. Please don&apos;t close this page.
      </p>
    </div>
  );
}
