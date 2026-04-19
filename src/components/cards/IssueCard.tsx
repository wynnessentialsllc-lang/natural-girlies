import Link from 'next/link';
import type { Issue } from '@/lib/types';

interface IssueCardProps {
  issue: Issue;
  className?: string;
}

export function IssueCard({ issue, className = '' }: IssueCardProps) {
  return (
    <article
      className={`group flex flex-col bg-white rounded-[var(--radius-lg)] overflow-hidden border border-border hover:shadow-[var(--shadow-warm-md)] transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Cover */}
      <Link href={`/magazine/${issue.slug}`} aria-label={`Read ${issue.title}`} tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/4] bg-gradient-to-b from-espresso/90 via-warm-brown to-coral/70 flex flex-col items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-lavender/20" aria-hidden="true" />
          <div className="relative z-10 text-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-cream/60 mb-2">
              Volume {issue.volume}
            </p>
            <h3 className="font-playfair text-xl font-bold text-cream leading-tight mb-1">
              Natural Girlies
            </h3>
            <p className="text-sm text-cream/70">{issue.season} {issue.year}</p>
          </div>
          {issue.current && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-coral text-white text-[10px] font-semibold tracking-wide uppercase rounded-full">
              Current
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-bold text-espresso group-hover:text-coral transition-colors">
          <Link href={`/magazine/${issue.slug}`}>{issue.title}</Link>
        </h3>
        <p className="text-xs text-warm-brown line-clamp-2 leading-relaxed">{issue.editorLetter.slice(0, 100)}…</p>
        <Link
          href={`/magazine/${issue.slug}`}
          className="text-xs font-medium text-coral hover:text-melon transition-colors mt-1"
        >
          Read Issue →
        </Link>
      </div>
    </article>
  );
}
