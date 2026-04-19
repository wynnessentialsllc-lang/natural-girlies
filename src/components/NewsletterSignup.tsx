'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const STORAGE_KEY = 'ng-newsletter-subscribed';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already'>('idle');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      setStatus('already');
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem(STORAGE_KEY, '1');
    setStatus('success');
  }

  return (
    <section
      className="relative overflow-hidden py-16 px-6"
      style={{
        background: 'linear-gradient(135deg, #3C2415 0%, #6B4D3A 50%, #E8956A 100%)',
      }}
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative circles */}
      <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: '#E8956A' }} />
      <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10" style={{ backgroundColor: '#F2C4CE' }} />

      <div className="relative max-w-2xl mx-auto text-center">
        <span className="inline-block text-4xl mb-4" aria-hidden="true">💌</span>

        <h2
          id="newsletter-heading"
          className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          The Girlies Newsletter
        </h2>

        <p className="text-white/80 text-lg mb-6">
          Weekly wisdom on natural hair, skin, culture, and community — delivered to your inbox every Sunday.
        </p>

        <ul className="flex flex-col sm:flex-row justify-center gap-3 mb-8 text-sm text-white/70" aria-label="Newsletter benefits">
          {[
            '✦ Exclusive expert roundups',
            '✦ Early access to new features',
            '✦ Member-only content',
          ].map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              key="success"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/15 backdrop-blur rounded-2xl p-6 text-white"
              role="status"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-xl font-semibold mb-1">You&apos;re in!</p>
              <p className="text-white/80 text-sm">
                Welcome to the community. Check your inbox for a confirmation.
              </p>
            </motion.div>
          )}

          {status === 'already' && (
            <motion.div
              key="already"
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white"
              role="status"
            >
              <p className="text-lg font-semibold">You&apos;re already subscribed 💕</p>
              <p className="text-white/70 text-sm mt-1">Thanks for being part of the Natural Girlies community.</p>
            </motion.div>
          )}

          {(status === 'idle' || status === 'loading' || status === 'error') && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              aria-label="Newsletter subscription form"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  aria-required="true"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className="w-full px-5 py-3.5 rounded-full text-[#3C2415] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#6B4D3A]/60"
                />
                {status === 'error' && (
                  <p id="newsletter-error" role="alert" className="text-xs text-red-300 mt-1.5 text-left pl-4">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 bg-white text-[#E8956A] font-semibold rounded-full text-sm hover:bg-[#FDF8F4] transition-colors disabled:opacity-70 shrink-0"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing…
                  </span>
                ) : (
                  'Subscribe Free'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-4 text-xs text-white/50">
          No spam, ever. Unsubscribe anytime.{' '}
          <Link href="/privacy" className="underline hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
}
