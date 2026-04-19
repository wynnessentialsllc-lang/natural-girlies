'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from '@/lib/constants';
import { useSearch } from './ClientProviders';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSearch } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-warm-sm)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Natural Girlies Magazine — Home"
              className="font-playfair text-xl md:text-2xl font-bold text-espresso hover:text-coral transition-colors shrink-0"
            >
              Natural Girlies
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-warm-brown hover:text-coral hover:bg-coral/5 rounded-[var(--radius-md)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                aria-label="Search"
                onClick={openSearch}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-[var(--radius-md)] text-warm-brown hover:text-coral hover:bg-coral/5 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13 13L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Subscribe */}
              <Link
                href="/subscribe"
                className="hidden sm:flex items-center px-4 py-2 text-sm font-medium bg-coral text-white rounded-[var(--radius-md)] hover:bg-melon transition-colors shadow-[var(--shadow-warm-sm)]"
              >
                Subscribe
              </Link>

              {/* Hamburger */}
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] text-espresso hover:bg-border/50 transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M3 5.5H19M3 11H19M3 16.5H19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
