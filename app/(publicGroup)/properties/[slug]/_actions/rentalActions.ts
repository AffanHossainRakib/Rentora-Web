"use server";

import { backendMutate, toFieldErrors } from "@/lib/api";
import { IActionState } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createRentalRequest = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const propertyId = String(formData.get("propertyId") ?? "");
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");

  const errors: Record<string, string> = {};
  if (!startDate) errors.startDate = "Start date is required";
  if (!endDate) errors.endDate = "End date is required";
  if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
    errors.endDate = "End date must be after start date";
  }

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please fix the highlighted fields",
      errors,
    };
  }

  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(
    "/rentals",
    "POST",
    {
      propertyId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    },
    accessToken,
  );

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: toFieldErrors(result.errorDetails),
    };
  }

  revalidateTag(`property-${propertyId}`, { expire: 0 });

  return {
    success: true,
    message: "Rental request sent! The landlord will review it soon.",
  };
};
