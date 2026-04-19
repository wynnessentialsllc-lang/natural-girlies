import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Natural Girlies Magazine Terms of Use.',
  robots: { index: false },
};

const LAST_UPDATED = 'April 1, 2026';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-14 md:py-20">
      <Container narrow>
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-lg)] p-4 mb-8 text-sm text-amber-800">
          <strong>Note:</strong> This is a template terms of use. Legal counsel should review and
          customize before publishing.
        </div>

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">Legal</p>
          <h1 className="font-playfair text-4xl font-bold text-espresso mb-3">Terms of Use</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          <p className="mt-3 text-warm-brown leading-relaxed">
            By accessing Natural Girlies Magazine, you agree to these terms. Please read them carefully.
          </p>
        </header>

        <div className="prose-editorial flex flex-col gap-8">
          {[
            {
              id: 'acceptance', n: 1, title: 'Acceptance of Terms',
              body: 'By accessing or using naturalgirlies.com and any associated tools or services, you agree to be bound by these Terms of Use. If you do not agree, please do not use our platform.',
            },
            {
              id: 'content', n: 2, title: 'Content and Intellectual Property',
              body: 'All editorial content, images, graphics, and design elements on Natural Girlies Magazine are owned by or licensed to Natural Girlies Magazine. You may not reproduce, distribute, or create derivative works from our content without written permission. You may share links to our content with appropriate attribution.',
            },
            {
              id: 'user-conduct', n: 3, title: 'User Conduct',
              body: 'You agree not to use our platform for any unlawful purpose, to harass or harm others, to submit false information, to interfere with the platform\'s operation, or to scrape or systematically collect our content.',
            },
            {
              id: 'tools', n: 4, title: 'Tools and Educational Content',
              body: 'The Hair Wellness Lab, Product Analyzer, and Crown Analysis are educational tools and do not constitute medical or professional advice. Always consult a qualified healthcare provider or trichologist before making significant changes to your hair care routine, particularly regarding medical conditions.',
            },
            {
              id: 'disclaimer', n: 5, title: 'Disclaimer of Warranties',
              body: 'Natural Girlies Magazine is provided "as is" without warranties of any kind. We do not guarantee that our platform will be error-free, uninterrupted, or that any information provided is medically accurate for your specific situation.',
            },
            {
              id: 'liability', n: 6, title: 'Limitation of Liability',
              body: 'To the fullest extent permitted by law, Natural Girlies Magazine shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.',
            },
            {
              id: 'links', n: 7, title: 'Third-Party Links',
              body: 'Our platform may contain links to third-party websites. We are not responsible for the content or practices of those sites. The inclusion of a link does not constitute an endorsement.',
            },
            {
              id: 'changes', n: 8, title: 'Changes to Terms',
              body: 'We may update these Terms of Use from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms.',
            },
            {
              id: 'contact', n: 9, title: 'Contact',
              body: 'Questions about these terms? Email us at legal@naturalgirlies.com.',
            },
          ].map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`} className="font-playfair text-2xl font-bold text-espresso mb-3">
                {section.n}. {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
