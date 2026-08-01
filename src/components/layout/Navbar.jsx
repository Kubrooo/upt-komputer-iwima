import React, { useState, useEffect } from 'react';
import { Search, Command, Menu, X, ChevronRight, PhoneCall } from 'lucide-react';

/**
 * Komponen Navigasi Atas (Navbar) Portal UPT Komputer IWIMA.
 * Menyediakan navigasi antar-section, efek scroll backdrop blur, serta pemicu Quick Search Modal.
 *
 * @param {Object} props - Props komponen
 * @param {Function} props.onOpenSearch - Callback untuk membuka modal pencarian cepat (Ctrl+K)
 */
export default function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Kisah Kami', href: '#story' },
    { name: 'Layanan Utama', href: '#services' },
    { name: 'Laboratorium', href: '#labs' },
    { name: 'Bantuan Teknis', href: '#support' },
    { name: 'Dokumentasi', href: '#documentation' },
    { name: 'UPT Dump', href: '#dump' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-paper-950/90 backdrop-blur-xl border-b border-paper-800/80 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Editorial Title */}
            <a href="#" className="flex items-center gap-3 group text-left shrink-0">
              <img
                src="/images/logo-upt.webp"
                alt="Logo UPT Komputer IWIMA"
                width="100"
                height="70"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex items-center gap-2">
                <span className="font-serif italic font-bold tracking-tight text-lg sm:text-xl text-paper-50 group-hover:text-amber-400 transition-colors">
                  UPT Komputer
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  IWIMA
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7 whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase font-mono tracking-wider text-paper-300 hover:text-paper-50 transition-colors relative py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Status & Search Command CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Command Palette Button */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-paper-900 border border-paper-700/70 text-paper-300 hover:text-paper-50 hover:border-paper-600 transition-all text-xs font-mono group cursor-pointer"
                title="Buka Menu Pencarian Cepat (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-paper-300 group-hover:text-amber-400 transition-colors" />
                <span className="hidden lg:inline text-paper-300">Cari Layanan</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-paper-800 text-paper-300 px-1.5 py-0.5 rounded border border-paper-700">
                  <Command className="w-2.5 h-2.5" /> K
                </kbd>
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-paper-900 border border-paper-800 text-paper-200 hover:text-paper-50 focus:outline-none cursor-pointer"
                aria-label="Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Full Screen Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-paper-950/98 backdrop-blur-2xl px-6 pt-24 pb-8 xl:hidden shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          <div className="flex items-center justify-between pb-4 border-b border-paper-800">
            <span className="text-xs font-mono text-paper-300 uppercase tracking-widest">Navigasi Utama</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-1.5 text-xs text-amber-400 font-mono cursor-pointer hover:underline"
            >
              <Search className="w-3.5 h-3.5" /> Cari (Ctrl+K)
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg font-serif italic text-paper-100 hover:text-amber-400 py-2 transition-colors border-b border-paper-900/60"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-paper-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 max-w-md mx-auto w-full">
          <a
            href="#support"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-amber-500 text-paper-950 font-semibold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            Hubungi Bantuan Teknis
          </a>
        </div>
      </div>
    </>
  );
}
