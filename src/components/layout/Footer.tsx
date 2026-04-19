'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { NAV_ITEMS, SIGNATURE_SECTIONS, LEGAL_LINKS, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
import { NewsletterFormDark } from '@/components/forms/NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-espresso text-cream/80"
    >
      {/* Main footer */}
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="font-playfair text-2xl font-bold text-cream hover:text-tangerine transition-colors"
            >
              Natural Girlies
            </Link>
            <p className="text-sm leading-relaxed text-cream/60">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-sm leading-relaxed text-cream/50 text-xs">
              The first editorial platform where natural beauty meets data, wellness, and cultural storytelling.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Natural Girlies on ${link.label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cream/10 hover:bg-coral/80 text-cream/70 hover:text-white transition-all text-xs font-medium"
                >
                  {link.icon === 'instagram' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {link.icon === 'tiktok' && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z"/>
                    </svg>
                  )}
                  {link.icon === 'pinterest' && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-cream/40 mb-4">
              Explore
            </h3>
            <nav aria-label="Footer explore links">
              <ul className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Signature Sections */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-cream/40 mb-4">
              Signature Series
            </h3>
            <nav aria-label="Signature sections links">
              <ul className="flex flex-col gap-2.5">
                {SIGNATURE_SECTIONS.map((section) => (
                  <li key={section.slug}>
                    <Link
                      href={section.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors flex items-center gap-2"
                    >
                      <span aria-hidden="true">{section.icon}</span>
                      {section.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-cream/40 mb-4">
              Stay in the Know
            </h3>
            <p className="text-sm text-cream/60 leading-relaxed mb-4">
              Weekly crown intelligence, beauty breakdowns, and stories that matter.
            </p>
            <NewsletterFormDark />
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-cream/40 text-center sm:text-left">
              © {currentYear} Natural Girlies Magazine. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-cream/40 hover:text-cream/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
