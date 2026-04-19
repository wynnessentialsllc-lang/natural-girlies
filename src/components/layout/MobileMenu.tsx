'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, CATEGORIES, SIGNATURE_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === 'Tab' && isOpen && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-espresso/50 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-cream z-50 lg:hidden overflow-y-auto shadow-[var(--shadow-warm-xl)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link
                href="/"
                className="font-playfair text-xl font-bold text-espresso"
                onClick={onClose}
              >
                Natural Girlies
              </Link>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] text-espresso hover:bg-border/50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="px-4 py-3 text-base font-medium text-espresso hover:text-coral hover:bg-coral/5 rounded-[var(--radius-md)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-4 text-xs font-semibold tracking-[0.15em] uppercase text-muted mb-2">
                  Categories
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-warm-brown hover:text-coral hover:bg-coral/5 rounded-[var(--radius-md)] transition-colors"
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-4 text-xs font-semibold tracking-[0.15em] uppercase text-muted mb-2">
                  Signature Sections
                </p>
                {SIGNATURE_SECTIONS.map((section) => (
                  <Link
                    key={section.slug}
                    href={section.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-warm-brown hover:text-coral hover:bg-coral/5 rounded-[var(--radius-md)] transition-colors"
                  >
                    <span aria-hidden="true">{section.icon}</span>
                    {section.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 pb-8 mt-4 border-t border-border pt-6">
              <Link
                href="/subscribe"
                onClick={onClose}
                className="w-full flex items-center justify-center py-3 px-6 bg-coral text-white font-medium rounded-[var(--radius-md)] hover:bg-melon transition-colors mb-4"
              >
                Subscribe to the Magazine
              </Link>
              <div className="flex gap-4 justify-center">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.icon}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted hover:text-coral transition-colors text-sm"
                  >
                    {link.label.split(' ')[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
