import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BLOG_POSTS } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Brand updates, beauty breakdowns, launch notes, behind-the-scenes moments, and everything in between.',
  openGraph: {
    title: 'The Blog | Natural Girlies Magazine',
    description: 'Brand updates, beauty breakdowns, launch notes, and behind-the-scenes moments.',
  },
};

const FILTER_TAGS = ['All', 'Crown', 'Skin', 'Fashion', 'Beauty', 'Launches', 'Behind the Scenes', 'Community', 'Editorial'];

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const restPosts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-cream to-white py-14 md:py-20 border-b border-border">
        <Container>
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3">
              The Blog
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              Behind the Magazine
            </h1>
            <p className="text-lg text-warm-brown leading-relaxed">
              Brand updates, beauty breakdowns, launch notes, behind-the-scenes moments, and
              everything in between. This is where we think out loud.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section aria-labelledby="featured-post-heading" className="py-12 md:py-16 bg-white">
          <Container>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-6">
              Featured
            </p>
            <BlogPostCard post={featuredPost} />
          </Container>
        </section>
      )}

      {/* Filter Chips */}
      <section aria-label="Filter posts by category" className="py-6 border-y border-border bg-cream sticky top-16 z-20">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Category filters">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  tag === 'All'
                    ? 'bg-coral text-white border-coral'
                    : 'bg-white text-warm-brown border-border hover:border-coral hover:text-coral'
                }`}
                aria-pressed={tag === 'All'}
              >
                {tag}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <section aria-labelledby="all-posts-heading" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            title="All Posts"
            subtitle={`${BLOG_POSTS.length} articles and counting.`}
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 text-sm font-medium text-warm-brown bg-white border border-border rounded-[var(--radius-md)] hover:border-coral hover:text-coral transition-colors">
              Load More Posts
            </button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section aria-label="Newsletter signup" className="py-14 bg-gradient-to-br from-soft-pink/15 to-lavender/10">
        <Container narrow>
          <div className="text-center flex flex-col items-center gap-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-espresso">
              Get the Blog in Your Inbox
            </h2>
            <p className="text-warm-brown">
              New posts, launch announcements, and behind-the-scenes moments — weekly.
            </p>
            <NewsletterForm id="blog-email" className="w-full max-w-sm" />
          </div>
        </Container>
      </section>
    </div>
  );
}
