"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "../_actions/paymentActions";

export function PayButton({ rentalRequestId }: { rentalRequestId: string }) {
  const [state, action, pending] = useActionState(createCheckoutSession, null);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="rentalRequestId" value={rentalRequestId} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        {pending ? "Redirecting to Stripe…" : "Pay Now"}
      </Button>
    </form>
  );
}
