import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StoryCard } from '@/components/cards/StoryCard';
import { IssueCard } from '@/components/cards/IssueCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { ISSUES, AUTHORS } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: 'Magazine',
  description:
    'Natural Girlies Magazine — the editorial platform where hair wellness meets storytelling. Browse current and past issues.',
  openGraph: {
    title: 'Magazine | Natural Girlies',
    description: 'Browse current and past issues of Natural Girlies Magazine.',
  },
};

export default function MagazinePage() {
  const currentIssue = ISSUES.find((i) => i.current);
  const pastIssues = ISSUES.filter((i) => !i.current);

  return (
    <div className="min-h-screen">
      {/* Current Issue Hero */}
      {currentIssue && (
        <section
          aria-labelledby="current-issue-title"
          className="relative bg-gradient-to-br from-espresso to-warm-brown overflow-hidden py-20 md:py-28"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,149,106,0.2),transparent_60%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,193,236,0.1),transparent_60%)]" />

          <Container className="relative z-10">
            <div className="mb-6">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Magazine' }]} />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Cover */}
              <div className="relative max-w-xs mx-auto md:mx-0">
                <div aria-hidden="true" className="absolute -inset-6 rounded-[var(--radius-xl)] bg-coral/10 blur-2xl" />
                <div className="relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden bg-gradient-to-b from-cream/10 to-cream/5 border border-cream/20 shadow-[var(--shadow-warm-xl)] flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-xs tracking-[0.2em] uppercase text-cream/50 mb-3">
                      {currentIssue.season} {currentIssue.year}
                    </p>
                    <p className="font-playfair text-4xl font-bold text-cream leading-tight mb-1">
                      Natural<br />Girlies
                    </p>
                    <p className="text-sm text-cream/60 mb-4">Magazine</p>
                    <div className="w-8 h-px bg-coral/50 mx-auto" aria-hidden="true" />
                    <p className="text-xs text-cream/40 mt-3">Vol. {currentIssue.volume}</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-coral text-white text-xs font-bold rounded-full">
                  Current
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">
                    Current Issue
                  </p>
                  <h1
                    id="current-issue-title"
                    className="font-playfair text-4xl md:text-5xl font-bold text-cream leading-tight mb-1"
                  >
                    {currentIssue.title}
                  </h1>
                </div>

                <div className="border-l-2 border-coral/50 pl-5">
                  <p className="text-sm font-medium text-cream/50 uppercase tracking-wider mb-2">
                    From the Editor
                  </p>
                  <p className="font-playfair text-lg text-cream/80 leading-relaxed italic">
                    "{currentIssue.editorLetter}"
                  </p>
                  <p className="text-sm text-cream/60 mt-3">— Imani Rhodes, Editor-in-Chief</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href={`/magazine/${currentIssue.slug}`} variant="primary" size="lg">
                    Read This Issue
                  </Button>
                  <Button href="#archive" variant="ghost" size="lg" className="text-cream border-cream/30 hover:border-cream/60">
                    Browse Archive
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Inside This Issue */}
      {currentIssue && (
        <section aria-labelledby="inside-issue-heading" className="py-14 md:py-20 bg-white">
          <Container>
            <SectionHeader
              title="Inside This Issue"
              subtitle={`Selected stories from ${currentIssue.title}.`}
              viewAllHref={`/magazine/${currentIssue.slug}`}
              viewAllLabel="Read Full Issue"
              eyebrow="Spring 2026"
            />
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentIssue.stories.slice(0, 4).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contributors */}
      <section aria-labelledby="contributors-heading" className="py-12 md:py-16 bg-cream border-y border-border">
        <Container>
          <SectionHeader
            title="Contributors"
            subtitle="The voices behind this issue."
            eyebrow="Spring 2026"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            {AUTHORS.map((author) => (
              <div key={author.id} className="flex items-center gap-3 bg-white px-4 py-3 rounded-[var(--radius-xl)] border border-border">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/30 to-rose/20 flex items-center justify-center text-sm font-bold text-espresso shrink-0"
                  aria-hidden="true"
                >
                  {author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">{author.name}</p>
                  <p className="text-xs text-muted">{author.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Archive */}
      <section id="archive" aria-labelledby="archive-heading" className="py-14 md:py-20">
        <Container>
          <SectionHeader
            title="The Archive"
            subtitle="Every issue, on record."
            eyebrow="Past Issues"
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </Container>
      </section>

      {/* Subscribe CTA */}
      <section aria-label="Subscribe" className="py-14 bg-gradient-to-br from-tangerine/20 to-soft-pink/15">
        <Container narrow>
          <div className="text-center flex flex-col items-center gap-5">
            <h2 className="font-playfair text-3xl font-bold text-espresso">
              Never Miss an Issue
            </h2>
            <p className="text-warm-brown max-w-md">
              Subscribe and get each new issue delivered directly to your inbox alongside weekly
              crown intelligence.
            </p>
            <Button href="/subscribe" variant="primary" size="lg">
              Subscribe to the Magazine
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
