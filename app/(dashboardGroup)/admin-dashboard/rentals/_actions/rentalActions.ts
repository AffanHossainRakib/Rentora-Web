"use server";

import { backendMutate } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const markRentalCompleted = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(
    `/landlord/requests/${id}`,
    "PATCH",
    { status: "COMPLETED" },
    accessToken,
  );

  if (result.success) {
    revalidatePath("/admin-dashboard/rentals");
    revalidatePath("/admin-dashboard");
  }

  return { success: result.success, message: result.message };
};
