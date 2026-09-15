"use server";

import { backendMutate } from "@/lib/api";
import { IActionState } from "@/lib/types";
import { SITE_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createCheckoutSession = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const rentalRequestId = String(formData.get("rentalRequestId") ?? "");

  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendMutate<{ paymentUrl: string }>(
    "/payments/create",
    "POST",
    {
      rentalRequestId,
      redirectUrl: `${SITE_URL}/payment/success?rentalRequestId=${rentalRequestId}`,
    },
    accessToken,
  );

  if (!result.success) {
    return { success: false, message: result.message };
  }

  redirect(result.data.paymentUrl);
};
