export type IRole = "TENANT" | "LANDLORD" | "ADMIN";

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

// Returned by form Server Actions and read with useActionState
export type IActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  redirectTo?: string;
} | null;
