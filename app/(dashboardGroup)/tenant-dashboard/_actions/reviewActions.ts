"use server";

import { backendMutate, toFieldErrors } from "@/lib/api";
import { IActionState } from "@/lib/types";
import { cookies } from "next/headers";

export const submitReview = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const rentalRequestId = String(formData.get("rentalRequestId") ?? "");
  const rating = Number(formData.get("rating") ?? 0);
  const review = String(formData.get("review") ?? "").trim();

  const errors: Record<string, string> = {};
  if (!rating || rating < 1 || rating > 5)
    errors.rating = "Please choose a rating";
  if (!review) errors.review = "Please write a short review";

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please fix the highlighted fields",
      errors,
    };
  }

  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(
    "/reviews",
    "POST",
    { rentalRequestId, rating, review },
    accessToken,
  );

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: toFieldErrors(result.errorDetails),
    };
  }

  return { success: true, message: "Thanks for your review!" };
};
