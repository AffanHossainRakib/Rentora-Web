"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { IProperty } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { savePropertyAction } from "../_actions/propertyFormActions";
import { PropertyImagePicker } from "./PropertyImagePicker";

const AMENITY_OPTIONS = [
  "WiFi",
  "Parking",
  "Furnished",
  "Generator",
  "Lift",
  "Garden",
  "AC",
  "Security",
];

export function PropertyForm({
  categories,
  property,
}: {
  categories: string[];
  property?: IProperty;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(savePropertyAction, null);
  const errors = state?.errors ?? {};
  const [amenities, setAmenities] = useState<Set<string>>(
    new Set(property?.amenities ?? []),
  );
  const [isAvailable, setIsAvailable] = useState(property?.isAvailable ?? true);

  useActionFeedback(state, () => {
    if (state?.redirectTo) router.push(state.redirectTo);
  });

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };

  return (
    <form action={action}>
      {property && (
        <input type="hidden" name="propertyId" value={property.id} />
      )}
      <input
        type="hidden"
        name="isAvailable"
        value={isAvailable ? "true" : "false"}
      />
      {Array.from(amenities).map((amenity) => (
        <input key={amenity} type="hidden" name="amenities" value={amenity} />
      ))}

      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={property?.title}
            placeholder="Modern Studio Unit"
          />
          {errors.title && <FieldError>{errors.title}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.location}>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            name="location"
            defaultValue={property?.location}
            placeholder="Dhaka, Bangladesh"
          />
          {errors.location && <FieldError>{errors.location}</FieldError>}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.price}>
            <FieldLabel htmlFor="price">Price (per month)</FieldLabel>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              step="0.01"
              defaultValue={property?.price}
            />
            {errors.price && <FieldError>{errors.price}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.category}>
            <FieldLabel>Category</FieldLabel>
            <Select name="category" defaultValue={property?.category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <FieldError>{errors.category}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">
            Description{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={property?.description ?? ""}
          />
          {errors.description && <FieldError>{errors.description}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Amenities</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((amenity) => (
              <Button
                key={amenity}
                type="button"
                size="sm"
                variant={amenities.has(amenity) ? "default" : "outline"}
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
              </Button>
            ))}
          </div>
        </Field>

        <Field data-invalid={!!errors.pictures}>
          <FieldLabel>Photos</FieldLabel>
          <PropertyImagePicker
            name="pictures"
            existingName="existingPictures"
            defaultPictures={property?.pictures}
          />
          {errors.pictures && <FieldError>{errors.pictures}</FieldError>}
        </Field>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">Available for rent</p>
            <p className="text-xs text-muted-foreground">
              Tenants can only request available properties.
            </p>
          </div>
          <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
        </div>

        {state && !state.success && !state.errors && (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.message}
          </p>
        )}

        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          {pending ? "Saving…" : property ? "Save changes" : "Create property"}
        </Button>
      </FieldGroup>
    </form>
  );
}
