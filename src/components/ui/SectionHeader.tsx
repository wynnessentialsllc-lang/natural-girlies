import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  centered?: boolean;
  className?: string;
  eyebrow?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View All',
  centered = false,
  className,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        centered && 'items-center text-center',
        className
      )}
    >
      <div className={cn('flex items-start justify-between gap-4', centered && 'flex-col items-center')}>
        <div className={cn('flex flex-col gap-2', centered && 'items-center')}>
          {eyebrow && (
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-coral">
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-espresso leading-tight">{title}</h2>
        </div>
        {viewAllHref && !centered && (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-medium text-coral hover:text-melon underline underline-offset-4 mt-1 transition-colors"
            aria-label={`${viewAllLabel} — ${title}`}
          >
            {viewAllLabel} →
          </Link>
        )}
      </div>
      {subtitle && (
        <p className={cn('text-warm-brown text-base leading-relaxed', centered && 'max-w-2xl')}>
          {subtitle}
        </p>
      )}
      {viewAllHref && centered && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-coral hover:text-melon underline underline-offset-4 mt-1 transition-colors"
          aria-label={`${viewAllLabel} — ${title}`}
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
