import { cn, isValidImageUrl } from "@/lib/utils";
import { Home } from "lucide-react";
import Image from "next/image";

type PropertyImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function PropertyImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: PropertyImageProps) {
  if (!isValidImageUrl(src)) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-muted",
          className,
        )}
      >
        <Home className="size-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={
        sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      }
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
