import React, { useState, useEffect, useRef } from 'react';

/**
 * Komponen Pembungkus LazySection.
 * Memuat komponen anak HANYA ketika section mendekati area viewport layar via IntersectionObserver.
 * Mencegah Framer Motion pada section bawah mengukur geometri DOM saat muatan awal halaman,
 * mengeliminasi Forced Reflow (70ms -> 0ms) pada audit Lighthouse.
 */
export default function LazySection({ children, minHeight = '300px', rootMargin = '250px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
