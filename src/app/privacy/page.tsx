import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Natural Girlies Magazine Privacy Policy — how we collect, use, and protect your information.',
  robots: { index: false },
};

const LAST_UPDATED = 'April 1, 2026';

const TOC = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-information', label: 'How We Use Your Information' },
  { id: 'information-sharing', label: 'Information Sharing' },
  { id: 'cookies', label: 'Cookies and Tracking' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-14 md:py-20">
      <Container narrow>
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-lg)] p-4 mb-8 text-sm text-amber-800">
          <strong>Note:</strong> This is a template privacy policy. Legal counsel should review
          and customize it before publishing to ensure compliance with applicable laws (GDPR, CCPA, etc.).
        </div>

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">Legal</p>
          <h1 className="font-playfair text-4xl font-bold text-espresso mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          <p className="mt-3 text-warm-brown leading-relaxed">
            At Natural Girlies Magazine, your privacy matters to us — as much as your crown does.
            This policy explains what information we collect, how we use it, and the choices you have.
          </p>
        </header>

        {/* Table of Contents */}
        <nav aria-label="Table of contents" className="mb-10 p-6 bg-cream rounded-[var(--radius-lg)] border border-border">
          <h2 className="text-sm font-bold text-espresso mb-3">Contents</h2>
          <ol className="flex flex-col gap-1.5">
            {TOC.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-warm-brown hover:text-coral transition-colors">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-editorial flex flex-col gap-8">
          <section id="information-we-collect" aria-labelledby="info-collect-heading">
            <h2 id="info-collect-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              1. Information We Collect
            </h2>
            <p>We collect information you provide directly to us, such as when you subscribe to our newsletter, contact us, or use our tools. This may include:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1 text-warm-brown">
              <li>Name and email address (newsletter subscriptions)</li>
              <li>Contact form submissions</li>
              <li>Hair wellness data you voluntarily input into our tools (Hair Wellness Lab, Product Analyzer, Crown Analysis)</li>
              <li>Usage data and analytics (pages visited, time on site)</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section id="how-we-use-information" aria-labelledby="how-use-heading">
            <h2 id="how-use-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1 text-warm-brown">
              <li>Deliver the newsletter and editorial content you subscribed to</li>
              <li>Operate and improve our tools and editorial platform</li>
              <li>Respond to your messages and inquiries</li>
              <li>Analyze how our content is used to improve the reader experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section id="information-sharing" aria-labelledby="sharing-heading">
            <h2 id="sharing-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              3. Information Sharing
            </h2>
            <p>
              We do not sell your personal information. We do not share your information with third parties
              for their marketing purposes. We may share information with service providers who assist in
              operating our platform (hosting, email delivery, analytics) under strict data processing
              agreements.
            </p>
          </section>

          <section id="cookies" aria-labelledby="cookies-heading">
            <h2 id="cookies-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              4. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar technologies to understand how readers use our site and to
              improve your experience. You can control cookies through your browser settings. We use
              privacy-respecting analytics and do not use advertising trackers.
            </p>
          </section>

          <section id="your-rights" aria-labelledby="rights-heading">
            <h2 id="rights-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              5. Your Rights
            </h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1 text-warm-brown">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications at any time (every email includes an unsubscribe link)</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
          </section>

          <section id="data-security" aria-labelledby="security-heading">
            <h2 id="security-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              6. Data Security
            </h2>
            <p>
              We take reasonable measures to protect your information. However, no system is completely
              secure. We encourage you to use a unique, strong password and to contact us immediately
              if you suspect any unauthorized access.
            </p>
          </section>

          <section id="children" aria-labelledby="children-heading">
            <h2 id="children-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              {"7. Children's Privacy"}
            </h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal information,
              please contact us so we can delete it.
            </p>
          </section>

          <section id="changes" aria-labelledby="changes-heading">
            <h2 id="changes-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify subscribers of
              material changes via email. The "Last updated" date at the top of this page reflects the
              most recent revision.
            </p>
          </section>

          <section id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              9. Contact Us
            </h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a href="mailto:privacy@naturalgirlies.com" className="text-coral hover:underline">
                privacy@naturalgirlies.com
              </a>{' '}
              or use our{' '}
              <a href="/contact" className="text-coral hover:underline">
                contact form
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
