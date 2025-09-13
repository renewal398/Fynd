"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred. You can try to refresh the page or try again later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => reset()}>Try again</Button>
        </CardContent>
      </Card>
    </main>
  );
}
