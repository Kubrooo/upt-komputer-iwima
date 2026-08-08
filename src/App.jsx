import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import LazySection from './components/common/LazySection';
import TerminalHUD from './components/common/TerminalHUD';

// Below-The-Fold Lazy Loaded Sections & 3D Explorer
const HiddenBackbone = lazy(() => import('./components/sections/HiddenBackbone'));
const WhyUPTExists = lazy(() => import('./components/sections/WhyUPTExists'));
const FeaturedServices = lazy(() => import('./components/sections/FeaturedServices'));
const LabExplorer = lazy(() => import('./components/sections/LabExplorer'));
const AcademicSupportTicket = lazy(() => import('./components/sections/AcademicSupportTicket'));
const DocumentationGallery = lazy(() => import('./components/sections/DocumentationGallery'));
const UPTDump = lazy(() => import('./components/sections/UPTDump'));
const EditorialFAQ = lazy(() => import('./components/sections/EditorialFAQ'));
const QuickSearchModal = lazy(() => import('./components/modals/QuickSearchModal'));
const Interactive3DExplorer = lazy(() => import('./components/3d/Interactive3DExplorer'));
const Footer = lazy(() => import('./components/layout/Footer'));

/**
 * Komponen Utama (Root) Portal Web UPT Komputer IWIMA.
 * Menggabungkan seluruh bagian halaman dan mengelola state global untuk Quick Search Modal & 3D Explorer.
 */
export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [is3DExplorerOpen, setIs3DExplorerOpen] = useState(false);
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

  // Event Listener for 3D Computer Explorer launch
  useEffect(() => {
    const handleLaunch3D = () => setIs3DExplorerOpen(true);
    window.addEventListener('launch-3d-explorer', handleLaunch3D);
    return () => window.removeEventListener('launch-3d-explorer', handleLaunch3D);
  }, []);

  const handleClose3D = (resultText) => {
    setIs3DExplorerOpen(false);
    if (resultText) {
      window.dispatchEvent(new CustomEvent('3d-explorer-closed', { detail: resultText }));
    }
  };

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
          <LazySection id="story" minHeight="350px">
            <HiddenBackbone />
          </LazySection>
          <LazySection id="why-upt" minHeight="450px">
            <WhyUPTExists />
          </LazySection>
          <LazySection id="services" minHeight="500px">
            <FeaturedServices />
          </LazySection>
          <LazySection id="labs" minHeight="550px">
            <LabExplorer />
          </LazySection>
          <LazySection id="support" minHeight="500px">
            <AcademicSupportTicket />
          </LazySection>
          <LazySection id="documentation" minHeight="550px">
            <DocumentationGallery />
          </LazySection>
          <LazySection id="dump" minHeight="500px">
            <UPTDump />
          </LazySection>
          <LazySection id="faq" minHeight="550px">
            <EditorialFAQ />
          </LazySection>
        </Suspense>
      </main>

      {/* Footer & Floating Overlays */}
      <Suspense fallback={null}>
        <LazySection minHeight="250px">
          <Footer />
        </LazySection>
        <QuickSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onOpen={() => setSearchOpen(true)}
        />
        <TerminalHUD />
        {is3DExplorerOpen && (
          <Interactive3DExplorer onClose={handleClose3D} />
        )}
      </Suspense>
    </div>
  );
}
