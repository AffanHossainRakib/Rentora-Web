"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { Loader2 } from "lucide-react";
import { useActionState, useRef } from "react";
import { createCategory } from "../_actions/categoryActions";

export function CreateCategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(createCategory, null);
  const errors = state?.errors ?? {};

  useActionFeedback(state, () => formRef.current?.reset());

  return (
    <form ref={formRef} action={action} className="space-y-3 rounded-xl border p-4">
      <h2 className="font-semibold">Add a category</h2>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Category name</FieldLabel>
          <div className="flex gap-2">
            <Input id="name" name="name" placeholder="e.g. Duplex" />
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="animate-spin" />}
              Add
            </Button>
          </div>
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>
      </FieldGroup>
    </form>
  );
}
