import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Comment Policy',
  description: 'Natural Girlies Magazine Comment Policy — how we moderate community conversation.',
  robots: { index: false },
};

const LAST_UPDATED = 'April 1, 2026';

export default function CommentPolicyPage() {
  return (
    <div className="min-h-screen py-14 md:py-20">
      <Container narrow>
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Comment Policy' }]} />
        </div>

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">Community</p>
          <h1 className="font-playfair text-4xl font-bold text-espresso mb-3">Comment Policy</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          <p className="mt-3 text-warm-brown leading-relaxed">
            The Natural Girlies community is one of the best things about this magazine. We take
            the tone of conversation seriously. These guidelines exist to protect the quality,
            warmth, and intellectual honesty of our community.
          </p>
        </header>

        <div className="prose-editorial flex flex-col gap-8">
          <section id="our-values" aria-labelledby="values-heading">
            <h2 id="values-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              What We Believe About Community
            </h2>
            <p>
              Our comment sections are an extension of the magazine. We expect the same thoughtfulness,
              respect, and cultural awareness that you find in our editorial. Disagreement is welcome.
              Disrespect is not. This community is explicitly for and about Black women and natural
              hair — we will not allow that space to be undermined.
            </p>
          </section>

          <section id="allowed" aria-labelledby="allowed-heading">
            <h2 id="allowed-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              What's Welcome
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-warm-brown">
              <li>Thoughtful disagreement with our editorial positions — backed by evidence or experience</li>
              <li>Personal stories and hair journey sharing</li>
              <li>Questions about products, ingredients, or techniques</li>
              <li>Constructive feedback on our tools or content</li>
              <li>Encouraging and uplifting other community members</li>
            </ul>
          </section>

          <section id="not-allowed" aria-labelledby="not-allowed-heading">
            <h2 id="not-allowed-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              What Will Be Removed
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-warm-brown">
              <li>Racist, sexist, homophobic, transphobic, or otherwise discriminatory language</li>
              <li>Personal attacks on community members, writers, or editors</li>
              <li>Spam or promotional content without permission</li>
              <li>Medical misinformation or unsupported health claims</li>
              <li>Hair shaming or policing of anyone's hair choices</li>
              <li>Trolling or bad-faith arguments</li>
              <li>Sharing others' personal information</li>
            </ul>
          </section>

          <section id="moderation" aria-labelledby="moderation-heading">
            <h2 id="moderation-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              How Moderation Works
            </h2>
            <p>
              Comments are reviewed by our moderation team. We reserve the right to edit, remove, or
              not publish any comment that violates these guidelines. Repeated violations may result
              in being blocked from commenting. We aim to make moderation decisions within 24 hours.
            </p>
            <p className="mt-3">
              If your comment was removed and you believe it was in error, contact us at{' '}
              <a href="mailto:community@naturalgirlies.com" className="text-coral hover:underline">
                community@naturalgirlies.com
              </a>.
            </p>
          </section>

          <section id="girlies-speak" aria-labelledby="girlies-speak-heading">
            <h2 id="girlies-speak-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              The Girlies Speak Submissions
            </h2>
            <p>
              Submissions to The Girlies Speak series are subject to this policy and additional
              editorial review. By submitting, you grant Natural Girlies Magazine the right to
              publish your submission with attribution. We will never publish submissions without
              your name as provided — we respect the connection between words and identity.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
