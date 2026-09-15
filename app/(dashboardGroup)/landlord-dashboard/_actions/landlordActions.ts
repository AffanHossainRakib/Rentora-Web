import { backendGet } from "@/lib/api";
import { IProperty, IRentalRequest } from "@/lib/types";
import { cookies } from "next/headers";

export type IMyPropertiesQuery = { page?: string; limit?: string };

export const getMyProperties = async (query: IMyPropertiesQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ properties: IProperty[] }>(
    `/landlord/properties?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};

export type ILandlordRequestQuery = {
  status?: string;
  page?: string;
  limit?: string;
};

export const getLandlordRequests = async (
  query: ILandlordRequestQuery = {},
) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ rentalRequests: IRentalRequest[] }>(
    `/landlord/requests?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};
