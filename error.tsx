"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in dev tooling — replace with proper logging in prod
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-coral">
          Something interrupted the story
        </p>
        <h1 className="mt-4 font-serif text-4xl text-espresso sm:text-5xl">
          Even the best edits hit a snag.
        </h1>
        <p className="mt-6 text-base text-warmBrown">
          We ran into an unexpected issue while loading this page. Try again,
          or head back home and we&apos;ll keep reading together.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-coral px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-coral/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-warmBrown transition-colors hover:bg-cream hover:text-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
