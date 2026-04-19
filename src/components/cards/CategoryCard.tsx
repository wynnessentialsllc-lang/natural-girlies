import Link from 'next/link';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group flex flex-col gap-4 p-6 bg-white rounded-[var(--radius-xl)] border border-border hover:shadow-[var(--shadow-warm-md)] hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      aria-label={`Explore ${category.name} content`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${category.color}20` }}
        aria-hidden="true"
      >
        {category.icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-lg font-bold text-espresso group-hover:transition-colors"
          style={{ '--hover-color': category.color } as React.CSSProperties}
        >
          <span className="group-hover:text-coral transition-colors">{category.name}</span>
        </h3>
        <p className="text-sm text-warm-brown leading-relaxed line-clamp-3">
          {category.description}
        </p>
      </div>

      <span
        className="text-sm font-medium transition-colors mt-auto"
        style={{ color: category.color }}
      >
        Explore {category.name} →
      </span>
    </Link>
  );
}
