import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatDateShort } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
  horizontal?: boolean;
}

export function BlogPostCard({ post, className = '', horizontal = false }: BlogPostCardProps) {
  if (horizontal) {
    return (
      <article
        className={`group flex gap-5 bg-white rounded-[var(--radius-lg)] overflow-hidden border border-border p-4 hover:shadow-[var(--shadow-warm-md)] transition-all duration-300 ${className}`}
      >
        <Link href={`/blog/${post.slug}`} aria-hidden="true" tabIndex={-1} className="shrink-0">
          <div className="w-24 h-24 rounded-[var(--radius-md)] bg-gradient-to-br from-butter-yellow/50 to-tangerine/40 flex items-center justify-center overflow-hidden">
            <span className="text-3xl opacity-50" aria-hidden="true">{post.category.icon}</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1.5 min-w-0">
          <Badge category={post.category.slug}>{post.category.name}</Badge>
          <h3 className="text-sm font-bold text-espresso leading-snug group-hover:text-coral transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-xs text-warm-brown line-clamp-2 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-[11px] text-muted mt-auto">
            <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col bg-white rounded-[var(--radius-lg)] overflow-hidden border border-border hover:shadow-[var(--shadow-warm-md)] transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} aria-hidden="true" tabIndex={-1}>
        <div className="aspect-[16/9] bg-gradient-to-br from-butter-yellow/40 to-tangerine/30 flex items-center justify-center overflow-hidden">
          <span className="text-5xl opacity-25" aria-hidden="true">{post.category.icon}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2">
          <Badge category={post.category.slug}>{post.category.name}</Badge>
          {post.tags[0] && (
            <Badge variant="outline">{post.tags[0].name}</Badge>
          )}
        </div>

        <h3 className="text-lg font-bold text-espresso leading-tight group-hover:text-coral transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-warm-brown leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-butter-yellow/60 to-tangerine/40 flex items-center justify-center text-xs font-bold text-espresso"
              aria-hidden="true"
            >
              {post.author.name.charAt(0)}
            </div>
            <span className="text-xs font-medium text-espresso">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}
