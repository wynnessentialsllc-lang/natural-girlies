import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

export function Skeleton({ className, rounded }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-border',
        rounded ? 'rounded-full' : 'rounded-[var(--radius-md)]',
        className
      )}
      aria-hidden="true"
    />
  );
}

export function StoryCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <Skeleton className="w-full aspect-[16/10]" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-3 mt-2">
        <Skeleton className="w-6 h-6" rounded />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
