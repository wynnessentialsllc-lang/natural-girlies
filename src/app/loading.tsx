export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="space-y-12">
          {/* Hero skeleton */}
          <div className="space-y-6">
            <div className="h-4 w-32 animate-pulse rounded-full bg-border" />
            <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-border sm:h-16" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-border" />
          </div>

          {/* Card grid skeleton */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] animate-pulse rounded-3xl bg-border" />
                <div className="h-3 w-20 animate-pulse rounded-full bg-border" />
                <div className="h-6 w-full animate-pulse rounded-full bg-border" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-border" />
              </div>
            ))}
          </div>
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          Loading content
        </span>
      </div>
    </div>
  );
}
