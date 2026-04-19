'use client';

import { useState } from 'react';
import { CommentItem } from './CommentItem';
import type { Comment } from './CommentItem';

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    authorName: 'Aaliyah Washington',
    date: '2026-03-28',
    text: 'This article changed my entire hair care routine. The section on scalp health was eye-opening — I had no idea that buildup was causing my breakage. After implementing the tips, my edges are finally growing back strong.',
    likes: 24,
    replies: [
      {
        id: '1a',
        authorName: 'Imani Rhodes',
        date: '2026-03-29',
        text: 'So glad to hear this, Aaliyah! Scalp health really is the foundation. Keep us updated on your journey!',
        likes: 8,
      },
    ],
  },
  {
    id: '2',
    authorName: 'Simone Oduya',
    date: '2026-03-25',
    text: 'The science behind this is so well-explained. I appreciate that Natural Girlies always cites real research instead of just sharing trends. Shared this with my whole hair group chat!',
    likes: 17,
    replies: [
      {
        id: '2a',
        authorName: 'Kezia Barnwell',
        date: '2026-03-26',
        text: 'Same! This is exactly the kind of content that makes this community so valuable.',
        likes: 5,
      },
    ],
  },
  {
    id: '3',
    authorName: 'Danielle Osei',
    date: '2026-03-22',
    text: 'I have been on my natural hair journey for 3 years and still learned something new from this piece. The protective style section was particularly helpful — I never thought about tension as a long-term concern.',
    likes: 12,
  },
  {
    id: '4',
    authorName: 'Fatima Al-Rashid',
    date: '2026-03-20',
    text: 'Question — would the advice here apply to someone with 4C hair specifically? I find a lot of natural hair content is skewed toward looser curl patterns.',
    likes: 9,
  },
];

type SortOrder = 'newest' | 'oldest';

interface CommentListProps {
  articleId: string;
}

export function CommentList({ articleId: _articleId }: CommentListProps) {
  const [sort, setSort] = useState<SortOrder>('newest');
  const [visibleCount, setVisibleCount] = useState(3);

  const sorted = [...SAMPLE_COMMENTS].sort((a, b) => {
    if (sort === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#6B4D3A]">
          {SAMPLE_COMMENTS.length} comment{SAMPLE_COMMENTS.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-1" role="group" aria-label="Sort comments">
          <span className="text-xs text-[#6B4D3A] mr-1">Sort:</span>
          {(['newest', 'oldest'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              aria-pressed={sort === s}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                sort === s
                  ? 'bg-[#E8956A] text-white border-[#E8956A]'
                  : 'text-[#6B4D3A] border-[#6B4D3A]/30 hover:border-[#E8956A] hover:text-[#E8956A]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {visible.map((comment) => (
          <div key={comment.id} className="pb-6 border-b border-[#E8956A]/10 last:border-0">
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setVisibleCount((c) => c + 3)}
          className="mt-6 w-full py-2.5 text-sm font-medium text-[#E8956A] border border-[#E8956A] rounded-full hover:bg-[#E8956A]/10 transition-colors"
        >
          Load more comments
        </button>
      )}
    </div>
  );
}
