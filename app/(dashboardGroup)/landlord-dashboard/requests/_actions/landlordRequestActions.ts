"use server";

import { backendMutate } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateRequestStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED",
): Promise<{ success: boolean; message: string }> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(`/landlord/requests/${id}`, "PATCH", { status }, accessToken);

  if (result.success) {
    revalidatePath("/landlord-dashboard/requests");
    revalidatePath("/landlord-dashboard");
  }

  return { success: result.success, message: result.message };
};
