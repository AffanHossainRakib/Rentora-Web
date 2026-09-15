import { LucideIcon } from "lucide-react";

export type IRole = "TENANT" | "LANDLORD" | "ADMIN";

export type ISidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type IErrorDetail = { path: string; message: string };

export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

// Backend envelope: { success, statusCode, message, data, meta? } or { success: false, ..., errorDetails }
export type IApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: IMeta;
  errorDetails?: IErrorDetail[] | null;
};

export type IProfile = {
  id: string;
  userId: string;
  profilePicture: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: IRole;
  createdAt: string;
  updatedAt: string;
  profile: IProfile | null;
};

export type IProperty = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  isAvailable: boolean;
  location: string;
  price: number;
  amenities: string[];
  pictures: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  landlord?: IUser;
  reviews?: IReview[];
};

export type IReview = {
  id: string;
  userId: string;
  propertyId: string;
  rentalRequestId: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string };
};

export type IRentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type IRentalRequest = {
  id: string;
  userId: string;
  propertyId: string;
  status: IRentalStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  property?: IProperty;
  tenant?: IUser;
  review?: IReview | null;
};

export type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type IPayment = {
  id: string;
  rentalRequestId: string;
  status: IPaymentStatus;
  transactionId: string | null;
  amount: number;
  method: string;
  provider: "STRIPE" | "SSLCOMMERZ";
  paidAt: string | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
  rentalRequest?: IRentalRequest;
};

// Returned by form Server Actions and read with useActionState
export type IActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  redirectTo?: string;
} | null;
