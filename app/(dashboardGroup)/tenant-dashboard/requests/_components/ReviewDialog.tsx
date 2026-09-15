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
import { Textarea } from "@/components/ui/textarea";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { cn } from "@/lib/utils";
import { Loader2, Star } from "lucide-react";
import { useActionState, useState } from "react";
import { submitReview } from "../../_actions/reviewActions";

export function ReviewDialog({ rentalRequestId }: { rentalRequestId: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [state, action, pending] = useActionState(submitReview, null);
  const errors = state?.errors ?? {};

  useActionFeedback(state, () => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Leave Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this rental.
          </DialogDescription>
        </DialogHeader>

        <form action={action} id="review-form">
          <input type="hidden" name="rentalRequestId" value={rentalRequestId} />
          <input type="hidden" name="rating" value={rating} />
          <FieldGroup>
            <Field data-invalid={!!errors.rating}>
              <FieldLabel>Rating</FieldLabel>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    aria-label={`${value} star`}
                  >
                    <Star
                      className={cn(
                        "size-6",
                        value <= rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <FieldError>{errors.rating}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.review}>
              <FieldLabel htmlFor="review">Review</FieldLabel>
              <Textarea
                id="review"
                name="review"
                rows={4}
                placeholder="How was your stay?"
              />
              {errors.review && <FieldError>{errors.review}</FieldError>}
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
          <Button type="submit" form="review-form" disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            {pending ? "Submitting…" : "Submit review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
