"use server";

import { backendMutate, toFieldErrors } from "@/lib/api";
import { IActionState } from "@/lib/types";
import { deleteImage, uploadImage } from "@/service/cloudinary";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const savePropertyAction = async (
  _prevState: IActionState,
  formData: FormData,
): Promise<IActionState> => {
  const propertyId = String(formData.get("propertyId") ?? "") || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const price = Number(priceRaw);
  const category = String(formData.get("category") ?? "");
  const isAvailable = formData.get("isAvailable") === "true";
  const amenities = formData.getAll("amenities").map(String);
  const existingPictures = formData.getAll("existingPictures").map(String);
  const newPictureFiles = formData
    .getAll("pictures")
    .filter((file): file is File => file instanceof File && file.size > 0);

  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required";
  if (!location) errors.location = "Location is required";
  if (!priceRaw || Number.isNaN(price) || price <= 0)
    errors.price = "Enter a valid price";
  if (!category) errors.category = "Please select a category";

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please fix the highlighted fields",
      errors,
    };
  }

  const accessToken = (await cookies()).get("accessToken")?.value;

  const uploadedIds: string[] = [];
  let newPictureUrls: string[] = [];

  if (newPictureFiles.length) {
    const settled = await Promise.allSettled(
      newPictureFiles.map((file) =>
        uploadImage(file, {
          folder: "rentora/properties",
          context: { title },
          tags: ["property"],
        }),
      ),
    );

    const uploaded = settled.filter(
      (
        item,
      ): item is PromiseFulfilledResult<
        Awaited<ReturnType<typeof uploadImage>>
      > => item.status === "fulfilled",
    );
    uploadedIds.push(...uploaded.map((item) => item.value.public_id));

    if (uploaded.length < settled.length) {
      await Promise.all(
        uploadedIds.map((id) => deleteImage(id).catch(() => null)),
      );

      return {
        success: false,
        message: "We couldn't upload one or more photos. Please try again.",
        errors: { pictures: "Upload failed" },
      };
    }

    newPictureUrls = uploaded.map((item) => item.value.secure_url);
  }

  const pictures = [...existingPictures, ...newPictureUrls];

  const payload = {
    title,
    location,
    price,
    category,
    isAvailable,
    amenities,
    pictures,
    ...(description && { description }),
  };

  const result = propertyId
    ? await backendMutate(
        `/landlord/properties/${propertyId}`,
        "PUT",
        payload,
        accessToken,
      )
    : await backendMutate("/landlord/properties", "POST", payload, accessToken);

  if (!result.success) {
    if (uploadedIds.length) {
      await Promise.all(
        uploadedIds.map((id) => deleteImage(id).catch(() => null)),
      );
    }

    return {
      success: false,
      message: result.message,
      errors: toFieldErrors(result.errorDetails),
    };
  }

  revalidateTag("properties", { expire: 0 });
  if (propertyId) revalidateTag(`property-${propertyId}`, { expire: 0 });

  return {
    success: true,
    message: propertyId ? "Property updated" : "Property created",
    redirectTo: "/landlord-dashboard/properties",
  };
};

export const deleteProperty = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const result = await backendMutate(
    `/landlord/properties/${id}`,
    "DELETE",
    undefined,
    accessToken,
  );

  if (result.success) {
    revalidateTag("properties", { expire: 0 });
    revalidateTag(`property-${id}`, { expire: 0 });
  }

  return { success: result.success, message: result.message };
};
