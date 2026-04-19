'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ImageGallery({ images, columns = 3, className = '' }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isOpen = lightboxIndex !== null;

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, prev, next]);

  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }[columns];

  return (
    <>
      <div className={`grid ${colClass} gap-3 ${className}`} role="list" aria-label="Image gallery">
        {images.map((img, idx) => (
          <div key={idx} role="listitem">
            <button
              onClick={() => openLightbox(idx)}
              aria-label={`View image ${idx + 1}: ${img.alt}`}
              className="w-full aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#E8956A] focus:ring-offset-2 group"
            >
              <div className="w-full h-full bg-[#E8956A]/10 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-[#E8956A]/40 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs line-clamp-2">{img.caption}</p>
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${lightboxIndex + 1} of ${images.length}: ${images[lightboxIndex].alt}`}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image area */}
            <div className="max-w-4xl max-h-[80vh] mx-16 text-center">
              <div className="w-full max-h-[70vh] bg-[#1a1a1a] rounded-xl flex items-center justify-center min-h-[300px]">
                <svg className="w-24 h-24 text-white/20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
              {images[lightboxIndex].caption && (
                <p className="text-white/70 text-sm mt-3">{images[lightboxIndex].caption}</p>
              )}
              <p className="text-white/40 text-xs mt-2">
                {lightboxIndex + 1} / {images.length}
              </p>
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
