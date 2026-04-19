import { cn } from '@/lib/utils';

type CategorySlug = 'crown' | 'skin' | 'fashion' | 'beauty';

const categoryColors: Record<CategorySlug, string> = {
  crown: 'bg-coral/15 text-coral border-coral/25',
  skin: 'bg-rose/20 text-warm-brown border-rose/30',
  fashion: 'bg-lavender/30 text-espresso border-lavender/40',
  beauty: 'bg-soft-pink/30 text-warm-brown border-soft-pink/40',
};

const defaultColor = 'bg-border text-warm-brown border-border';

interface BadgeProps {
  children: React.ReactNode;
  category?: string;
  variant?: 'default' | 'outline' | 'solid';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, category, variant = 'default', size = 'sm', className }: BadgeProps) {
  const categoryStyle =
    category && category in categoryColors
      ? categoryColors[category as CategorySlug]
      : defaultColor;

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium tracking-wide uppercase border',
        'rounded-[var(--radius-sm)]',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        variant === 'default' && categoryStyle,
        variant === 'outline' && 'bg-transparent border-current text-warm-brown',
        variant === 'solid' && 'bg-coral text-white border-coral',
        className
      )}
    >
      {children}
    </span>
  );
}
