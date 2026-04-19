import Link from 'next/link';
import { STORIES } from '@/lib/sample-data';

interface TrendingWidgetProps {
  className?: string;
  limit?: number;
}

export function TrendingWidget({ className = '', limit = 5 }: TrendingWidgetProps) {
  const items = STORIES.slice(0, limit);

  return (
    <div className={className}>
      <h3 className="font-playfair text-lg font-bold text-[#3C2415] mb-4">Trending Now</h3>
      <ol className="space-y-4" aria-label="Trending articles">
        {items.map((story, idx) => (
          <li key={story.id}>
            <Link
              href={`/stories/${story.slug}`}
              className="flex gap-3 group"
              aria-label={`${idx + 1}. ${story.title}`}
            >
              {/* Rank */}
              <span
                className="font-playfair text-2xl font-bold shrink-0 leading-none pt-0.5"
                style={{ color: '#E8956A', opacity: 1 - idx * 0.15 }}
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="min-w-0">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#E8956A' }}
                >
                  {story.category.name}
                </span>
                <p className="text-sm font-medium text-[#3C2415] leading-snug mt-0.5 group-hover:text-[#E8956A] transition-colors line-clamp-2">
                  {story.title}
                </p>
                <p className="text-xs text-[#6B4D3A] mt-0.5">{story.readTime} min read</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
