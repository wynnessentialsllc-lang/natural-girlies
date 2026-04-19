'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CommentFormProps {
  articleId: string;
}

export function CommentForm({ articleId: _articleId }: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!comment.trim()) newErrors.comment = 'Comment is required';
    if (comment.trim().length < 10) newErrors.comment = 'Comment must be at least 10 characters';
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // spam trap
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: '#E8956A10' }}
        role="alert"
      >
        <div className="text-3xl mb-2">✨</div>
        <h3 className="font-semibold text-[#3C2415] mb-1">Comment submitted!</h3>
        <p className="text-sm text-[#6B4D3A]">
          Comments are moderated and may take a moment to appear. Thank you for being part of the conversation.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setComment('');
          }}
          className="mt-4 text-sm text-[#E8956A] hover:underline"
        >
          Post another comment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Post a comment">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Name */}
        <div>
          <label htmlFor="comment-name" className="block text-sm font-medium text-[#3C2415] mb-1">
            Name <span aria-hidden="true" className="text-[#E8956A]">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'comment-name-error' : undefined}
            className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8956A]/40 bg-white text-[#3C2415] ${
              errors.name ? 'border-red-400' : 'border-[#E8956A]/30'
            }`}
          />
          {errors.name && (
            <p id="comment-name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="comment-email" className="block text-sm font-medium text-[#3C2415] mb-1">
            Email <span className="text-[#6B4D3A] font-normal">(optional)</span>
          </label>
          <input
            id="comment-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-[#E8956A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8956A]/40 bg-white text-[#3C2415]"
          />
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label htmlFor="comment-text" className="block text-sm font-medium text-[#3C2415] mb-1">
          Comment <span aria-hidden="true" className="text-[#E8956A]">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="comment-text"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.comment}
          aria-describedby={errors.comment ? 'comment-text-error' : 'comment-guidelines'}
          placeholder="Share your thoughts with the community…"
          className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8956A]/40 bg-white text-[#3C2415] resize-y ${
            errors.comment ? 'border-red-400' : 'border-[#E8956A]/30'
          }`}
        />
        {errors.comment && (
          <p id="comment-text-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.comment}
          </p>
        )}
      </div>

      {/* Guidelines note */}
      <p id="comment-guidelines" className="text-xs text-[#6B4D3A] mb-4">
        Comments are moderated and may take a moment to appear. Please read our{' '}
        <Link href="/comment-policy" className="text-[#E8956A] hover:underline">
          community guidelines
        </Link>{' '}
        before posting.
      </p>

      <button
        type="submit"
        className="px-6 py-2.5 text-sm font-semibold text-white rounded-full transition-colors hover:opacity-90"
        style={{ backgroundColor: '#E8956A' }}
      >
        Post Comment
      </button>
    </form>
  );
}
