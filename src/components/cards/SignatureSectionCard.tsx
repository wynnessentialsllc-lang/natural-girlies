import Link from 'next/link';
import type { SignatureSection } from '@/lib/types';

interface SignatureSectionCardProps {
  section: SignatureSection;
  className?: string;
}

export function SignatureSectionCard({ section, className = '' }: SignatureSectionCardProps) {
  return (
    <Link
      href={section.href}
      className={`group flex flex-col gap-4 p-6 bg-white rounded-[var(--radius-xl)] border border-border hover:shadow-[var(--shadow-warm-md)] hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      aria-label={`Go to ${section.name}`}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center text-xl"
        style={{ backgroundColor: `${section.color}20`, color: section.color }}
        aria-hidden="true"
      >
        {section.icon}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-bold text-espresso group-hover:text-coral transition-colors leading-snug">
          {section.name}
        </h3>
        <p className="text-sm text-warm-brown leading-relaxed line-clamp-3">
          {section.description}
        </p>
      </div>

      <span className="text-xs font-semibold text-coral group-hover:text-melon transition-colors mt-auto">
        Read Series →
      </span>
    </Link>
  );
}
