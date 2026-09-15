"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
import { createRentalRequest } from "../_actions/rentalActions";

export function RequestRentDialog({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createRentalRequest, null);
  const errors = state?.errors ?? {};

  useActionFeedback(state, () => setOpen(false));

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Request to Rent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
          <DialogDescription>
            Choose your move-in and move-out dates. The landlord will review
            your request.
          </DialogDescription>
        </DialogHeader>

        <form action={action} id="rental-request-form">
          <input type="hidden" name="propertyId" value={propertyId} />
          <FieldGroup>
            <Field data-invalid={!!errors.startDate}>
              <FieldLabel htmlFor="startDate">Start date</FieldLabel>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                min={today}
                required
              />
              {errors.startDate && <FieldError>{errors.startDate}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.endDate}>
              <FieldLabel htmlFor="endDate">End date</FieldLabel>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                min={today}
                required
              />
              {errors.endDate && <FieldError>{errors.endDate}</FieldError>}
            </Field>

            {state && !state.success && !state.errors && (
              <p role="alert" className="text-sm text-destructive">
                {state.message}
              </p>
            )}
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="rental-request-form" disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            {pending ? "Sending…" : "Send request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
