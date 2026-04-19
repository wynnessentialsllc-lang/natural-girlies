import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StoryCard } from '@/components/cards/StoryCard';
import { FeaturedStoryCard } from '@/components/cards/FeaturedStoryCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { STORIES } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'Long-form editorial content at the intersection of hair wellness, beauty science, culture, and identity.',
  openGraph: {
    title: 'Stories | Natural Girlies Magazine',
    description: 'Long-form editorial content. The stories that go deep.',
  },
};

const CATEGORY_FILTERS = ['All', ...CATEGORIES.map((c) => c.name)];

export default function StoriesPage() {
  const heroStory = STORIES[0];
  const featuredStories = STORIES.filter((s) => s.featured).slice(1, 3);
  const allStories = STORIES.slice(1);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-cream to-white py-14 md:py-20 border-b border-border">
        <Container>
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Stories' }]} />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3">
              Stories
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              Where the Depth Lives
            </h1>
            <p className="text-lg text-warm-brown leading-relaxed">
              Long-form editorial at the intersection of hair wellness, beauty science, culture,
              and identity. These are the pieces worth reading slowly.
            </p>
          </div>
        </Container>
      </section>

      {/* Hero Story */}
      <section aria-labelledby="hero-story-heading" className="py-12 md:py-16">
        <Container>
          <FeaturedStoryCard story={heroStory} />
        </Container>
      </section>

      {/* Category Filter */}
      <section aria-label="Filter stories" className="py-5 border-y border-border bg-cream sticky top-16 z-20">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Category filters">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  cat === 'All'
                    ? 'bg-coral text-white border-coral'
                    : 'bg-white text-warm-brown border-border hover:border-coral hover:text-coral'
                }`}
                aria-pressed={cat === 'All'}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Stories Grid */}
      <section aria-labelledby="all-stories-heading" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            title="All Stories"
            subtitle={`${STORIES.length} pieces of editorial across Crown, Skin, Fashion, and Beauty.`}
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {/* Pagination */}
          <nav aria-label="Story pagination" className="mt-12 flex items-center justify-center gap-2">
            <button
              aria-label="Previous page"
              disabled
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted disabled:opacity-40"
            >
              ←
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                aria-label={`Page ${page}`}
                aria-current={page === 1 ? 'page' : undefined}
                className={`w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-sm font-medium border transition-colors ${
                  page === 1
                    ? 'bg-coral text-white border-coral'
                    : 'bg-white text-warm-brown border-border hover:border-coral'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              aria-label="Next page"
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-warm-brown hover:border-coral transition-colors"
            >
              →
            </button>
          </nav>
        </Container>
      </section>
    </div>
  );
}
