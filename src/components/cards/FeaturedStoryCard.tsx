import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import type { Story } from '@/lib/types';

interface FeaturedStoryCardProps {
  story: Story;
  className?: string;
}

export function FeaturedStoryCard({ story, className = '' }: FeaturedStoryCardProps) {
  return (
    <article
      className={`group grid md:grid-cols-2 gap-0 bg-white rounded-[var(--radius-xl)] overflow-hidden border border-border hover:shadow-[var(--shadow-warm-lg)] transition-all duration-300 ${className}`}
    >
      {/* Image */}
      <Link
        href={`/stories/${story.slug}`}
        aria-label={story.title}
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        <div className="relative h-64 md:h-full min-h-[280px] bg-gradient-to-br from-tangerine/40 via-coral/20 to-rose/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/25 to-lavender/20" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl opacity-20" aria-hidden="true">{story.category.icon}</span>
          </div>
          {story.trending && (
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-coral text-white rounded-full">
                Trending
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 lg:p-10 gap-4">
        <Badge category={story.category.slug} size="md">{story.category.name}</Badge>

        <h2 className="text-2xl lg:text-3xl font-bold text-espresso leading-tight group-hover:text-coral transition-colors">
          <Link href={`/stories/${story.slug}`}>{story.title}</Link>
        </h2>

        <p className="text-base text-warm-brown leading-relaxed line-clamp-4">
          {story.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-coral/30 to-rose/30 flex items-center justify-center text-sm font-bold text-espresso shrink-0"
            aria-hidden="true"
          >
            {story.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-espresso">{story.author.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{story.readTime} min read</span>
            </div>
          </div>
        </div>

        <Link
          href={`/stories/${story.slug}`}
          className="self-start mt-1 text-sm font-medium text-coral hover:text-melon underline underline-offset-4 transition-colors"
        >
          Read Story →
        </Link>
      </div>
    </article>
  );
}
