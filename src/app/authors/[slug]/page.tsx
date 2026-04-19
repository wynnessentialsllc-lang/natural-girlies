import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTHORS, STORIES, BLOG_POSTS } from '@/lib/sample-data';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StoryCard } from '@/components/cards/StoryCard';
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.bio,
  };
}

const EXPERTISE_MAP: Record<string, string[]> = {
  'imani-rhodes': ['Hair Wellness', 'Editorial Direction', 'Cultural Storytelling', 'Community Building'],
  'zora-mensah': ['Cosmetic Chemistry', 'Ingredient Science', 'Skincare Formulation', 'Beauty Analysis'],
  'nia-okafor': ['Fashion Styling', 'Cultural Commentary', 'Natural Hair & Style', 'Editorial Fashion'],
  'priya-deveaux': ['Data Journalism', 'Wellness Research', 'Hair Science', 'Health Communication'],
};

export default async function AuthorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) notFound();

  const authorStories = STORIES.filter((s) => s.author.id === author.id);
  const authorBlogs = BLOG_POSTS.filter((b) => b.author.id === author.id);
  const expertise = EXPERTISE_MAP[author.slug] || [];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contributors', href: '/authors' },
    { label: author.name },
  ];

  return (
    <div style={{ backgroundColor: '#FDF8F4' }}>
      <Container className="pt-6">
        <Breadcrumb items={breadcrumbs} />
      </Container>

      {/* Author hero */}
      <section className="py-12" aria-label={`${author.name} profile`}>
        <Container>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center text-white text-4xl font-bold shrink-0"
              style={{ backgroundColor: '#E8956A' }}
              aria-hidden="true"
            >
              {author.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div className="flex-1">
              <h1 className="font-playfair text-4xl font-bold text-[#3C2415] mb-1">{author.name}</h1>
              <p className="text-[#E8956A] font-semibold text-lg mb-4">{author.role}</p>
              <p className="text-[#6B4D3A] leading-relaxed max-w-2xl mb-5">{author.bio}</p>

              {/* Socials */}
              {author.socials && (
                <div className="flex gap-3 mb-5">
                  {author.socials.instagram && (
                    <a
                      href={`https://instagram.com/${author.socials.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} on Instagram`}
                      className="flex items-center gap-2 text-sm text-[#6B4D3A] hover:text-[#E8956A] transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      {author.socials.instagram}
                    </a>
                  )}
                  {author.socials.twitter && (
                    <a
                      href={`https://twitter.com/${author.socials.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} on X (Twitter)`}
                      className="flex items-center gap-2 text-sm text-[#6B4D3A] hover:text-[#E8956A] transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      {author.socials.twitter}
                    </a>
                  )}
                </div>
              )}

              {/* Expertise tags */}
              {expertise.length > 0 && (
                <div className="flex flex-wrap gap-2" aria-label="Areas of expertise">
                  {expertise.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: '#E8956A' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Stories */}
      {authorStories.length > 0 && (
        <section className="py-10 border-t border-[#E8956A]/20" aria-label={`Stories by ${author.name}`}>
          <Container>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-6">
              Stories by {author.name.split(' ')[0]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Blog posts */}
      {authorBlogs.length > 0 && (
        <section className="py-10 border-t border-[#E8956A]/20" aria-label={`Blog posts by ${author.name}`}>
          <Container>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-6">
              Blog Posts by {author.name.split(' ')[0]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorBlogs.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {authorStories.length === 0 && authorBlogs.length === 0 && (
        <Container className="py-12 text-center text-[#6B4D3A]">
          <p>No published content yet — check back soon.</p>
        </Container>
      )}

      <NewsletterSignup />
    </div>
  );
}
