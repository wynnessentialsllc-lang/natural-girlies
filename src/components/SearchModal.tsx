'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { STORIES, BLOG_POSTS } from '@/lib/sample-data';

interface SearchResult {
  id: string;
  type: 'story' | 'blog';
  title: string;
  excerpt: string;
  category: string;
  slug: string;
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  const storyResults: SearchResult[] = STORIES
    .filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.category.name.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.name.toLowerCase().includes(q))
    )
    .map((s) => ({
      id: s.id,
      type: 'story' as const,
      title: s.title,
      excerpt: s.excerpt,
      category: s.category.name,
      slug: s.slug,
    }));

  const blogResults: SearchResult[] = BLOG_POSTS
    .filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.name.toLowerCase().includes(q)
    )
    .map((b) => ({
      id: b.id,
      type: 'blog' as const,
      title: b.title,
      excerpt: b.excerpt,
      category: b.category.name,
      slug: b.slug,
    }));

  return [...storyResults, ...blogResults].slice(0, 8);
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(search(query));
    setActiveIndex(-1);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      }
      if (e.key === 'Enter' && activeIndex >= 0) {
        const result = results[activeIndex];
        if (result) {
          window.location.href = `/${result.type === 'story' ? 'stories' : 'blog'}/${result.slug}`;
          onClose();
        }
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, results, activeIndex, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    function onTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, input, a, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', onTab);
    return () => document.removeEventListener('keydown', onTab);
  }, [isOpen]);

  const handleResultClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const popularSearches = ['protective styles', 'scalp health', 'moisturizing routine', 'locs history'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search Natural Girlies"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="max-w-2xl mx-auto px-4 py-4">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-[#E8956A]/20 pb-4">
                <svg className="w-5 h-5 text-[#6B4D3A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories, articles, topics…"
                  className="flex-1 text-lg text-[#3C2415] placeholder:text-[#6B4D3A]/50 focus:outline-none bg-transparent"
                  aria-label="Search query"
                  aria-expanded={results.length > 0}
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="text-[#6B4D3A] hover:text-[#3C2415]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="px-3 py-1 text-sm text-[#6B4D3A] border border-[#6B4D3A]/30 rounded-full hover:border-[#3C2415] hover:text-[#3C2415] transition-colors"
                >
                  Esc
                </button>
              </div>

              {/* Results */}
              <div id="search-results" role="listbox" aria-label="Search results">
                {query && results.length === 0 && (
                  <div className="py-8 text-center text-[#6B4D3A]">
                    <p className="text-lg">No results for &ldquo;{query}&rdquo;</p>
                    <p className="text-sm mt-1">Try different keywords or browse our categories.</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((result, idx) => {
                      const href = `/${result.type === 'story' ? 'stories' : 'blog'}/${result.slug}`;
                      return (
                        <Link
                          key={result.id}
                          id={`result-${idx}`}
                          href={href}
                          onClick={handleResultClick}
                          role="option"
                          aria-selected={idx === activeIndex}
                          className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors ${
                            idx === activeIndex ? 'bg-[#E8956A]/10' : 'hover:bg-[#FDF8F4]'
                          }`}
                        >
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                            style={{
                              backgroundColor: result.type === 'story' ? '#E8956A20' : '#D4C1EC40',
                              color: result.type === 'story' ? '#E8956A' : '#9B7BC4',
                            }}
                          >
                            {result.type === 'story' ? 'Story' : 'Blog'}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#3C2415]">{result.title}</p>
                            <p className="text-xs text-[#6B4D3A] mt-0.5 line-clamp-1">{result.excerpt}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Popular searches */}
                {!query && (
                  <div className="py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B4D3A] mb-3">
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-3 py-1.5 text-sm rounded-full border border-[#E8956A]/30 text-[#6B4D3A] hover:border-[#E8956A] hover:text-[#E8956A] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-center">
                      <Link
                        href="/search"
                        onClick={handleResultClick}
                        className="text-sm text-[#E8956A] hover:underline"
                      >
                        Browse all content →
                      </Link>
                    </p>
                  </div>
                )}

                {/* Full search link */}
                {query && results.length > 0 && (
                  <div className="py-2 border-t border-[#E8956A]/10 text-center">
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={handleResultClick}
                      className="text-sm text-[#E8956A] hover:underline"
                    >
                      See all results for &ldquo;{query}&rdquo; →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
