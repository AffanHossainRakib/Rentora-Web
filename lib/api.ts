import { IApiResponse, IErrorDetail } from "./types";

export const toFieldErrors = (details?: IErrorDetail[] | null) =>
  Array.isArray(details) && details.length
    ? Object.fromEntries(details.map((detail) => [detail.path, detail.message]))
    : undefined;

const API_URL = process.env.BACKEND_API_URL;

const NETWORK_ERROR_RESPONSE = {
  success: false,
  statusCode: 503,
  message: "We couldn't reach the server. Check your connection and try again.",
  data: undefined,
  errorDetails: null,
} as const;

export const backendGet = async <T>(
  path: string,
  init?: RequestInit,
  accessToken?: string,
): Promise<IApiResponse<T>> => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
        ...init?.headers,
      },
    });

    return await res.json();
  } catch {
    return NETWORK_ERROR_RESPONSE as unknown as IApiResponse<T>;
  }
};

export const backendMutate = async <T>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  accessToken?: string,
): Promise<IApiResponse<T>> => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    return await res.json();
  } catch {
    return NETWORK_ERROR_RESPONSE as unknown as IApiResponse<T>;
  }
};
