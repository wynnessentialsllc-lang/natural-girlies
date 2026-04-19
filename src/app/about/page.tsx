import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CATEGORIES, ECOSYSTEM_TOOLS } from '@/lib/constants';
import { AUTHORS } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Natural Girlies Magazine — the first editorial platform where natural beauty meets data, wellness, and cultural storytelling.',
  openGraph: {
    title: 'About | Natural Girlies Magazine',
    description: 'The story behind the magazine.',
  },
};

const VALUES = [
  {
    title: 'Evidence over anecdote.',
    description:
      'We cite our sources, work with dermatologists and trichologists, and refuse to spread hair myths — no matter how compelling they are.',
    icon: '🔬',
  },
  {
    title: 'Culture is not a trend.',
    description:
      'The history of natural hair is deep and political. We treat it with the weight and reverence it deserves — not as an aesthetic.',
    icon: '🌍',
  },
  {
    title: 'Real over perfect.',
    description:
      'No filters on the routines, no paid placement in the product reviews, no corporate-speak in the editorial. This is a publication that actually respects your intelligence.',
    icon: '✨',
  },
  {
    title: 'Community-first design.',
    description:
      'The Hair Wellness Lab, Product Analyzer, and Crown Analysis weren\'t built because they were profitable. They were built because our readers asked for them.',
    icon: '👑',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative bg-gradient-to-b from-cream to-white py-20 md:py-28 overflow-hidden"
      >
        <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-soft-pink/30 to-lavender/15 blur-3xl pointer-events-none" />
        <Container>
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          </div>
          <div className="max-w-3xl relative z-10">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3">
              About the Magazine
            </p>
            <h1
              id="about-hero-heading"
              className="font-playfair text-5xl md:text-6xl font-bold text-espresso leading-tight mb-6"
            >
              We're Natural Girlies.
            </h1>
            <p className="text-xl text-warm-brown leading-relaxed mb-4">
              We built this magazine because the editorial space for natural hair was missing something
              essential: depth. Not just the how-to, but the why. Not just the routine, but the
              science. Not just the style, but the history.
            </p>
            <p className="text-lg text-warm-brown leading-relaxed">
              Natural Girlies Magazine exists at the intersection of beauty, data, wellness, and
              cultural storytelling — for women who want to understand their crown, not just manage it.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="py-16 md:py-20 bg-espresso relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(232,149,106,0.15), transparent 60%)' }} />
        <Container narrow className="relative z-10">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3 text-center">
            Our Mission
          </p>
          <h2
            id="mission-heading"
            className="font-playfair text-3xl md:text-4xl font-bold text-cream leading-tight text-center mb-6"
          >
            The first editorial platform where natural beauty meets data.
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed text-center">
            We combine culture + beauty + DATA + TOOLS through an ecosystem designed to do what
            editorial has never done for natural hair women: give them real information, rooted in
            science and community, delivered with the editorial craft their crown deserves.
          </p>
        </Container>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars-heading" className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
              The Pillars
            </p>
            <h2
              id="pillars-heading"
              className="font-playfair text-3xl font-bold text-espresso"
            >
              Four Areas of Expertise
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex gap-5 p-6 bg-white rounded-[var(--radius-xl)] border border-border hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${cat.color}20` }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-espresso group-hover:text-coral transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-warm-brown leading-relaxed">
                    {cat.longDescription || cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Ecosystem */}
      <section aria-labelledby="ecosystem-heading" className="py-16 md:py-20 bg-gradient-to-b from-cream to-white">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
              The Tools
            </p>
            <h2
              id="ecosystem-heading"
              className="font-playfair text-3xl font-bold text-espresso mb-3"
            >
              Beyond the Editorial
            </h2>
            <p className="text-warm-brown max-w-xl mx-auto">
              The magazine is one part of the ecosystem. We also built the tools that should have
              always existed for natural hair women.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {ECOSYSTEM_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col gap-4 p-6 bg-white rounded-[var(--radius-xl)] border border-border"
              >
                <span className="text-3xl" aria-hidden="true">{tool.icon}</span>
                <h3 className="text-base font-bold text-espresso">{tool.name}</h3>
                <p className="text-sm text-warm-brown leading-relaxed flex-1">{tool.description}</p>
                <Link href={tool.href} className="text-sm font-medium text-coral hover:text-melon transition-colors">
                  {tool.cta} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="py-16 md:py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
              What We Stand For
            </p>
            <h2
              id="values-heading"
              className="font-playfair text-3xl font-bold text-espresso"
            >
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {VALUES.map((value) => (
              <div key={value.title} className="flex gap-4 p-6 bg-cream rounded-[var(--radius-xl)]">
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{value.icon}</span>
                <div>
                  <h3 className="font-bold text-espresso mb-1">{value.title}</h3>
                  <p className="text-sm text-warm-brown leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section aria-labelledby="team-heading" className="py-16 md:py-20 border-t border-border">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
              The Team
            </p>
            <h2
              id="team-heading"
              className="font-playfair text-3xl font-bold text-espresso"
            >
              The Voices Behind the Crown
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTHORS.map((author) => (
              <div key={author.id} className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-[var(--radius-xl)] border border-border">
                <div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-coral/30 to-rose/20 flex items-center justify-center text-xl font-bold text-espresso"
                  aria-hidden="true"
                >
                  {author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-espresso">{author.name}</p>
                  <p className="text-xs text-coral font-medium">{author.role}</p>
                </div>
                <p className="text-xs text-warm-brown leading-relaxed">{author.bio.slice(0, 100)}…</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="py-14 bg-gradient-to-br from-tangerine/20 to-soft-pink/15">
        <Container narrow>
          <div className="text-center flex flex-col items-center gap-5">
            <h2 className="font-playfair text-3xl font-bold text-espresso">
              Join the Community
            </h2>
            <p className="text-warm-brown max-w-md">
              Subscribe to the magazine and get weekly crown intelligence delivered to your inbox.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/subscribe" variant="primary" size="lg">Subscribe</Button>
              <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
