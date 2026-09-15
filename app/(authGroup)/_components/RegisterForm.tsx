"use client";

import { ImagePicker } from "@/components/shared/image-picker";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const roleOptions = [
  {
    value: "TENANT",
    title: "I'm a tenant",
    description: "Looking for a place to rent",
    icon: KeyRound,
  },
  {
    value: "LANDLORD",
    title: "I'm a landlord",
    description: "I want to list my property",
    icon: Building2,
  },
];

const RegisterForm = ({
  defaultRole,
}: {
  defaultRole: "TENANT" | "LANDLORD";
}) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerAction, null);
  // Kept in state (not a file input) so it survives React resetting the form after a failed submit
  const [photo, setPhoto] = useState<File | null>(null);
  const errors = state?.errors ?? {};
  const values = state?.values;

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
    <form
      noValidate
      action={(formData) => {
        if (photo) formData.set("profilePicture", photo);
        action(formData);
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">I want to join as</FieldLegend>
          <div className="grid gap-3 sm:grid-cols-2">
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent has-checked:border-primary has-checked:bg-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-ring"
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  defaultChecked={
                    (values?.role ?? defaultRole) === option.value
                  }
                  className="sr-only"
                />
                <option.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-sm font-medium">
                    {option.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.role && <FieldError>{errors.role}</FieldError>}
        </FieldSet>

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="John Doe"
            defaultValue={values?.name}
            aria-invalid={!!errors.name}
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            defaultValue={values?.email}
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
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
          />
          {errors.password ? (
            <FieldError>{errors.password}</FieldError>
          ) : (
            <FieldDescription>At least 8 characters.</FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!errors.bio}>
          <FieldLabel htmlFor="bio">
            Bio{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <Textarea
            id="bio"
            name="bio"
            rows={3}
            placeholder="A little about you"
            defaultValue={values?.bio}
            aria-invalid={!!errors.bio}
          />
          {errors.bio && <FieldError>{errors.bio}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.profilePicture}>
          <FieldLabel>
            Profile photo{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <ImagePicker onChange={setPhoto} />
          {errors.profilePicture && (
            <FieldError>{errors.profilePicture}</FieldError>
          )}
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
          {pending
            ? photo
              ? "Uploading photo & creating account…"
              : "Creating account…"
            : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
