import { cn } from "cn";

// Shimmer: a soft highlight sweeps across the block (static block when reduced motion is on)
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:animate-shimmer before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
