import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'This page has gone wandering. Let us help you find your way back to the crown.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
      <Container narrow className="text-center flex flex-col items-center gap-8">
        <div aria-hidden="true" className="text-7xl">
          👑
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-coral">
            404 — Not Found
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-espresso leading-tight">
            Your crown is still here.
          </h1>
          <p className="text-lg text-warm-brown leading-relaxed max-w-lg mx-auto">
            This page has gone wandering — maybe it's deep in a protective style. Let us help
            you find your way back to the good stuff.
          </p>
        </div>

        <form
          action="/search"
          method="get"
          role="search"
          className="w-full max-w-md"
        >
          <label htmlFor="not-found-search" className="sr-only">
            Search Natural Girlies
          </label>
          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/30">
            <input
              id="not-found-search"
              name="q"
              type="search"
              placeholder="Search for stories, beauty, hair..."
              className="flex-1 bg-transparent text-sm text-espresso placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-coral px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-coral/90"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/magazine" variant="secondary" size="lg">
            Read the Magazine
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 w-full max-w-md">
          {[
            { label: 'Stories', href: '/stories' },
            { label: 'Blog', href: '/blog' },
            { label: 'Crown', href: '/categories/crown' },
            { label: 'About', href: '/about' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2.5 px-4 text-sm text-center text-warm-brown bg-white border border-border rounded-[var(--radius-md)] hover:border-coral hover:text-coral transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
