"use client";

import { isValidImageUrl } from "@/lib/utils";
import { ImageOff, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_MB = 10;
const MAX_PHOTOS = 8;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ExistingPicture = { kind: "existing"; url: string };
type NewPicture = { kind: "new"; file: File; previewUrl: string };
type Picture = ExistingPicture | NewPicture;

export function PropertyImagePicker({
  name,
  existingName,
  defaultPictures = [],
}: {
  name: string;
  existingName: string;
  defaultPictures?: string[];
}) {
  const [pictures, setPictures] = useState<Picture[]>(
    defaultPictures.map((url) => ({ kind: "existing", url })),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      pictures.forEach((picture) => {
        if (picture.kind === "new") URL.revokeObjectURL(picture.previewUrl);
      });
    };
  }, [pictures]);

  const syncFileInput = (next: Picture[]) => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    next
      .filter((picture): picture is NewPicture => picture.kind === "new")
      .forEach((picture) => dataTransfer.items.add(picture.file));
    fileInputRef.current.files = dataTransfer.files;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const accepted: NewPicture[] = [];

    for (const file of Array.from(files)) {
      if (pictures.length + accepted.length >= MAX_PHOTOS) {
        toast.error(`You can upload up to ${MAX_PHOTOS} photos`);
        break;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name} isn't a JPG, PNG or WebP image`);
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${file.name} is larger than ${MAX_FILE_MB} MB`);
        continue;
      }
      accepted.push({
        kind: "new",
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (accepted.length === 0) return;

    const next = [...pictures, ...accepted];
    setPictures(next);
    syncFileInput(next);
  };

  const removeAt = (index: number) => {
    const next = pictures.filter((_, i) => i !== index);
    setPictures(next);
    syncFileInput(next);
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        multiple
        accept={ALLOWED_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => handleFiles(event.target.files)}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {pictures.map((picture, index) => (
          <div
            key={picture.kind === "existing" ? picture.url : picture.previewUrl}
            className="group relative aspect-square overflow-hidden rounded-lg border"
          >
            {picture.kind === "new" || isValidImageUrl(picture.url) ? (
              <Image
                src={
                  picture.kind === "existing" ? picture.url : picture.previewUrl
                }
                alt={`Property photo ${index + 1}`}
                fill
                unoptimized={picture.kind === "new"}
                sizes="200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <ImageOff className="size-6 text-muted-foreground" />
              </div>
            )}
            {picture.kind === "existing" && (
              <input type="hidden" name={existingName} value={picture.url} />
            )}
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute right-1 top-1 rounded-full bg-background/90 p-1 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove photo"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}

        {pictures.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-muted-foreground hover:bg-accent"
          >
            <ImagePlus className="size-6" />
            <span className="text-xs">Add photo</span>
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        JPG, PNG or WebP · max {MAX_FILE_MB} MB each · up to {MAX_PHOTOS}{" "}
        photos. New photos upload when you save.
      </p>
    </div>
  );
}
