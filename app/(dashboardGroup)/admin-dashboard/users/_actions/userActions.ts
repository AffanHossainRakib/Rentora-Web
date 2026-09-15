"use server";

import { backendMutate } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateUserStatus = async (
  id: string,
  isActive: boolean,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate(
    `/admin/users/${id}`,
    "PATCH",
    { isActive },
    accessToken,
  );

  if (result.success) {
    revalidatePath("/admin-dashboard/users");
  }

  return { success: result.success, message: result.message };
};
