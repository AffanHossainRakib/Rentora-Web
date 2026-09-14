"use client";

import "./globals.css";

const GlobalError = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center font-sans antialiased">
        <title>Something went wrong | Rentora</title>
        <p className="text-sm font-semibold text-primary">Rentora</p>
        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error stopped the site from loading. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => retry()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          {/* Plain <a> on purpose: a full reload recovers from a broken root layout */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
