'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const SESSION_KEY = 'ng-newsletter-popup-dismissed';
const SUBSCRIBE_KEY = 'ng-newsletter-subscribed';

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const shouldReduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  }, []);

  useEffect(() => {
    // Don't show if already subscribed or dismissed this session
    if (
      sessionStorage.getItem(SESSION_KEY) ||
      localStorage.getItem(SUBSCRIBE_KEY)
    ) return;

    let triggered = false;

    // Trigger after 30 seconds
    const timer = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setVisible(true);
      }
    }, 30000);

    // Trigger at 50% scroll
    function onScroll() {
      if (triggered) return;
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.5) {
        triggered = true;
        setVisible(true);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Focus trap
  useEffect(() => {
    if (!visible) return;
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, a, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, dismiss]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem(SUBSCRIBE_KEY, '1');
    setStatus('success');
    setTimeout(dismiss, 3000);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-heading"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md mx-4"
            style={{ maxWidth: 'min(calc(100vw - 2rem), 28rem)' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #3C2415, #6B4D3A)' }}
            >
              {/* Close button */}
              <button
                ref={closeRef}
                onClick={dismiss}
                aria-label="Close newsletter popup"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>

              <div className="p-6">
                <span className="text-3xl" aria-hidden="true">💌</span>
                <h2 id="popup-heading" className="font-playfair text-xl font-bold text-white mt-2 mb-1">
                  Stay in the loop
                </h2>
                <p className="text-white/75 text-sm mb-4">
                  Weekly hair, skin & culture wisdom — straight to your inbox.
                </p>

                {status === 'success' ? (
                  <div className="text-center text-white py-2" role="status">
                    <div className="text-3xl mb-1">🎉</div>
                    <p className="font-semibold">You&apos;re subscribed!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} aria-label="Quick newsletter signup">
                    <label htmlFor="popup-email" className="sr-only">Email address</label>
                    <input
                      id="popup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      aria-required="true"
                      aria-invalid={status === 'error'}
                      className="w-full px-4 py-2.5 rounded-full text-[#3C2415] text-sm focus:outline-none focus:ring-2 focus:ring-white/50 mb-2"
                    />
                    {status === 'error' && (
                      <p role="alert" className="text-xs text-red-300 mb-2 pl-1">
                        Please enter a valid email address.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-2.5 bg-[#E8956A] text-white font-semibold rounded-full text-sm hover:bg-[#d4835a] transition-colors disabled:opacity-70"
                    >
                      {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
                    </button>
                  </form>
                )}

                <p className="text-xs text-white/40 mt-3">
                  No spam.{' '}
                  <Link href="/privacy" className="underline hover:text-white/60" onClick={dismiss}>
                    Privacy Policy
                  </Link>
                  {' · '}
                  <button onClick={dismiss} className="underline hover:text-white/60">
                    No thanks
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
