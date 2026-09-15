"use server";

import { IActionState, IApiResponse, IErrorDetail, IUser } from "@/lib/types";
import {
  deleteImage,
  updateImageMetadata,
  uploadImage,
} from "@/service/cloudinary";
import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";

type ITokens = {
  accessToken: string;
  refreshToken: string;
};

const NETWORK_ERROR =
  "We couldn't reach the server. Check your connection and try again.";

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
// The browser shrinks photos (max 10 MB original) to a few hundred KB, so 2 MB here only stops bypasses
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

const postToBackend = async <T>(path: string, body: unknown) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return (await res.json()) as IApiResponse<T>;
};

// Backend validation errors arrive as [{ path, message }]; forms show them under each field
const toFieldErrors = (details?: IErrorDetail[] | null) =>
  Array.isArray(details) && details.length
    ? Object.fromEntries(details.map((detail) => [detail.path, detail.message]))
    : undefined;

// Only same-site relative paths, so ?redirectTo can't send users to another site
const safeRedirect = (redirectTo: string) =>
  redirectTo.startsWith("/") &&
  !redirectTo.startsWith("//") &&
  !redirectTo.startsWith("/\\")
    ? redirectTo
    : "/";

const setAuthCookies = async ({ accessToken, refreshToken }: ITokens) => {
  const cookieStore = await cookies();
  const nowInSeconds = Math.floor(Date.now() / 1000);

  for (const [name, token] of [
    ["accessToken", accessToken],
    ["refreshToken", refreshToken],
  ]) {
    const exp = jwtUtils.decodeToken(token)?.exp;

    cookieStore.set(name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Cookie lives exactly as long as the token
      maxAge: exp ? Math.max(exp - nowInSeconds, 0) : undefined,
    });
  }

  return jwtUtils.decodeToken(accessToken);
};

export const loginAction = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "");

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please fill in all fields",
      errors,
      values: { email },
    };
  }

  try {
    const result = await postToBackend<ITokens>("/auth/login", {
      email,
      password,
    });

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: toFieldErrors(result.errorDetails),
        values: { email },
      };
    }

    const user = await setAuthCookies(result.data);

    return {
      success: true,
      message: `Welcome back, ${user?.name ?? "there"}!`,
      // ponytail: defaults to home until dashboards exist (F9), then DASHBOARD_ROUTES[role]
      redirectTo: safeRedirect(redirectTo),
    };
  } catch {
    return { success: false, message: NETWORK_ERROR, values: { email } };
  }
};

export const registerAction = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    role: String(formData.get("role") ?? ""),
    bio: String(formData.get("bio") ?? "").trim(),
  };
  const password = String(formData.get("password") ?? "");
  const photo = formData.get("profilePicture");
  const hasPhoto = photo instanceof File && photo.size > 0;

  // Same rules as the backend, checked first so a photo is never uploaded for a form that will fail
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Invalid email address";
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters long";
  if (!["TENANT", "LANDLORD"].includes(values.role))
    errors.role = "Please choose tenant or landlord";
  if (
    hasPhoto &&
    (!ALLOWED_PHOTO_TYPES.includes(photo.type) || photo.size > MAX_PHOTO_BYTES)
  ) {
    errors.profilePicture = "Photo must be a JPG, PNG or WebP image, max 10 MB";
  }

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please fix the highlighted fields",
      errors,
      values,
    };
  }

  let uploadedPhotoId: string | null = null;

  try {
    let profilePicture: string | undefined;

    if (hasPhoto) {
      try {
        const uploaded = await uploadImage(photo, {
          folder: "rentora/profiles",
          context: {
            email: values.email,
            name: values.name,
            status: "pending_signup",
          },
          tags: ["profile", "pending_signup"],
        });
        uploadedPhotoId = uploaded.public_id;
        profilePicture = uploaded.secure_url;
      } catch {
        return {
          success: false,
          message:
            "We couldn't upload your photo. Try again, or remove it and continue.",
          errors: { profilePicture: "Photo upload failed" },
          values,
        };
      }
    }

    const result = await postToBackend<{ user: IUser }>("/auth/register", {
      name: values.name,
      email: values.email,
      password,
      role: values.role,
      ...(values.bio && { bio: values.bio }),
      ...(profilePicture && { profilePicture }),
    });

    if (!result.success) {
      // Account wasn't created, so don't keep an orphaned photo
      if (uploadedPhotoId) await deleteImage(uploadedPhotoId).catch(() => null);

      return {
        success: false,
        message: result.message,
        errors: toFieldErrors(result.errorDetails),
        values,
      };
    }

    // Link the photo to the new account: user id + email in its metadata, and a user_<id> tag
    // so it can be found in the Media Library
    if (uploadedPhotoId) {
      const { user } = result.data;
      await updateImageMetadata(uploadedPhotoId, {
        context: { user_id: user.id, email: user.email, name: user.name },
        tags: ["profile", `user_${user.id}`],
      }).catch(() => null);
    }

    // Registration doesn't return tokens, so sign the new user in right away
    const login = await postToBackend<ITokens>("/auth/login", {
      email: values.email,
      password,
    });

    if (!login.success) {
      return {
        success: true,
        message: "Account created! Please log in.",
        redirectTo: "/login",
      };
    }

    await setAuthCookies(login.data);

    return {
      success: true,
      message: `Welcome to Rentora, ${values.name}!`,
      redirectTo: "/",
    };
  } catch {
    // Network failure before the account was confirmed: clean up the photo
    if (uploadedPhotoId) await deleteImage(uploadedPhotoId).catch(() => null);

    return { success: false, message: NETWORK_ERROR, values };
  }
};
