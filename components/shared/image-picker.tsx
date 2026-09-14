"use client";

import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Shrinks the photo in the browser so the form upload stays small (and under the Server Action limit)
const downscaleImage = async (file: File, maxSize: number): Promise<File> => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // Browsers without WebP encoding fall back to PNG
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.85),
  );
  if (!blob) throw new Error("Could not process image");

  return new File([blob], `photo.${blob.type.split("/")[1]}`, {
    type: blob.type,
  });
};

type ImagePickerProps = {
  // Called with the processed file, or null when removed. Nothing is uploaded here.
  onChange: (file: File | null) => void;
  maxSize?: number;
};

export function ImagePicker({ onChange, maxSize = 800 }: ImagePickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Free the preview's object URL when it changes or the component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = async (file?: File) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPG, PNG or WebP image");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(
        `This image is too large. Maximum size is ${MAX_FILE_MB} MB.`,
      );
      return;
    }

    try {
      const processed = await downscaleImage(file, maxSize);
      setPreviewUrl(URL.createObjectURL(processed));
      onChange(processed);
    } catch {
      toast.error("We couldn't read that image. Try a JPG, PNG or WebP file.");
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(null);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
        {previewUrl ? (
          // Local blob preview, so there is nothing for the image optimizer to fetch
          <Image
            src={previewUrl}
            alt="Selected photo"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <Camera className="size-7 text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? "Change photo" : "Choose photo"}
          </Button>
          {previewUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
            >
              <Trash2 />
              Remove
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          JPG, PNG or WebP · Max {MAX_FILE_MB} MB
        </p>
      </div>
    </div>
  );
}
