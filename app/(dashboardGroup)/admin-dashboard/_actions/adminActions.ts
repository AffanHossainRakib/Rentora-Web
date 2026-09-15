import { backendGet } from "@/lib/api";
import { IProperty, IRentalRequest, IUser } from "@/lib/types";
import { cookies } from "next/headers";

export type IAdminUsersQuery = {
  role?: string;
  searchTerm?: string;
  page?: string;
  limit?: string;
};

export const getAllUsers = async (query: IAdminUsersQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ users: IUser[] }>(
    `/admin/users?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};

export type IPaginationQuery = { page?: string; limit?: string };

export const getAllAdminProperties = async (query: IPaginationQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ properties: IProperty[] }>(
    `/admin/properties?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};

export const getAllAdminRentals = async (query: IPaginationQuery = {}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return backendGet<{ rentalRequests: IRentalRequest[] }>(
    `/admin/rentals?${params.toString()}`,
    { cache: "no-store" },
    accessToken,
  );
};
