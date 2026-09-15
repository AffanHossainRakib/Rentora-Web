"use server";

import { backendMutate, toFieldErrors } from "@/lib/api";
import { IActionState } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return {
      success: false,
      message: "Please fix the highlighted fields",
      errors: { name: "Category name is required" },
    };
  }

  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(
    "/categories",
    "POST",
    { name },
    accessToken,
  );

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: toFieldErrors(result.errorDetails),
    };
  }

  revalidateTag("categories", { expire: 0 });

  return { success: true, message: "Category created" };
};
