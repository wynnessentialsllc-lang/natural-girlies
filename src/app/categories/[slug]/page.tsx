import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StoryCard } from '@/components/cards/StoryCard';
import { FeaturedStoryCard } from '@/components/cards/FeaturedStoryCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/constants';
import { STORIES } from '@/lib/sample-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} | Natural Girlies Magazine`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryStories = STORIES.filter((s) => s.category.slug === slug);
  const featuredStory = categoryStories[0];
  const restStories = categoryStories.slice(1);
  const relatedCategories = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        aria-labelledby="category-heading"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.color}15 0%, #FDF8F4 60%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${category.color}20` }}
        />
        <Container>
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Categories', href: '/categories' },
                { label: category.name },
              ]}
            />
          </div>
          <div className="max-w-3xl relative z-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] uppercase mb-4 border"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
                borderColor: `${category.color}30`,
              }}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.name}
            </div>
            <h1
              id="category-heading"
              className="font-playfair text-5xl md:text-6xl font-bold text-espresso leading-tight mb-6"
            >
              {category.name}
            </h1>
            <p className="text-lg text-warm-brown leading-relaxed mb-4">
              {category.longDescription || category.description}
            </p>
            <p className="text-sm text-muted">
              {categoryStories.length} {categoryStories.length === 1 ? 'story' : 'stories'} in this category
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section aria-labelledby="featured-heading" className="py-12 md:py-16 bg-white">
          <Container>
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
              style={{ color: category.color }}
            >
              Featured
            </p>
            <FeaturedStoryCard story={featuredStory} />
          </Container>
        </section>
      )}

      {/* All Stories */}
      {restStories.length > 0 && (
        <section aria-labelledby="stories-heading" className="py-12 md:py-16">
          <Container>
            <SectionHeader
              title={`More in ${category.name}`}
              subtitle={`All stories exploring ${category.name.toLowerCase()} from every angle.`}
            />
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              <button disabled className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted disabled:opacity-40" aria-label="Previous page">←</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] bg-coral text-white text-sm font-medium" aria-current="page" aria-label="Page 1">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-warm-brown text-sm hover:border-coral transition-colors" aria-label="Next page">→</button>
            </nav>
          </Container>
        </section>
      )}

      {/* Related Categories */}
      <section aria-labelledby="related-categories-heading" className="py-12 md:py-16 bg-cream border-t border-border">
        <Container>
          <SectionHeader
            title="Explore Other Pillars"
            eyebrow="Related"
          />
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-border hover:shadow-[var(--shadow-warm-sm)] hover:border-transparent transition-all duration-200"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{cat.icon}</span>
                <div>
                  <p className="text-sm font-bold text-espresso group-hover:text-coral transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section aria-label="Newsletter" className="py-14 bg-gradient-to-br from-soft-pink/15 to-lavender/10">
        <Container narrow>
          <div className="text-center flex flex-col items-center gap-5">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-espresso">
              More {category.name} in Your Inbox
            </h2>
            <p className="text-warm-brown max-w-md">
              Subscribe to get weekly stories from the {category.name} pillar and beyond.
            </p>
            <Button href="/subscribe" variant="primary" size="md">
              Subscribe
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
