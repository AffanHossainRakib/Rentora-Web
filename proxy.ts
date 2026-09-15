import { IRole } from "@/lib/types";
import { DASHBOARD_ROUTES } from "@/lib/utils";
import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const DASHBOARD_PREFIXES: Record<string, IRole> = {
  "/tenant-dashboard": "TENANT",
  "/landlord-dashboard": "LANDLORD",
  "/admin-dashboard": "ADMIN",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let payload = jwtUtils.decodeToken(accessToken);

  if (jwtUtils.isTokenExpired(payload) && refreshToken) {
    const refreshed = await getNewAccessToken(refreshToken);

    if (refreshed) {
      accessToken = refreshed.accessToken;
      payload = jwtUtils.decodeToken(accessToken);

      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: payload
          ? Math.max(payload.exp - Math.floor(Date.now() / 1000), 0)
          : undefined,
      });
    } else {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      payload = null;
    }
  } else if (jwtUtils.isTokenExpired(payload)) {
    payload = null;
  }

  const role = payload?.role;

  if (payload && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTES[role!], request.url));
  }

  const dashboardEntry = Object.entries(DASHBOARD_PREFIXES).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (dashboardEntry) {
    const [, requiredRole] = dashboardEntry;

    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== requiredRole) {
      return NextResponse.redirect(
        new URL(DASHBOARD_ROUTES[role!], request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|api$|_next/static|_next/image|favicon\\.ico$|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
