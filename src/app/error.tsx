"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground font-sans antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
          <h1 className="text-4xl font-bold text-destructive mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 font-mono max-w-md">
            An unexpected error occurred. We've logged the issue and our team is looking into it. Please try again later.
          </p>
          {error?.message && (
            <pre className="mb-6 p-4 bg-muted text-destructive-foreground rounded-md text-xs text-left max-w-full overflow-auto font-mono">
              Error: {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          )}
          <Button
            onClick={() => reset()}
            size="lg"
            className="font-mono"
          >
            Try Again
          </Button>
          <p className="mt-8 text-sm text-muted-foreground font-mono">
            If the problem persists, please contact support.
          </p>
        </main>
      </body>
    </html>
  );
}
