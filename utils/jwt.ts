import { IRole } from "@/lib/types";

export type ITokenPayload = {
  id: string;
  name: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
};

// Reads the payload WITHOUT verifying the signature. Only use it for UX (redirects, cookie lifetime).
// The backend verifies every token; getMe() is the trusted check.
const decodeToken = (token?: string): ITokenPayload | null => {
  try {
    return JSON.parse(
      Buffer.from(token!.split(".")[1], "base64url").toString("utf8"),
    );
  } catch {
    return null;
  }
};

const isTokenExpired = (payload: ITokenPayload | null) =>
  !payload || payload.exp * 1000 <= Date.now();

export const jwtUtils = {
  decodeToken,
  isTokenExpired,
};
