export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-4 focus:py-2 focus:bg-espresso focus:text-cream
        focus:rounded-[var(--radius-md)] focus:text-sm focus:font-medium
        focus:shadow-[var(--shadow-warm-lg)]"
    >
      Skip to main content
    </a>
  );
}
