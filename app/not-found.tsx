import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </span>
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, or the listing
          may have been removed.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/properties">Browse properties</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
