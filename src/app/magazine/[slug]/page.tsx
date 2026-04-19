import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ISSUES, AUTHORS } from '@/lib/sample-data';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StoryCard } from '@/components/cards/StoryCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { BackToTop } from '@/components/BackToTop';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ISSUES.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = ISSUES.find((i) => i.slug === slug);
  if (!issue) return {};
  return {
    title: issue.title,
    description: issue.editorLetter.slice(0, 160),
  };
}

const SEASON_COLORS: Record<string, string> = {
  Spring: '#E8956A',
  Summer: '#F5A882',
  Fall: '#D4A574',
  Winter: '#9B7BC4',
};

export default async function MagazineIssueDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const issue = ISSUES.find((i) => i.slug === slug);
  if (!issue) notFound();

  const accentColor = SEASON_COLORS[issue.season] || '#E8956A';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Magazine', href: '/magazine' },
    { label: issue.title },
  ];

  const otherIssues = ISSUES.filter((i) => i.id !== issue.id);

  return (
    <>
      <BackToTop />

      <div style={{ backgroundColor: '#FDF8F4' }}>
        <Container className="pt-6">
          <Breadcrumb items={breadcrumbs} />
        </Container>

        {/* Issue hero */}
        <section className="py-10" aria-label={`${issue.title} issue`}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Cover */}
              <div className="relative">
                <div
                  className="aspect-[3/4] rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
                  style={{ backgroundColor: accentColor + '20' }}
                  aria-label={`Cover of ${issue.title}`}
                >
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4" aria-hidden="true">👑</div>
                    <p className="font-playfair text-2xl font-bold text-[#3C2415] leading-tight">
                      Natural Girlies
                    </p>
                    <p className="font-playfair text-lg text-[#6B4D3A] mt-1">{issue.season} {issue.year}</p>
                    <div
                      className="mt-4 h-0.5 w-16 mx-auto"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Current badge */}
                {issue.current && (
                  <div
                    className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    Current Issue
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                {/* Season badge */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {issue.season} {issue.year}
                  </span>
                  <span className="text-sm text-[#6B4D3A]">Volume {issue.volume}</span>
                </div>

                <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#3C2415] leading-tight mb-4">
                  {issue.title}
                </h1>

                <p className="text-[#6B4D3A] text-sm mb-6">
                  Published {formatDate(issue.publishedAt)} · {issue.stories.length} stories
                </p>

                {/* Editor&apos;s note */}
                <div className="p-6 rounded-2xl border border-[#E8956A]/20 bg-white">
                  <h2 className="font-playfair text-lg font-bold text-[#3C2415] mb-3">
                    A Note from the Editor
                  </h2>
                  <blockquote className="text-[#6B4D3A] leading-relaxed italic">
                    &ldquo;{issue.editorLetter}&rdquo;
                  </blockquote>
                  <footer className="mt-3 text-sm font-semibold" style={{ color: accentColor }}>
                    — Imani Rhodes, Editor-in-Chief
                  </footer>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Inside This Issue */}
        <section className="py-12 border-t border-[#E8956A]/20" aria-label="Stories in this issue">
          <Container>
            <h2 className="font-playfair text-3xl font-bold text-[#3C2415] mb-8">
              Inside This Issue
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {issue.stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </Container>
        </section>

        {/* Contributors */}
        <section className="py-12 border-t border-[#E8956A]/20" aria-label="Contributors">
          <Container>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-6">Contributors</h2>
            <div className="flex flex-wrap gap-6">
              {AUTHORS.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  >
                    {author.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-[#3C2415] group-hover:text-[#E8956A] transition-colors text-sm">
                      {author.name}
                    </p>
                    <p className="text-xs text-[#6B4D3A]">{author.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Digital Edition / Flipbook */}
        <section className="py-12 border-t border-[#E8956A]/20" aria-label="Digital edition">
          <Container>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-2">
              Read the Full Issue
            </h2>
            <p className="text-[#6B4D3A] mb-6">
              Experience the complete {issue.season} {issue.year} issue in our digital reader.
            </p>

            <div className="rounded-2xl border-2 border-dashed border-[#E8956A]/30 bg-white overflow-hidden">
              {/* Flipbook toolbar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b border-[#E8956A]/15"
                style={{ backgroundColor: '#FDF8F4' }}
              >
                <span className="text-sm font-semibold text-[#3C2415]">
                  {issue.title} — Digital Edition
                </span>
                <button
                  aria-label="Toggle fullscreen"
                  className="flex items-center gap-1.5 text-xs text-[#6B4D3A] hover:text-[#E8956A] transition-colors px-3 py-1.5 border border-[#E8956A]/30 rounded-full"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round" />
                  </svg>
                  Fullscreen
                </button>
              </div>

              {/* Placeholder area */}
              <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: accentColor + '15' }}
                  aria-hidden="true"
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: accentColor }} aria-hidden="true">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#3C2415] mb-2">
                  Digital Edition Coming Soon
                </h3>
                <p className="text-[#6B4D3A] text-sm max-w-sm">
                  The interactive flipbook edition of this issue will be available here. For now, explore the individual stories above.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Browse more issues */}
        {otherIssues.length > 0 && (
          <section className="py-12 border-t border-[#E8956A]/20" aria-label="More issues">
            <Container>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-[#3C2415]">More Issues</h2>
                <Link
                  href="/magazine"
                  className="text-sm text-[#E8956A] hover:underline font-medium"
                >
                  Browse archive →
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {otherIssues.slice(0, 3).map((other) => {
                  const otherAccent = SEASON_COLORS[other.season] || '#E8956A';
                  return (
                    <Link
                      key={other.id}
                      href={`/magazine/${other.slug}`}
                      className="group rounded-2xl bg-white border border-[#E8956A]/10 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div
                        className="aspect-[3/4] flex items-center justify-center"
                        style={{ backgroundColor: otherAccent + '15' }}
                      >
                        <div className="text-center p-4">
                          <div className="text-5xl mb-2" aria-hidden="true">👑</div>
                          <p className="font-playfair text-sm font-bold text-[#3C2415]">
                            {other.season} {other.year}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-[#3C2415] text-sm group-hover:text-[#E8956A] transition-colors">
                          {other.title}
                        </p>
                        <p className="text-xs text-[#6B4D3A] mt-1">{other.stories.length} stories</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        <NewsletterSignup />
      </div>
    </>
  );
}
