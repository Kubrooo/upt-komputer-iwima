import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import HiddenBackbone from './components/sections/HiddenBackbone';
import WhyUPTExists from './components/sections/WhyUPTExists';
import FeaturedServices from './components/sections/FeaturedServices';
import LabExplorer from './components/sections/LabExplorer';
import AcademicSupportTicket from './components/sections/AcademicSupportTicket';
import DocumentationGallery from './components/sections/DocumentationGallery';
import UPTDump from './components/sections/UPTDump';
import EditorialFAQ from './components/sections/EditorialFAQ';
import QuickSearchModal from './components/modals/QuickSearchModal';
import Footer from './components/layout/Footer';

/**
 * Komponen Utama (Root) Portal Web UPT Komputer IWIMA.
 * Menggabungkan seluruh bagian halaman dan mengelola state global untuk Quick Search Modal.
 */
export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper-950 text-paper-100 font-sans selection:bg-amber-500 selection:text-paper-950 relative overflow-x-hidden">
      {/* Editorial Navigation */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Narrative Content Sections */}
      <main>
        <Hero onOpenSearch={() => setSearchOpen(true)} />
        <HiddenBackbone />
        <WhyUPTExists />
        <FeaturedServices />
        <LabExplorer />
        <AcademicSupportTicket />
        <DocumentationGallery />
        <UPTDump />
        <EditorialFAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Easter Egg Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
