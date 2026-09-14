"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();

  // The backend only clears its own cookies and JWTs stay valid until they expire,
  // so deleting our cookies is what actually ends the session.
  await fetch(`${process.env.BACKEND_API_URL}/auth/logout`, {
    method: "POST",
    cache: "no-store",
  }).catch(() => null);

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
