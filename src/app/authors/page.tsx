import type { Metadata } from 'next';
import Link from 'next/link';
import { AUTHORS } from '@/lib/sample-data';
import { Container } from '@/components/ui/Container';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { STORIES, BLOG_POSTS } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: 'Our Contributors',
  description: 'Meet the writers, editors, and experts behind Natural Girlies Magazine.',
};

export default function AuthorsPage() {
  return (
    <div style={{ backgroundColor: '#FDF8F4' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#3C2415' }} className="py-16">
        <Container>
          <p className="text-[#E8956A] text-sm font-semibold uppercase tracking-widest mb-3 text-center">
            The Team
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white text-center mb-4">
            Our Contributors
          </h1>
          <p className="text-white/70 text-lg text-center max-w-xl mx-auto">
            Meet the writers, editors, cosmetic chemists, and cultural thinkers who make Natural Girlies possible.
          </p>
        </Container>
      </div>

      {/* Authors grid */}
      <Container className="py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {AUTHORS.map((author) => {
            const storyCount = STORIES.filter((s) => s.author.id === author.id).length;
            const blogCount = BLOG_POSTS.filter((b) => b.author.id === author.id).length;

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group flex gap-5 p-6 bg-white rounded-2xl border border-[#E8956A]/10 hover:shadow-md transition-shadow"
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0"
                  style={{ backgroundColor: '#E8956A' }}
                  aria-hidden="true"
                >
                  {author.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <div className="min-w-0">
                  <h2 className="font-playfair text-xl font-bold text-[#3C2415] group-hover:text-[#E8956A] transition-colors">
                    {author.name}
                  </h2>
                  <p className="text-sm font-medium text-[#E8956A] mb-2">{author.role}</p>
                  <p className="text-sm text-[#6B4D3A] leading-relaxed line-clamp-3">{author.bio}</p>
                  <p className="text-xs text-[#6B4D3A]/70 mt-3">
                    {storyCount} {storyCount === 1 ? 'story' : 'stories'} · {blogCount} blog {blogCount === 1 ? 'post' : 'posts'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      <NewsletterSignup />
    </div>
  );
}
