'use client';

import { useEffect, useState } from 'react';

interface BookmarkButtonProps {
  articleId: string;
  articleType: 'story' | 'blog';
  title: string;
  slug: string;
  category?: string;
  className?: string;
  showLabel?: boolean;
}

const STORAGE_KEY = 'ng-bookmarks';

export interface BookmarkedArticle {
  id: string;
  type: 'story' | 'blog';
  title: string;
  slug: string;
  category?: string;
  savedAt: string;
}

export function getBookmarks(): BookmarkedArticle[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(items: BookmarkedArticle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function BookmarkButton({
  articleId,
  articleType,
  title,
  slug,
  category,
  className = '',
  showLabel = false,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setSaved(bookmarks.some((b) => b.id === articleId));
  }, [articleId]);

  function toggle() {
    const bookmarks = getBookmarks();
    if (saved) {
      saveBookmarks(bookmarks.filter((b) => b.id !== articleId));
      setSaved(false);
    } else {
      const item: BookmarkedArticle = {
        id: articleId,
        type: articleType,
        title,
        slug,
        category,
        savedAt: new Date().toISOString(),
      };
      saveBookmarks([item, ...bookmarks]);
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove "${title}" from saved articles` : `Save "${title}" for later`}
      className={`flex items-center gap-1.5 transition-colors ${
        saved ? 'text-[#E8956A]' : 'text-[#6B4D3A] hover:text-[#E8956A]'
      } ${className}`}
    >
      <svg
        className="w-5 h-5 shrink-0"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {showLabel && (
        <span className="text-sm font-medium">{saved ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
}
