import { backendGet } from "@/lib/api";
import { IPayment, IRentalRequest } from "@/lib/types";
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

export const getRentalRequestById = async (id: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return backendGet<IRentalRequest>(
    `/rentals/${id}`,
    { cache: "no-store" },
    accessToken,
  );
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
