import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Rentora</h1>
      <p className="max-w-md text-muted-foreground">
        Find &amp; list rental properties with ease.
      </p>
      <Button asChild size="lg">
        <Link href="/properties">Browse properties</Link>
      </Button>
    </main>
  );
}
