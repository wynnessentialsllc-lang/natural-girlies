import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Explore Natural Girlies Magazine by category: Crown (hair), Skin, Fashion, and Beauty.',
  openGraph: {
    title: 'Categories | Natural Girlies Magazine',
    description: 'Browse by pillar: Crown, Skin, Fashion, Beauty.',
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-cream to-white py-14 md:py-20 border-b border-border">
        <Container>
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3">
              The Pillars
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              Browse by Category
            </h1>
            <p className="text-lg text-warm-brown leading-relaxed">
              Natural Girlies Magazine is organized around four content pillars — each one a deep,
              ongoing editorial commitment, not a surface-level section.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="categories-heading" className="py-14 md:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
