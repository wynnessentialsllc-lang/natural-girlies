'use client';

import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

export function ReadingMode() {
  const [active, setActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggle = useCallback(() => {
    setActive((v) => !v);
  }, []);

  // Keyboard shortcut: R key (not in input/textarea)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && active) {
        setActive(false);
        return;
      }
      if (
        e.key === 'r' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        toggle();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, toggle]);

  // Apply reading mode classes to document
  useEffect(() => {
    if (active) {
      document.documentElement.classList.add('reading-mode');
    } else {
      document.documentElement.classList.remove('reading-mode');
    }
    return () => {
      document.documentElement.classList.remove('reading-mode');
    };
  }, [active]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggle}
        aria-pressed={active}
        aria-label={active ? 'Exit reading mode (Escape)' : 'Enter reading mode (R)'}
        title={active ? 'Exit reading mode (Esc)' : 'Reading mode (R)'}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
          active
            ? 'bg-[#3C2415] text-white border-[#3C2415]'
            : 'text-[#6B4D3A] border-[#6B4D3A]/30 hover:border-[#3C2415] hover:text-[#3C2415]'
        }`}
        style={{ transition: shouldReduceMotion ? 'none' : undefined }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {active ? 'Exit Reading Mode' : 'Reading Mode'}
      </button>

      {/* Inline style for reading mode */}
      <style>{`
        .reading-mode header,
        .reading-mode footer,
        .reading-mode [data-sidebar],
        .reading-mode [data-reading-mode-hide] {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .reading-mode [data-article-body] {
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.125rem;
          line-height: 1.85;
        }
        .reading-mode body {
          background: #FFFEF9;
        }
        @media (prefers-reduced-motion: reduce) {
          .reading-mode header,
          .reading-mode footer,
          .reading-mode [data-sidebar],
          .reading-mode [data-reading-mode-hide] {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
