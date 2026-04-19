import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatDateShort } from '@/lib/utils';
import type { Story } from '@/lib/types';

interface StoryCardProps {
  story: Story;
  className?: string;
}

export function StoryCard({ story, className = '' }: StoryCardProps) {
  return (
    <article
      className={`group flex flex-col bg-white rounded-[var(--radius-lg)] overflow-hidden border border-border hover:shadow-[var(--shadow-warm-md)] transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Image */}
      <Link href={`/stories/${story.slug}`} aria-label={story.title} tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[16/10] bg-border/40 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-coral/20 to-rose/20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-30" aria-hidden="true">
              {story.category.icon}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Badge category={story.category.slug}>{story.category.name}</Badge>

        <h3 className="text-lg font-bold text-espresso leading-tight group-hover:text-coral transition-colors line-clamp-2">
          <Link href={`/stories/${story.slug}`}>{story.title}</Link>
        </h3>

        <p className="text-sm text-warm-brown leading-relaxed line-clamp-3 flex-1">
          {story.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <div
            className="w-7 h-7 rounded-full bg-gradient-to-br from-coral/30 to-rose/30 flex items-center justify-center text-xs font-bold text-espresso shrink-0"
            aria-hidden="true"
          >
            {story.author.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-espresso truncate">{story.author.name}</span>
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <time dateTime={story.publishedAt}>{formatDateShort(story.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{story.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
