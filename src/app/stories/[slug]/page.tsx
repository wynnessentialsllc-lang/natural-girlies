import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { STORIES } from '@/lib/sample-data';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StoryCard } from '@/components/cards/StoryCard';
import { CommentSection } from '@/components/comments/CommentSection';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { BackToTop } from '@/components/BackToTop';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ReadingMode } from '@/components/ReadingMode';
import { ShareTools } from '@/components/ShareTools';
import { BookmarkButton } from '@/components/BookmarkButton';
import { TrendingWidget } from '@/components/TrendingWidget';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STORIES.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
  };
}

// Sample rich article body paragraphs
const BODY_CONTENT = [
  {
    type: 'paragraph',
    text: 'Shrinkage is one of the most misunderstood phenomena in the natural hair community. Ask anyone who has been on their natural hair journey for more than a few months, and they will tell you about the shock of watching twelve inches of hair spring back to four. But what the mainstream beauty conversation gets wrong — consistently, stubbornly wrong — is the idea that shrinkage is something to fix.',
  },
  {
    type: 'heading',
    text: 'The Curl Science Behind Shrinkage',
  },
  {
    type: 'paragraph',
    text: 'At the most fundamental level, shrinkage is a function of your hair\'s curl pattern. The tighter the coil, the greater the degree of shrinkage. Type 4C hair, which features the tightest coils of any curl pattern, can shrink to as little as 25% of its actual length when dry. This is not a defect — it\'s geometry. Helical structures are inherently compressible.',
  },
  {
    type: 'pullquote',
    text: 'Shrinkage is the most misread signal in textured hair care. When your hair springs back, it\'s demonstrating elasticity — and elasticity is health.',
    attribution: 'Dr. Kezia Williams, Trichologist',
  },
  {
    type: 'paragraph',
    text: 'Dr. Kezia Williams, a trichologist who has spent fifteen years studying textured hair, explains it this way: "What we call shrinkage is actually the hair fiber returning to its natural, relaxed state. When a curl is fully hydrated and undamaged, it has the elasticity to stretch and contract. When you see significant shrinkage, you\'re actually seeing a sign of good moisture retention and intact hair structure."',
  },
  {
    type: 'heading',
    text: 'What Reduced Shrinkage Actually Signals',
  },
  {
    type: 'paragraph',
    text: 'This is where the conversation gets clinically interesting. Many naturals note that as their hair "gets longer" or "grows stronger," their shrinkage seems to decrease. The truth is more nuanced — and in some cases, more concerning. Reduced shrinkage can be a sign of damage. When the protein structure of the hair shaft breaks down due to excessive heat, chemical processing, or mechanical stress, the hair loses some of its elastic memory. It may appear to stretch more, but it\'s actually lost the structural integrity that makes natural curl patterns so resilient.',
  },
  {
    type: 'image',
    caption: 'Electron microscopy of a healthy Type 4C curl showing intact cuticle layers.',
  },
  {
    type: 'paragraph',
    text: 'This doesn\'t mean all reduced shrinkage is pathological. Natural hair grows in segments, and the oldest portions of your strands — the ends — have been exposed to environmental stress, manipulation, and time for longer than your new growth. Variation in shrinkage along the length of a single strand is entirely normal and expected.',
  },
  {
    type: 'heading',
    text: 'Moisture Retention and the Shrinkage Relationship',
  },
  {
    type: 'paragraph',
    text: 'Perhaps the most actionable takeaway from the shrinkage conversation is its relationship to moisture. Hair that is well-hydrated will shrink more reliably than hair that is chronically dry. If you\'ve noticed that your shrinkage patterns have shifted — either more dramatic or less pronounced — it\'s worth auditing your moisture retention over the past few months.',
  },
];

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) notFound();

  const related = STORIES.filter((s) => s.id !== story.id && s.category.slug === story.category.slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Stories', href: '/stories' },
    { label: story.category.name, href: `/categories/${story.category.slug}` },
    { label: story.title },
  ];

  // Table of contents from headings
  const headings = BODY_CONTENT.filter((b) => b.type === 'heading').map((h) => ({
    text: h.text!,
    id: h.text!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }));

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <div style={{ backgroundColor: '#FDF8F4' }}>
        <Container className="pt-6 pb-2">
          <Breadcrumb items={breadcrumbs} />
        </Container>

        {/* Article header */}
        <article>
          <Container className="pb-8">
            <div className="max-w-3xl">
              {/* Category */}
              <div className="mb-4">
                <Badge category={story.category.slug} size="md">{story.category.name}</Badge>
              </div>

              {/* Title */}
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#3C2415] leading-tight mb-6">
                {story.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-[#6B4D3A] leading-relaxed mb-6">{story.excerpt}</p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B4D3A]">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#E8956A' }}
                    aria-hidden="true"
                  >
                    {story.author.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <Link
                      href={`/authors/${story.author.slug}`}
                      className="font-semibold text-[#3C2415] hover:text-[#E8956A] transition-colors"
                    >
                      {story.author.name}
                    </Link>
                    <p className="text-xs text-[#6B4D3A]">{story.author.role}</p>
                  </div>
                </div>

                <span aria-hidden="true">·</span>
                <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{story.readTime} min read</span>

                <div className="ml-auto flex items-center gap-2">
                  <ReadingMode />
                  <BookmarkButton
                    articleId={story.id}
                    articleType="story"
                    title={story.title}
                    slug={story.slug}
                    category={story.category.slug}
                    showLabel
                  />
                </div>
              </div>

              {/* Share tools (inline, mobile) */}
              <div className="mt-4 block lg:hidden">
                <ShareTools title={story.title} layout="horizontal" />
              </div>
            </div>
          </Container>

          {/* Hero image */}
          <div
            className="w-full h-[40vh] sm:h-[55vh] flex items-center justify-center"
            style={{ backgroundColor: story.category.accentColor + '20' }}
            aria-label={`Cover image for ${story.title}`}
          >
            <div className="text-center opacity-30">
              <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="currentColor" style={{ color: story.category.accentColor }} aria-hidden="true">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <p className="text-sm mt-2" style={{ color: story.category.accentColor }}>Cover image</p>
            </div>
          </div>

          {/* Body + Sidebar layout */}
          <Container className="py-10">
            <div className="flex gap-10">
              {/* Floating share — desktop */}
              <div className="hidden lg:flex flex-col items-center pt-2 shrink-0" data-sidebar>
                <div className="sticky top-24">
                  <ShareTools title={story.title} layout="vertical" />
                </div>
              </div>

              {/* Article body */}
              <div className="flex-1 min-w-0 max-w-2xl" data-article-body>
                <div className="prose-natural">
                  {BODY_CONTENT.map((block, idx) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={idx}
                          className={`text-[#3C2415] leading-[1.85] text-lg mb-6 ${
                            idx === 0
                              ? 'first-letter:text-6xl first-letter:font-playfair first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1'
                              : ''
                          }`}
                          style={idx === 0 ? { '--tw-prose-drop-cap': story.category.accentColor } as React.CSSProperties : undefined}
                        >
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'heading') {
                      const headingId = block.text!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      return (
                        <h2
                          key={idx}
                          id={headingId}
                          className="font-playfair text-2xl font-bold text-[#3C2415] mt-10 mb-4"
                        >
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === 'pullquote') {
                      return (
                        <blockquote
                          key={idx}
                          className="my-8 px-6 py-6 rounded-2xl relative"
                          style={{ backgroundColor: story.category.accentColor + '15', borderLeft: `4px solid ${story.category.accentColor}` }}
                        >
                          <span
                            className="font-playfair text-6xl leading-none absolute top-2 left-4 opacity-30"
                            style={{ color: story.category.accentColor }}
                            aria-hidden="true"
                          >
                            &ldquo;
                          </span>
                          <p className="font-playfair text-xl italic text-[#3C2415] leading-relaxed pl-6">
                            {block.text}
                          </p>
                          {block.attribution && (
                            <footer className="mt-3 text-sm font-semibold pl-6" style={{ color: story.category.accentColor }}>
                              — {block.attribution}
                            </footer>
                          )}
                        </blockquote>
                      );
                    }
                    if (block.type === 'image') {
                      return (
                        <figure key={idx} className="my-8">
                          <div
                            className="w-full h-64 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: story.category.accentColor + '10' }}
                            aria-label={block.caption}
                          >
                            <svg className="w-16 h-16 opacity-20" viewBox="0 0 24 24" fill="currentColor" style={{ color: story.category.accentColor }} aria-hidden="true">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                          </div>
                          {block.caption && (
                            <figcaption className="text-sm text-[#6B4D3A] text-center mt-2 italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#E8956A]/20">
                    <span className="text-sm text-[#6B4D3A] font-medium mr-1">Tags:</span>
                    {story.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/stories?tag=${tag.slug}`}
                        className="text-sm px-3 py-1 rounded-full border border-[#E8956A]/30 text-[#6B4D3A] hover:border-[#E8956A] hover:text-[#E8956A] transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Author bio card */}
                <div className="mt-10 p-6 rounded-2xl border border-[#E8956A]/20 bg-white">
                  <div className="flex gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                      style={{ backgroundColor: '#E8956A' }}
                      aria-hidden="true"
                    >
                      {story.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <Link
                        href={`/authors/${story.author.slug}`}
                        className="font-playfair text-lg font-bold text-[#3C2415] hover:text-[#E8956A] transition-colors"
                      >
                        {story.author.name}
                      </Link>
                      <p className="text-sm text-[#E8956A] font-medium">{story.author.role}</p>
                      <p className="text-sm text-[#6B4D3A] mt-2 leading-relaxed">{story.author.bio}</p>
                      <Link
                        href={`/authors/${story.author.slug}`}
                        className="text-sm text-[#E8956A] hover:underline mt-2 inline-block"
                      >
                        More from {story.author.name.split(' ')[0]} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar — desktop */}
              <aside className="hidden xl:block w-64 shrink-0" data-sidebar aria-label="Article sidebar">
                <div className="sticky top-24 space-y-8">
                  {/* Table of contents */}
                  {headings.length > 0 && (
                    <nav aria-label="Table of contents">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B4D3A] mb-3">
                        In This Article
                      </h3>
                      <ol className="space-y-2">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className="text-sm text-[#6B4D3A] hover:text-[#E8956A] transition-colors leading-snug block"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  {/* Trending */}
                  <TrendingWidget limit={4} />
                </div>
              </aside>
            </div>
          </Container>
        </article>

        {/* Related stories */}
        {related.length > 0 && (
          <section className="py-12 border-t border-[#E8956A]/20" aria-label="Related stories">
            <Container>
              <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-6">
                Related Stories
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((s) => (
                  <StoryCard key={s.id} story={s} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Comments */}
        <Container className="py-2">
          <CommentSection articleId={story.id} />
        </Container>

        {/* Newsletter */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
