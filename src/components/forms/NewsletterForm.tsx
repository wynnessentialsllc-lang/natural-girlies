'use client';

interface NewsletterFormProps {
  id?: string;
  className?: string;
}

export function NewsletterForm({ id = 'newsletter-email', className = '' }: NewsletterFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`flex flex-col sm:flex-row gap-2 ${className}`}
      aria-label="Newsletter subscription"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        placeholder="your@email.com"
        required
        autoComplete="email"
        className="flex-1 px-4 py-2.5 text-sm bg-white border border-border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-coral text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-melon transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

export function NewsletterFormDark({ id = 'footer-email' }: { id?: string }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-2"
      aria-label="Newsletter subscription"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        placeholder="your@email.com"
        required
        autoComplete="email"
        className="w-full px-4 py-2.5 text-sm bg-cream/10 border border-cream/20 rounded-[var(--radius-md)] text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-coral/60 focus:border-coral/60"
      />
      <button
        type="submit"
        className="w-full py-2.5 text-sm font-medium bg-coral text-white rounded-[var(--radius-md)] hover:bg-melon transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
