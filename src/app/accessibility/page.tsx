import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Natural Girlies Magazine Accessibility Statement — our commitment to inclusive design.',
  robots: { index: false },
};

const LAST_UPDATED = 'April 1, 2026';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen py-14 md:py-20">
      <Container narrow>
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Accessibility Statement' }]} />
        </div>

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-2">Legal</p>
          <h1 className="font-playfair text-4xl font-bold text-espresso mb-3">Accessibility Statement</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          <p className="mt-3 text-warm-brown leading-relaxed">
            Natural Girlies Magazine is committed to ensuring our platform is accessible to all users,
            including those with disabilities. We are continuously working to improve accessibility
            in line with WCAG 2.2 Level AA guidelines.
          </p>
        </header>

        <div className="prose-editorial flex flex-col gap-8">
          <section id="commitment" aria-labelledby="commitment-heading">
            <h2 id="commitment-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              Our Commitment
            </h2>
            <p>
              We believe every woman deserves access to information about her hair and beauty. That
              commitment to accessibility extends to our digital platform. We design with the full
              spectrum of users in mind — whether you use a screen reader, keyboard navigation,
              or rely on other assistive technologies.
            </p>
          </section>

          <section id="standards" aria-labelledby="standards-heading">
            <h2 id="standards-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              Standards and Compliance
            </h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA. Our implementation includes:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5 text-warm-brown">
              <li><strong>Keyboard navigation:</strong> All interactive elements are navigable and operable by keyboard.</li>
              <li><strong>Screen reader support:</strong> We use semantic HTML, ARIA labels, and descriptive alt text throughout the site.</li>
              <li><strong>Color contrast:</strong> Text meets or exceeds WCAG AA contrast ratios against background colors.</li>
              <li><strong>Reduced motion:</strong> Animations respect the prefers-reduced-motion media query.</li>
              <li><strong>Focus indicators:</strong> Visible focus rings are present on all interactive elements.</li>
              <li><strong>Skip links:</strong> A "Skip to main content" link is available at the top of every page.</li>
              <li><strong>Responsive design:</strong> Content is accessible on any device and screen size.</li>
              <li><strong>Form accessibility:</strong> All forms include proper labels, error messages, and instructions.</li>
            </ul>
          </section>

          <section id="known-issues" aria-labelledby="issues-heading">
            <h2 id="issues-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              Known Limitations
            </h2>
            <p>
              While we strive for full accessibility, some third-party content or tools may have
              limitations we are working to address. If you encounter an accessibility barrier,
              please contact us and we will work to resolve it promptly.
            </p>
          </section>

          <section id="feedback" aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              Feedback and Contact
            </h2>
            <p>
              If you experience any difficulty accessing our content or have suggestions for
              improvement, please contact us at{' '}
              <a href="mailto:accessibility@naturalgirlies.com" className="text-coral hover:underline">
                accessibility@naturalgirlies.com
              </a>.
              We take all accessibility feedback seriously and will respond within 5 business days.
            </p>
          </section>

          <section id="tools" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="font-playfair text-2xl font-bold text-espresso mb-3">
              Browser and Assistive Technology Compatibility
            </h2>
            <p>
              Natural Girlies Magazine is designed to be compatible with modern browsers and
              assistive technologies including NVDA, JAWS, VoiceOver, and TalkBack. We recommend
              using the latest version of your preferred browser for the best experience.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
