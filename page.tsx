'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StoryCard } from '@/components/cards/StoryCard';
import { FeaturedStoryCard } from '@/components/cards/FeaturedStoryCard';
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import { TrendingItem } from '@/components/cards/TrendingItem';
import { SignatureSectionCard } from '@/components/cards/SignatureSectionCard';
import { STORIES, BLOG_POSTS, ISSUES, SIGNATURE_SECTION_DATA } from '@/lib/sample-data';
import { ECOSYSTEM_TOOLS } from '@/lib/constants';

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

const trendingStories = STORIES.filter((s) => s.trending).slice(0, 5);
const featuredStories = STORIES.filter((s) => s.featured).slice(0, 3);
const latestBlogPosts = BLOG_POSTS.slice(0, 3);
const currentIssue = ISSUES.find((i) => i.current);

export default function HomePage() {
  return (
    <>
      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-gradient-to-b from-cream via-[#fdf0e8] to-cream pt-16 pb-24 md:pt-24 md:pb-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-soft-pink/40 to-lavender/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-tangerine/30 to-butter-yellow/20 blur-3xl"
        />

        <Container className="relative z-10 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral/10 text-coral text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-coral/20">
              <span aria-hidden="true">👑</span> Spring 2026 Issue Is Live
            </span>
          </motion.div>

          <motion.h1
            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-espresso leading-[1.05] tracking-tight max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Where Every{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #E8956A 0%, #F2C4CE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Crown
            </span>{' '}
            Tells a Story
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-warm-brown leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            Hair wellness meets editorial storytelling. Data meets beauty. Culture meets care.
            The magazine built for women who refuse to be reduced to a hair type.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          >
            <Button href="/magazine" variant="primary" size="lg">
              Explore the Current Issue
            </Button>
            <Button href="/stories" variant="ghost" size="lg">
              Read Stories
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-6 sm:gap-12 mt-6 pt-8 border-t border-border w-full max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { value: '3,200+', label: 'Lab Users' },
              { value: '4 Issues', label: 'Published' },
              { value: '8 Stories', label: 'This Issue' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-playfair text-2xl font-bold text-espresso">{stat.value}</span>
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ─── 2. CROWN REPORT SPOTLIGHT ──────────────────────────────────── */}
      <section aria-labelledby="crown-report-heading" className="py-16 md:py-20 bg-cream">
        <Container>
          <FadeUp>
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden bg-gradient-to-br from-espresso via-warm-brown to-espresso p-8 md:p-12 lg:p-16">
              <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full bg-coral/10 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-lavender/10 blur-3xl" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">📊</span>
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-coral">
                      The Crown Report
                    </span>
                  </div>

                  <h2
                    id="crown-report-heading"
                    className="font-playfair text-3xl md:text-4xl font-bold text-cream leading-tight"
                  >
                    The Data Behind Your Crown
                  </h2>

                  <blockquote className="border-l-2 border-coral pl-5">
                    <p className="font-playfair text-xl text-cream/90 leading-relaxed italic">
                      "67% of women in our community are over-manipulating their ends — and most
                      don't know it yet."
                    </p>
                  </blockquote>

                  <p className="text-cream/70 leading-relaxed">
                    Every quarter, we pull insights from 3,200+ Hair Wellness Lab users and turn
                    the numbers into the editorial you actually need.
                  </p>

                  <Button href="/stories/crown-report" variant="primary" size="md" className="self-start">
                    Read the Full Crown Report
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { stat: '67%', label: 'Over-manipulating ends', color: '#E8956A' },
                    { stat: '41%', label: 'Incorrect porosity assessment', color: '#F2C4CE' },
                    { stat: '83%', label: 'Low-protein diet impact', color: '#D4C1EC' },
                    { stat: '2.3×', label: 'Retention with consistent moisture', color: '#F7E5A0' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-[var(--radius-lg)] bg-cream/5 border border-cream/10 flex flex-col gap-1"
                    >
                      <span
                        className="font-playfair text-2xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.stat}
                      </span>
                      <span className="text-xs text-cream/60 leading-snug">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ─── 3. FEATURED STORIES ────────────────────────────────────────── */}
      <section aria-labelledby="featured-stories-heading" className="py-16 md:py-20">
        <Container>
          <FadeUp>
            <SectionHeader
              title="Featured Stories"
              subtitle="The stories worth making time for this week."
              viewAllHref="/stories"
              viewAllLabel="All Stories"
              eyebrow="Editor's Picks"
            />
          </FadeUp>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <FadeUp delay={0.1} className="lg:col-span-3">
              <FeaturedStoryCard story={featuredStories[0]} />
            </FadeUp>
            {featuredStories.slice(1).map((story, i) => (
              <FadeUp key={story.id} delay={0.15 + i * 0.05} className="lg:col-span-1">
                <StoryCard story={story} className="h-full" />
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 4. CURRENT ISSUE ───────────────────────────────────────────── */}
      {currentIssue && (
        <section
          aria-labelledby="current-issue-heading"
          className="py-16 md:py-20 bg-gradient-to-b from-white to-cream"
        >
          <Container>
            <FadeUp>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-[var(--radius-xl)] bg-gradient-to-br from-soft-pink/30 to-lavender/20 blur-2xl"
                  />
                  <div className="relative aspect-[3/4] max-w-xs mx-auto rounded-[var(--radius-xl)] overflow-hidden bg-gradient-to-b from-espresso to-warm-brown shadow-[var(--shadow-warm-xl)] flex flex-col items-center justify-center p-8">
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-coral/20 to-transparent" />
                    <div className="relative z-10 text-center flex flex-col gap-2">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-cream/50">
                        {currentIssue.season} {currentIssue.year}
                      </p>
                      <h3 className="font-playfair text-3xl font-bold text-cream leading-tight">
                        Natural Girlies
                      </h3>
                      <p className="text-sm text-cream/70">Magazine</p>
                      <div className="mt-4 w-12 h-px bg-coral/50 mx-auto" aria-hidden="true" />
                      <p className="text-xs text-cream/50 mt-2">Volume {currentIssue.volume}</p>
                    </div>
                    <span
                      className="absolute top-4 right-4 px-2 py-0.5 bg-coral text-white text-[10px] font-semibold tracking-wide uppercase rounded-full"
                      aria-label="Current issue"
                    >
                      Now
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
                      Current Issue
                    </p>
                    <h2
                      id="current-issue-heading"
                      className="font-playfair text-3xl md:text-4xl font-bold text-espresso leading-tight"
                    >
                      {currentIssue.title}
                    </h2>
                  </div>

                  <div className="relative pl-5 border-l-2 border-coral/40">
                    <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                      From the Editor
                    </p>
                    <p className="text-warm-brown leading-relaxed italic font-playfair">
                      "{currentIssue.editorLetter.slice(0, 200)}…"
                    </p>
                    <p className="text-sm font-medium text-espresso mt-2">
                      — Imani Rhodes, Editor-in-Chief
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button href={`/magazine/${currentIssue.slug}`} variant="primary" size="md">
                      Read This Issue
                    </Button>
                    <Button href="/magazine" variant="secondary" size="md">
                      Browse the Archive
                    </Button>
                  </div>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      )}

      {/* ─── 5. SIGNATURE SECTIONS ──────────────────────────────────────── */}
      <section aria-labelledby="signature-sections-heading" className="py-16 md:py-20">
        <Container>
          <FadeUp>
            <SectionHeader
              title="Signature Series"
              subtitle="Our recurring features — where the depth lives."
              eyebrow="Always Worth Reading"
              centered
            />
          </FadeUp>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {SIGNATURE_SECTION_DATA.map((section, i) => (
              <FadeUp key={section.id} delay={i * 0.06}>
                <SignatureSectionCard section={section} className="h-full" />
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 6. TRENDING + BLOG ─────────────────────────────────────────── */}
      <section aria-labelledby="trending-heading" className="py-16 md:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <SectionHeader
                title="Most Read This Week"
                eyebrow="Trending"
              />
              <div className="mt-6">
                {trendingStories.map((story, i) => (
                  <TrendingItem key={story.id} story={story} rank={i + 1} />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <SectionHeader
                title="From the Blog"
                viewAllHref="/blog"
                viewAllLabel="All Posts"
                eyebrow="Latest"
              />
              <div className="mt-6 flex flex-col gap-4">
                {latestBlogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} horizontal />
                ))}
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ─── 7. THE GIRLIES SPEAK ───────────────────────────────────────── */}
      <section
        aria-labelledby="girlies-speak-heading"
        className="py-16 md:py-20 bg-gradient-to-br from-soft-pink/20 via-cream to-lavender/15"
      >
        <Container narrow>
          <FadeUp>
            <div className="text-center flex flex-col items-center gap-6">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-coral">
                The Girlies Speak
              </span>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-6 -left-4 font-playfair text-8xl text-soft-pink/60 leading-none select-none"
                >
                  &ldquo;
                </span>
                <blockquote>
                  <p
                    id="girlies-speak-heading"
                    className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-espresso leading-snug max-w-2xl relative z-10"
                  >
                    I spent five years chasing moisture and one week understanding my porosity. The
                    Hair Wellness Lab gave me a vocabulary for my own hair.
                  </p>
                  <footer className="mt-6 flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/30 to-rose/30 flex items-center justify-center text-sm font-bold text-espresso"
                      aria-hidden="true"
                    >
                      J
                    </div>
                    <div className="text-left">
                      <cite className="text-sm font-semibold text-espresso not-italic">
                        Jasmine T., Atlanta
                      </cite>
                      <p className="text-xs text-muted">Hair Wellness Lab Member</p>
                    </div>
                  </footer>
                </blockquote>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-4 font-playfair text-8xl text-soft-pink/60 leading-none select-none rotate-180"
                >
                  &ldquo;
                </span>
              </div>

              <Button href="/stories/girlies-speak" variant="secondary" size="md">
                Join the Conversation
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ─── 8. ECOSYSTEM CTA ───────────────────────────────────────────── */}
      <section
        aria-labelledby="ecosystem-heading"
        className="py-16 md:py-20 bg-espresso relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(232,149,106,0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgba(212,193,236,0.1), transparent 50%)',
          }}
        />
        <Container className="relative z-10">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3 block">
                The Ecosystem
              </span>
              <h2
                id="ecosystem-heading"
                className="font-playfair text-3xl md:text-4xl font-bold text-cream leading-tight mb-3"
              >
                Your Crown Deserves Data.
              </h2>
              <p className="text-cream/60 max-w-xl mx-auto">
                We built the tools that should have always existed. Free, science-backed, designed
                for natural hair.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {ECOSYSTEM_TOOLS.map((tool, i) => (
                <FadeUp key={tool.name} delay={i * 0.08}>
                  <div className="group flex flex-col gap-4 p-6 rounded-[var(--radius-xl)] bg-cream/5 border border-cream/10 hover:bg-cream/10 hover:border-cream/20 transition-all duration-300">
                    <span className="text-3xl" aria-hidden="true">{tool.icon}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-cream">{tool.name}</h3>
                      <p className="text-sm text-cream/60 leading-relaxed">{tool.description}</p>
                    </div>
                    <Link
                      href={tool.href}
                      className="mt-auto text-sm font-medium text-coral hover:text-melon transition-colors"
                    >
                      {tool.cta} →
                    </Link>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ─── 9. NEWSLETTER ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="newsletter-heading"
        className="py-16 md:py-20 bg-gradient-to-b from-cream to-white"
      >
        <Container narrow>
          <FadeUp>
            <div className="text-center flex flex-col items-center gap-6">
              <div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3 block">
                  Newsletter
                </span>
                <h2
                  id="newsletter-heading"
                  className="font-playfair text-3xl md:text-4xl font-bold text-espresso"
                >
                  Stay in the Know.
                </h2>
                <p className="mt-3 text-warm-brown text-lg">
                  Weekly crown intelligence, beauty breakdowns, and stories that matter — straight
                  to your inbox.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-md flex flex-col sm:flex-row gap-2"
                aria-label="Newsletter subscription form"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="flex-1 px-5 py-3 text-sm bg-white border border-border rounded-[var(--radius-md)] text-espresso placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-coral text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-melon transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-muted">
                No spam. Unsubscribe anytime. We respect your inbox like we respect your wash day.
              </p>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  );
}
