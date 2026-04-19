'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent"
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          backgroundColor: '#E8956A',
          transition: shouldReduceMotion ? 'none' : 'width 0.1s linear',
        }}
      />
    </div>
  );
}
