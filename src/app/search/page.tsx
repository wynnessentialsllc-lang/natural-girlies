'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { STORIES, BLOG_POSTS } from '@/lib/sample-data';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

interface SearchResult {
  id: string;
  type: 'story' | 'blog';
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
}

function runSearch(q: string): { stories: SearchResult[]; blog: SearchResult[] } {
  if (!q.trim()) return { stories: [], blog: [] };
  const query = q.toLowerCase();

  const stories: SearchResult[] = STORIES
    .filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.excerpt.toLowerCase().includes(query) ||
        s.category.name.toLowerCase().includes(query) ||
        s.tags?.some((t) => t.name.toLowerCase().includes(query))
    )
    .map((s) => ({
      id: s.id,
      type: 'story' as const,
      title: s.title,
      excerpt: s.excerpt,
      category: s.category.slug,
      slug: s.slug,
      date: s.publishedAt,
    }));

  const blog: SearchResult[] = BLOG_POSTS
    .filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.excerpt.toLowerCase().includes(query) ||
        b.category.name.toLowerCase().includes(query)
    )
    .map((b) => ({
      id: b.id,
      type: 'blog' as const,
      title: b.title,
      excerpt: b.excerpt,
      category: b.category.slug,
      slug: b.slug,
      date: b.publishedAt,
    }));

  return { stories, blog };
}

const POPULAR = ['protective styles', 'scalp health', 'hyperpigmentation', 'locs', 'moisturizing'];

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState(() => runSearch(initialQ));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setResults(runSearch(query));
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const total = results.stories.length + results.blog.length;
  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF8F4' }}>
      {/* Search header */}
      <div style={{ backgroundColor: '#3C2415' }} className="py-12">
        <Container>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            Search
          </h1>
          <div className="max-w-2xl mx-auto">
            <label htmlFor="main-search" className="sr-only">Search Natural Girlies</label>
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B4D3A]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                id="main-search"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setQuery(''); }}
                placeholder="Search stories, articles, topics…"
                className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl bg-white text-[#3C2415] focus:outline-none focus:ring-2 focus:ring-[#E8956A]/50 placeholder:text-[#6B4D3A]/50"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B4D3A] hover:text-[#3C2415]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        {/* No query state */}
        {!hasQuery && (
          <div>
            <h2 className="text-lg font-semibold text-[#3C2415] mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2 mb-10">
              {POPULAR.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 text-sm rounded-full border border-[#E8956A]/40 text-[#6B4D3A] hover:border-[#E8956A] hover:text-[#E8956A] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results summary */}
        {hasQuery && (
          <div className="mb-6">
            <p className="text-[#6B4D3A]">
              {total === 0
                ? `No results for "${query}"`
                : `${total} result${total !== 1 ? 's' : ''} for "${query}"`}
            </p>
          </div>
        )}

        {/* No results */}
        {hasQuery && total === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-2">
              Nothing found
            </h2>
            <p className="text-[#6B4D3A] mb-6">
              Try different keywords, or browse our categories below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Crown', 'Skin', 'Fashion', 'Beauty'].map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase()}`}
                  className="px-4 py-2 rounded-full border border-[#E8956A] text-[#E8956A] text-sm hover:bg-[#E8956A] hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stories results */}
        {results.stories.length > 0 && (
          <section className="mb-10" aria-label="Story results">
            <h2 className="font-playfair text-xl font-bold text-[#3C2415] mb-4 flex items-center gap-2">
              Stories
              <span className="text-sm font-normal text-[#6B4D3A]">({results.stories.length})</span>
            </h2>
            <div className="space-y-4">
              {results.stories.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </section>
        )}

        {/* Blog results */}
        {results.blog.length > 0 && (
          <section aria-label="Blog post results">
            <h2 className="font-playfair text-xl font-bold text-[#3C2415] mb-4 flex items-center gap-2">
              Blog Posts
              <span className="text-sm font-normal text-[#6B4D3A]">({results.blog.length})</span>
            </h2>
            <div className="space-y-4">
              {results.blog.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#FDF8F4' }} />}>
      <SearchPageInner />
    </Suspense>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const href = `/${result.type === 'story' ? 'stories' : 'blog'}/${result.slug}`;
  return (
    <Link
      href={href}
      className="block rounded-2xl bg-white p-5 hover:shadow-md transition-shadow border border-[#E8956A]/10 group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: result.type === 'story' ? '#E8956A20' : '#D4C1EC40',
                color: result.type === 'story' ? '#E8956A' : '#9B7BC4',
              }}
            >
              {result.type === 'story' ? 'Story' : 'Blog'}
            </span>
            <Badge category={result.category} size="sm">{result.category}</Badge>
          </div>
          <h3 className="font-semibold text-[#3C2415] group-hover:text-[#E8956A] transition-colors line-clamp-2">
            {result.title}
          </h3>
          <p className="text-sm text-[#6B4D3A] mt-1 line-clamp-2">{result.excerpt}</p>
          <p className="text-xs text-[#6B4D3A]/60 mt-2">{formatDate(result.date)}</p>
        </div>
      </div>
    </Link>
  );
}
