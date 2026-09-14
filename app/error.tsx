"use client";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <TriangleAlert className="size-8" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="max-w-md text-muted-foreground">
          We couldn&apos;t load this page. Please try again — if the problem
          continues, come back in a few minutes.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button onClick={() => retry()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
