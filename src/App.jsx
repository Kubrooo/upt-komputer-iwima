import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import LazySection from './components/common/LazySection';

// Below-The-Fold Lazy Loaded Sections
const HiddenBackbone = lazy(() => import('./components/sections/HiddenBackbone'));
const WhyUPTExists = lazy(() => import('./components/sections/WhyUPTExists'));
const FeaturedServices = lazy(() => import('./components/sections/FeaturedServices'));
const LabExplorer = lazy(() => import('./components/sections/LabExplorer'));
const AcademicSupportTicket = lazy(() => import('./components/sections/AcademicSupportTicket'));
const DocumentationGallery = lazy(() => import('./components/sections/DocumentationGallery'));
const UPTDump = lazy(() => import('./components/sections/UPTDump'));
const EditorialFAQ = lazy(() => import('./components/sections/EditorialFAQ'));
const QuickSearchModal = lazy(() => import('./components/modals/QuickSearchModal'));
const Footer = lazy(() => import('./components/layout/Footer'));

/**
 * Komponen Utama (Root) Portal Web UPT Komputer IWIMA.
 * Menggabungkan seluruh bagian halaman dan mengelola state global untuk Quick Search Modal.
 */
export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -600, y: -600 });

  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: clientX, y: clientY });
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper-950 text-paper-100 font-sans selection:bg-amber-500 selection:text-paper-950 relative overflow-x-hidden">
      {/* Interactive Cursor Ambient Light Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.05), transparent 80%)`
        }}
      />

      {/* Editorial Navigation */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Narrative Content Sections */}
      <main>
        <Hero onOpenSearch={() => setSearchOpen(true)} />
        <Suspense fallback={null}>
          <LazySection minHeight="350px">
            <HiddenBackbone />
          </LazySection>
          <LazySection minHeight="450px">
            <WhyUPTExists />
          </LazySection>
          <LazySection minHeight="500px">
            <FeaturedServices />
          </LazySection>
          <LazySection minHeight="550px">
            <LabExplorer />
          </LazySection>
          <LazySection minHeight="500px">
            <AcademicSupportTicket />
          </LazySection>
          <LazySection minHeight="550px">
            <DocumentationGallery />
          </LazySection>
          <LazySection minHeight="500px">
            <UPTDump />
          </LazySection>
          <LazySection minHeight="550px">
            <EditorialFAQ />
          </LazySection>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <LazySection minHeight="250px">
          <Footer />
        </LazySection>
        <QuickSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </Suspense>
    </div>
  );
}
