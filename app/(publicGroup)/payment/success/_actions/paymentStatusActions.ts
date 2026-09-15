"use server";

import { backendGet } from "@/lib/api";
import { IRentalRequest, IRentalStatus } from "@/lib/types";
import { cookies } from "next/headers";

export const getRentalStatus = async (
  id: string,
): Promise<IRentalStatus | null> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendGet<IRentalRequest>(
    `/rentals/${id}`,
    { cache: "no-store" },
    accessToken,
  );

  return result.success ? result.data.status : null;
};
