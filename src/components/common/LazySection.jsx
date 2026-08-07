import React, { useState, useEffect, useRef } from 'react';

/**
 * Komponen Pembungkus LazySection.
 * Memuat komponen anak HANYA ketika section mendekati area viewport layar via IntersectionObserver,
 * atau ketika section dituju secara langsung via navigasi Navbar / Hash Link.
 */
export default function LazySection({ id, children, minHeight = '300px', rootMargin = '350px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If window hash matches this section's ID, reveal immediately
    if (id && window.location.hash === `#${id}`) {
      setIsVisible(true);
    }

    const handleReveal = (e) => {
      if (id && e.detail === id) {
        setIsVisible(true);
      }
    };

    window.addEventListener('lazy-section-reveal', handleReveal);
    return () => window.removeEventListener('lazy-section-reveal', handleReveal);
  }, [id]);

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
    <div 
      id={id} 
      ref={containerRef} 
      className="scroll-section"
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
}

