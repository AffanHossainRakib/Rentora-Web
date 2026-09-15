"use client";

import { PropertyImage } from "@/components/shared/property-image";
import { cn, isValidImageUrl } from "@/lib/utils";
import { useState } from "react";

export function ImageGallery({
  pictures,
  title,
}: {
  pictures: string[];
  title: string;
}) {
  const validPictures = pictures.filter(isValidImageUrl);
  const [selected, setSelected] = useState(0);

  if (validPictures.length === 0) {
    return (
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border">
        <PropertyImage src={null} alt={title} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border">
        <PropertyImage
          src={validPictures[selected]}
          alt={title}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </div>

      {validPictures.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validPictures.map((picture, index) => (
            <button
              key={picture}
              type="button"
              onClick={() => setSelected(index)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-lg border-2",
                index === selected ? "border-primary" : "border-transparent",
              )}
            >
              <PropertyImage
                src={picture}
                alt={`${title} photo ${index + 1}`}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
