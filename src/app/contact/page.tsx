import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Natural Girlies Magazine. Press, partnerships, story submissions, or general questions — we read everything.',
  openGraph: {
    title: 'Contact | Natural Girlies Magazine',
    description: 'Reach out for press, partnerships, submissions, or general inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-cream to-white py-14 md:py-20 border-b border-border">
        <Container>
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-coral mb-3">Contact</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {"Let's Talk."}
            </h1>
            <p className="text-lg text-warm-brown leading-relaxed">
              Press, partnerships, submissions, or just a question — we read every message. We
              {"can't"} always respond immediately, but we respond intentionally.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}
