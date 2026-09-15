import { backendGet } from "@/lib/api";
import { IApiResponse, IPayment, IRentalRequest } from "@/lib/types";
import { cookies } from "next/headers";

export type IRentalQuery = { status?: string; page?: string; limit?: string };

export const getMyRentalRequests = async (query: IRentalQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ rentalRequests: IRentalRequest[] }>(
    `/rentals?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};

export const getRentalRequestById = async (
  id: string,
): Promise<IApiResponse<IRentalRequest>> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const result = await backendGet<{ rentalRequest: IRentalRequest }>(
    `/rentals/${id}`,
    { cache: "no-store" },
    accessToken,
  );

  return result.success
    ? { ...result, data: result.data.rentalRequest }
    : (result as unknown as IApiResponse<IRentalRequest>);
};

export type IPaymentQuery = { status?: string; page?: string; limit?: string };

export const getMyPayments = async (query: IPaymentQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ payments: IPayment[] }>(
    `/payments?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};
