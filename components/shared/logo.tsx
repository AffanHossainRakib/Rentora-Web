import { House } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="Rentora home"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <House className="size-4" />
      </span>
      <span className="text-xl font-bold tracking-tight">Rentora</span>
    </Link>
  );
}
