'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';

export interface Comment {
  id: string;
  authorName: string;
  date: string;
  text: string;
  likes: number;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

export function CommentItem({ comment, isReply = false }: CommentItemProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);
  const [reported, setReported] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');

  const initials = comment.authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  function handleLike() {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked(!liked);
  }

  function handleReport() {
    if (reportConfirm) {
      setReported(true);
      setReportConfirm(false);
    } else {
      setReportConfirm(true);
    }
  }

  function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowReplyForm(false);
    setReplyName('');
    setReplyText('');
  }

  return (
    <div className={`${isReply ? 'ml-10 mt-4' : ''}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
          style={{ backgroundColor: '#E8956A', color: '#fff' }}
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#3C2415] text-sm">{comment.authorName}</span>
            <span className="text-[#6B4D3A] text-xs" aria-label={`Posted on ${formatDate(comment.date)}`}>
              {formatDate(comment.date)}
            </span>
          </div>

          {/* Body */}
          <p className="mt-1 text-[#3C2415] text-sm leading-relaxed">{comment.text}</p>

          {/* Actions */}
          {!reported && (
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={handleLike}
                aria-pressed={liked}
                aria-label={`${liked ? 'Unlike' : 'Like'} comment. ${likeCount} likes`}
                className="flex items-center gap-1 text-xs text-[#6B4D3A] hover:text-[#E8956A] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span style={{ color: liked ? '#E8956A' : undefined }}>{likeCount}</span>
              </button>

              {!isReply && (
                <button
                  onClick={() => setShowReplyForm((v) => !v)}
                  aria-expanded={showReplyForm}
                  className="text-xs text-[#6B4D3A] hover:text-[#E8956A] transition-colors"
                >
                  Reply
                </button>
              )}

              {reportConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600">Sure?</span>
                  <button
                    onClick={handleReport}
                    className="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Yes, report
                  </button>
                  <button
                    onClick={() => setReportConfirm(false)}
                    className="text-xs text-[#6B4D3A] hover:text-[#3C2415]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleReport}
                  aria-label="Flag this comment"
                  className="text-xs text-[#6B4D3A] hover:text-red-500 transition-colors"
                >
                  Flag
                </button>
              )}
            </div>
          )}

          {reported && (
            <p className="text-xs text-[#6B4D3A] mt-2 italic">
              Thank you — this comment has been reported for review.
            </p>
          )}

          {/* Reply form */}
          {showReplyForm && (
            <form
              onSubmit={handleReplySubmit}
              className="mt-3 space-y-2"
              aria-label="Reply form"
            >
              <input
                type="text"
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-3 py-1.5 text-sm border border-[#E8956A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8956A]/40 bg-white text-[#3C2415]"
              />
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply…"
                required
                rows={2}
                className="w-full px-3 py-1.5 text-sm border border-[#E8956A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8956A]/40 bg-white text-[#3C2415] resize-y"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: '#E8956A' }}
                >
                  Post Reply
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-3 py-1 text-xs text-[#6B4D3A] border border-[#6B4D3A]/30 rounded-full hover:bg-[#FDF8F4]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-3 space-y-4 border-l-2 border-[#E8956A]/20 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
