"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../_actions/authActions";

const LoginForm = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAction, null);
  const errors = state?.errors ?? {};

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      router.push(state.redirectTo ?? "/");
      router.refresh();
    } else {
      toast.error(
        state.errors ? "Please fix the highlighted fields" : state.message,
      );
    }
  }, [state, router]);

  return (
    <form action={action} noValidate>
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={state?.values?.email}
            aria-invalid={!!errors.email}
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
          />
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>

        {state && !state.success && !state.errors && (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          {pending ? "Logging in…" : "Login"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
