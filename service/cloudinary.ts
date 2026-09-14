// Server-side Cloudinary helpers. Deliberately NOT a "use server" module: nothing here is callable
// from the browser, and the API secret never leaves the server.
import { createHash } from "node:crypto";

type ICloudinaryResult = {
  public_id: string;
  secure_url: string;
  error?: { message: string };
};

// Cloudinary context values: escape "|" and "=" with a backslash
const toContext = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, value]) => `${key}=${value.replace(/([|=])/g, "\\$1")}`)
    .join("|");

const signedPost = async (
  endpoint: "upload" | "explicit" | "destroy",
  params: Record<string, string>,
  file?: Blob,
): Promise<ICloudinaryResult> => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary is not configured");
  }

  const signedParams: Record<string, string> = {
    ...params,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };

  const stringToSign = Object.keys(signedParams)
    .sort()
    .map((key) => `${key}=${signedParams[key]}`)
    .join("&");

  const body = new FormData();
  Object.entries(signedParams).forEach(([key, value]) =>
    body.append(key, value),
  );
  body.append("api_key", CLOUDINARY_API_KEY);
  body.append(
    "signature",
    createHash("sha1")
      .update(stringToSign + CLOUDINARY_API_SECRET)
      .digest("hex"),
  );
  if (file) body.append("file", file);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/${endpoint}`,
    { method: "POST", body, cache: "no-store" },
  );
  const result: ICloudinaryResult = await res.json();

  if (!res.ok || result.error) {
    throw new Error(result.error?.message ?? "Cloudinary request failed");
  }

  return result;
};

export const uploadImage = (
  file: Blob,
  options: { folder: string; context: Record<string, string>; tags: string[] },
) =>
  signedPost(
    "upload",
    {
      folder: options.folder,
      allowed_formats: "jpg,jpeg,png,webp",
      transformation: "c_limit,w_1600,h_1600",
      context: toContext(options.context),
      tags: options.tags.join(","),
    },
    file,
  );

// Replaces the asset's context and tags (Cloudinary's explicit API), without changing its URL
export const updateImageMetadata = (
  publicId: string,
  options: { context: Record<string, string>; tags: string[] },
) =>
  signedPost("explicit", {
    public_id: publicId,
    type: "upload",
    context: toContext(options.context),
    tags: options.tags.join(","),
  });

export const deleteImage = (publicId: string) =>
  signedPost("destroy", { public_id: publicId });
