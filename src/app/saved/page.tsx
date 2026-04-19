'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookmarks, BookmarkedArticle } from '@/components/BookmarkButton';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setLoaded(true);
  }, []);

  function removeBookmark(id: string) {
    const updated = bookmarks.filter((b) => b.id !== id);
    localStorage.setItem('ng-bookmarks', JSON.stringify(updated));
    setBookmarks(updated);
  }

  function clearAll() {
    localStorage.removeItem('ng-bookmarks');
    setBookmarks([]);
  }

  return (
    <div style={{ backgroundColor: '#FDF8F4' }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: '#3C2415' }} className="py-14">
        <Container>
          <h1 className="font-playfair text-4xl font-bold text-white text-center mb-2">
            Saved Articles
          </h1>
          <p className="text-white/70 text-center">Your personal reading list</p>
        </Container>
      </div>

      <Container className="py-10">
        {!loaded && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-[#E8956A]/10 animate-pulse" />
            ))}
          </div>
        )}

        {loaded && bookmarks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4" aria-hidden="true">🔖</div>
            <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-2">
              Nothing saved yet
            </h2>
            <p className="text-[#6B4D3A] mb-6 max-w-sm mx-auto">
              When you find an article you love, tap the bookmark icon to save it here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/stories"
                className="px-6 py-3 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: '#E8956A' }}
              >
                Browse Stories
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 rounded-full border border-[#E8956A] text-[#E8956A] text-sm font-semibold hover:bg-[#E8956A]/10 transition-colors"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        )}

        {loaded && bookmarks.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#6B4D3A]">
                {bookmarks.length} saved {bookmarks.length === 1 ? 'article' : 'articles'}
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-[#6B4D3A] hover:text-red-500 transition-colors border border-[#6B4D3A]/30 px-3 py-1.5 rounded-full"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4">
              {bookmarks.map((bookmark) => {
                const href = `/${bookmark.type === 'story' ? 'stories' : 'blog'}/${bookmark.slug}`;
                return (
                  <div
                    key={bookmark.id}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#E8956A]/10 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: bookmark.type === 'story' ? '#E8956A20' : '#D4C1EC40',
                            color: bookmark.type === 'story' ? '#E8956A' : '#9B7BC4',
                          }}
                        >
                          {bookmark.type === 'story' ? 'Story' : 'Blog'}
                        </span>
                        {bookmark.category && (
                          <Badge category={bookmark.category} size="sm">
                            {bookmark.category}
                          </Badge>
                        )}
                      </div>
                      <Link
                        href={href}
                        className="font-semibold text-[#3C2415] hover:text-[#E8956A] transition-colors block leading-snug"
                      >
                        {bookmark.title}
                      </Link>
                      <p className="text-xs text-[#6B4D3A]/70 mt-1">
                        Saved {formatDate(bookmark.savedAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={href}
                        className="text-sm text-[#E8956A] hover:underline font-medium whitespace-nowrap"
                      >
                        Read →
                      </Link>
                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        aria-label={`Remove "${bookmark.title}" from saved`}
                        className="text-[#6B4D3A]/50 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
