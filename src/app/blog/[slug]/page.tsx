import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/sample-data';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import { CommentSection } from '@/components/comments/CommentSection';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { BackToTop } from '@/components/BackToTop';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ReadingMode } from '@/components/ReadingMode';
import { ShareTools } from '@/components/ShareTools';
import { BookmarkButton } from '@/components/BookmarkButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const BODY_PARAGRAPHS = [
  'It started with a direct message. "I have ten products and none of them are working." She had listed them all out — five for moisture, two protein treatments, a scalp oil, a leave-in, and something that promised to do everything. Each product had been recommended by a different creator, a different article, a different algorithm. None of them were working together. Some were actively working against each other.',
  'This is the story behind every tool we build at Natural Girlies. Not a gap in the market, not a product opportunity — a real problem we saw playing out in our community. The Product Analyzer was born not in a strategy session but in a conversation with someone who was trying her best with information that was incomplete.',
  'The challenge with hair care formulation is that ingredients rarely work in isolation. A humectant that draws moisture beautifully in one climate will pull moisture out of your hair in a low-humidity environment. A protein treatment that rebuilds strength in one hair type will cause brittleness and breakage in another. Most product recommendations ignore these variables entirely.',
  'We spent four months working with a cosmetic chemist and a trichologist to build a library of ingredient interactions — what works together, what competes, what straight-up should not be in the same routine. The result is a tool that gives you a plain-language read on your current lineup and flags the combinations that might be causing your problems.',
  'The most common finding? Product overload. We were seeing routines with three or four ingredients doing the same job — not synergistically, just redundantly. Removing two products and replacing them with nothing at all was, in many cases, the most transformative recommendation we made.',
];

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.category.slug === post.category.slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.category.name, href: `/categories/${post.category.slug}` },
    { label: post.title },
  ];

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <div style={{ backgroundColor: '#FDF8F4' }}>
        <Container className="pt-6 pb-2">
          <Breadcrumb items={breadcrumbs} />
        </Container>

        <article>
          <Container className="pb-8">
            <div className="max-w-3xl">
              <div className="mb-4">
                <Badge category={post.category.slug} size="md">{post.category.name}</Badge>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#3C2415] leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-[#6B4D3A] leading-relaxed mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B4D3A]">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#E8956A' }}
                    aria-hidden="true"
                  >
                    {post.author.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <Link
                      href={`/authors/${post.author.slug}`}
                      className="font-semibold text-[#3C2415] hover:text-[#E8956A] transition-colors"
                    >
                      {post.author.name}
                    </Link>
                    <p className="text-xs text-[#6B4D3A]">{post.author.role}</p>
                  </div>
                </div>

                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime} min read</span>

                <div className="ml-auto flex items-center gap-2">
                  <ReadingMode />
                  <BookmarkButton
                    articleId={post.id}
                    articleType="blog"
                    title={post.title}
                    slug={post.slug}
                    category={post.category.slug}
                    showLabel
                  />
                </div>
              </div>

              <div className="mt-4 block lg:hidden">
                <ShareTools title={post.title} layout="horizontal" />
              </div>
            </div>
          </Container>

          {/* Hero */}
          <div
            className="w-full h-[35vh] sm:h-[50vh] flex items-center justify-center"
            style={{ backgroundColor: post.category.accentColor + '20' }}
            aria-label={`Cover image for ${post.title}`}
          >
            <div className="text-center opacity-30">
              <svg className="w-20 h-20 mx-auto" viewBox="0 0 24 24" fill="currentColor" style={{ color: post.category.accentColor }} aria-hidden="true">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          </div>

          <Container className="py-10">
            <div className="flex gap-10">
              {/* Share — desktop */}
              <div className="hidden lg:flex flex-col items-center pt-2 shrink-0" data-sidebar>
                <div className="sticky top-24">
                  <ShareTools title={post.title} layout="vertical" />
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0 max-w-2xl" data-article-body>
                <div className="space-y-0">
                  {BODY_PARAGRAPHS.map((para, idx) => (
                    <p
                      key={idx}
                      className={`text-[#3C2415] leading-[1.85] text-lg mb-6 ${
                        idx === 0
                          ? 'first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1'
                          : ''
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Pull quote */}
                <blockquote
                  className="my-8 px-6 py-6 rounded-2xl relative"
                  style={{ backgroundColor: post.category.accentColor + '12', borderLeft: `4px solid ${post.category.accentColor}` }}
                >
                  <span
                    className="font-playfair text-6xl leading-none absolute top-2 left-4 opacity-25"
                    style={{ color: post.category.accentColor }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="font-playfair text-xl italic text-[#3C2415] leading-relaxed pl-6">
                    Product overload is the number one thing holding naturals back. More products is rarely the answer.
                  </p>
                  <footer className="mt-3 text-sm font-semibold pl-6" style={{ color: post.category.accentColor }}>
                    — Imani Rhodes, Editor-in-Chief
                  </footer>
                </blockquote>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#E8956A]/20">
                    <span className="text-sm text-[#6B4D3A] font-medium mr-1">Tags:</span>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog?tag=${tag.slug}`}
                        className="text-sm px-3 py-1 rounded-full border border-[#E8956A]/30 text-[#6B4D3A] hover:border-[#E8956A] hover:text-[#E8956A] transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Author bio */}
                <div className="mt-10 p-6 rounded-2xl border border-[#E8956A]/20 bg-white">
                  <div className="flex gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                      style={{ backgroundColor: '#E8956A' }}
                      aria-hidden="true"
                    >
                      {post.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <Link
                        href={`/authors/${post.author.slug}`}
                        className="font-playfair text-lg font-bold text-[#3C2415] hover:text-[#E8956A] transition-colors"
                      >
                        {post.author.name}
                      </Link>
                      <p className="text-sm text-[#E8956A] font-medium">{post.author.role}</p>
                      <p className="text-sm text-[#6B4D3A] mt-2 leading-relaxed">{post.author.bio}</p>
                      <Link
                        href={`/authors/${post.author.slug}`}
                        className="text-sm text-[#E8956A] hover:underline mt-2 inline-block"
                      >
                        More from {post.author.name.split(' ')[0]} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-12 border-t border-[#E8956A]/20" aria-label="Related blog posts">
            <Container>
              <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-6">More from the Blog</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <BlogPostCard key={p.id} post={p} />
                ))}
              </div>
            </Container>
          </section>
        )}

        <Container className="py-2">
          <CommentSection articleId={post.id} title="Join the Discussion" />
        </Container>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
