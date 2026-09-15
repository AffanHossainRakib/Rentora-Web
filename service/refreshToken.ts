import { IApiResponse } from "@/lib/types";

export const getNewAccessToken = async (refreshToken: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { Cookie: `refreshToken=${refreshToken}` },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const result: IApiResponse<{ accessToken: string }> = await res.json();

    return result.success ? result.data : null;
  } catch {
    return null;
  }
};
