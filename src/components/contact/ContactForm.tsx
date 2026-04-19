'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SOCIAL_LINKS } from '@/lib/constants';

const SUBJECTS = [
  'General Inquiry',
  'Press & Media',
  'Partnerships & Collaborations',
  'Story Submissions',
  'Community / Girlies Speak',
  'Technical Support',
  'Other',
];

const FAQ = [
  {
    q: 'Can I submit a piece to Natural Girlies?',
    a: "Yes! We accept pitches and submissions from writers, researchers, and community members. Use the contact form with subject \"Story Submissions\" and include your pitch, a brief bio, and any relevant clips.",
  },
  {
    q: 'How do I get featured in The Girlies Speak?',
    a: "The Girlies Speak is community-sourced. You can submit a quote, reflection, or mini-interview via the contact form or DM us on Instagram. We feature submissions monthly.",
  },
  {
    q: 'Are the ecosystem tools free?',
    a: 'Yes — the Hair Wellness Lab, Product Analyzer, and Crown Analysis are all free. We believe every natural hair woman deserves access to this kind of information regardless of budget.',
  },
  {
    q: 'How can my brand partner with Natural Girlies?',
    a: 'We work with brands whose values align with ours: transparency, science-backed claims, and genuine commitment to the natural hair community. Use the contact form with subject "Partnerships" and include your brand name and a brief overview.',
  },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};

    if (!data.get('name')) newErrors.name = 'Your name is required.';
    if (!data.get('email')) newErrors.email = 'A valid email is required.';
    if (!data.get('message')) newErrors.message = 'Please include a message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Form */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-espresso mb-6">
          Send Us a Message
        </h2>

        {submitted ? (
          <div className="p-8 bg-gradient-to-br from-soft-pink/20 to-lavender/15 rounded-[var(--radius-xl)] text-center">
            <span className="text-4xl block mb-4" aria-hidden="true">💌</span>
            <h3 className="font-playfair text-xl font-bold text-espresso mb-2">
              Message received.
            </h3>
            <p className="text-warm-brown">
              We'll get back to you with the care your message deserves. Thank you for reaching out.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-label="Contact form">
            <Input
              name="name"
              label="Full Name"
              placeholder="Your name"
              required
              autoComplete="name"
              error={errors.name}
            />
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              required
              autoComplete="email"
              error={errors.email}
            />

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-warm-brown mb-1.5">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 text-sm bg-white border border-border rounded-[var(--radius-md)] text-espresso focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <Textarea
              name="message"
              label="Message"
              placeholder="Tell us what's on your mind…"
              required
              rows={6}
              error={errors.message}
            />

            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        )}
      </div>

      {/* Info + FAQ */}
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-espresso mb-6">Connect With Us</h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: '✉️', label: 'General', email: 'hello@naturalgirlies.com' },
              { icon: '📰', label: 'Press & Media', email: 'press@naturalgirlies.com' },
              { icon: '🤝', label: 'Partnerships', email: 'partners@naturalgirlies.com' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-border">
                <span className="text-xl mt-0.5" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-espresso">{item.label}</p>
                  <p className="text-sm text-warm-brown">{item.email}</p>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <p className="text-sm font-semibold text-espresso mb-3">Social</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.icon}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-warm-brown bg-white border border-border rounded-full hover:border-coral hover:text-coral transition-colors"
                    aria-label={`Follow on ${link.label}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-playfair text-xl font-bold text-espresso mb-5">Frequently Asked</h2>
          <dl className="flex flex-col gap-5">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <dt className="text-sm font-bold text-espresso mb-1.5">{item.q}</dt>
                <dd className="text-sm text-warm-brown leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
