'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function SlideIn({
  children,
  className,
  direction = 'left',
  delay = 0,
  duration = 0.5,
  once = true,
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion();

  const initialMap = {
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    up: { opacity: 0, y: -40 },
    down: { opacity: 0, y: 40 },
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initialMap[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
