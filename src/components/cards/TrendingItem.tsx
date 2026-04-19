import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { Story } from '@/lib/types';

interface TrendingItemProps {
  story: Story;
  rank: number;
}

export function TrendingItem({ story, rank }: TrendingItemProps) {
  return (
    <article className="group flex items-start gap-4 py-4 border-b border-border last:border-0">
      {/* Rank */}
      <span
        className="font-playfair text-3xl font-bold text-border group-hover:text-coral/30 transition-colors leading-none pt-1 w-10 shrink-0 select-none"
        aria-hidden="true"
      >
        {String(rank).padStart(2, '0')}
      </span>

      {/* Thumb */}
      <div
        className="w-16 h-16 rounded-[var(--radius-md)] bg-gradient-to-br from-tangerine/40 to-rose/30 flex items-center justify-center shrink-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-2xl opacity-50">{story.category.icon}</span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <Badge category={story.category.slug}>{story.category.name}</Badge>
        <h3 className="text-sm font-bold text-espresso leading-snug group-hover:text-coral transition-colors line-clamp-2">
          <Link href={`/stories/${story.slug}`}>{story.title}</Link>
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span>{story.author.name}</span>
          <span aria-hidden="true">·</span>
          <span>{story.readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
