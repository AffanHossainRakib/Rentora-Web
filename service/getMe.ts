import { IApiResponse, IUser } from "@/lib/types";
import { cookies } from "next/headers";
import { cache } from "react";

// The trusted session check: the backend verifies the token and rejects banned users.
// cache() dedupes calls within one request; no cross-request caching so bans apply immediately.
export const getMe = cache(async (): Promise<IUser | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result: IApiResponse<{ user: IUser }> = await res.json();

    return result.data.user;
  } catch {
    return null;
  }
});
