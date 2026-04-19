'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined;
    children?: React.ReactNode;
  };

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

type Props = ButtonProps | LinkButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-coral text-white hover:bg-melon border border-coral hover:border-melon shadow-[var(--shadow-warm-sm)] hover:shadow-[var(--shadow-warm-md)]',
  secondary:
    'bg-transparent text-espresso border border-espresso hover:bg-espresso hover:text-cream',
  ghost:
    'bg-transparent text-warm-brown border border-transparent hover:border-border hover:bg-border/40',
  cta: 'bg-espresso text-cream hover:bg-warm-brown border border-espresso shadow-[var(--shadow-warm-md)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const MotionButton = motion.button;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium tracking-wide leading-none',
      'rounded-[var(--radius-md)]',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer select-none',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ('href' in props && props.href !== undefined) {
      const { href, target, rel } = props as LinkButtonProps;
      return (
        <Link href={href} target={target} rel={rel} className={classes}>
          {children}
        </Link>
      );
    }

    const { disabled, loading, ...buttonProps } = props as ButtonProps;
    return (
      <MotionButton
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(buttonProps as object)}
      >
        {loading ? (
          <>
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';
