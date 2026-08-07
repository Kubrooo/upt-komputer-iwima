import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchItems } from '../../data/searchData';

/**
 * Komponen Modal Command Palette / Quick Search.
 * Menyediakan dialog pencarian instan dengan shortcut keyboard (Ctrl+K, Panah Atas/Bawah, Enter, atau Escape).
 *
 * @param {Object} props - Props komponen
 * @param {boolean} props.isOpen - State apakah modal sedang terbuka
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {Function} props.onOpen - Callback untuk membuka modal
 */
export default function QuickSearchModal({ isOpen, onClose, onOpen }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = query.trim() === ''
    ? searchItems
    : searchItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleResultClick = (e, href) => {
    if (e) e.preventDefault();
    onClose();
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      window.dispatchEvent(new CustomEvent('lazy-section-reveal', { detail: targetId }));
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else if (onOpen) {
          onOpen();
        }
      }
      if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const target = filteredItems[selectedIndex];
          if (target) {
            handleResultClick(null, target.href);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpen, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-label="Pencarian Cepat UPT Komputer"
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-paper-950/80 backdrop-blur-xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-paper-900 rounded-3xl border border-paper-700 shadow-2xl overflow-hidden z-10 space-y-0"
        >
          {/* Search Header Input */}
          <div className="flex items-center px-6 py-4 border-b border-paper-800 gap-3">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Cari layanan, fasilitas lab, software, atau bantuan... (Gunakan ↑ ↓ dan Enter)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-paper-100 text-sm font-sans placeholder-paper-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-paper-400 hover:text-paper-100 bg-paper-950 border border-paper-800 cursor-pointer"
              aria-label="Tutup pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-paper-400 space-y-2">
                <p>Tidak ditemukan hasil untuk "{query}"</p>
                <p className="text-paper-400">Coba kata kunci lain seperti "SPSS", "Python", "Lab", atau "Instalasi"</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const IconC = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => handleResultClick(e, item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all duration-200 group ${
                      isSelected
                        ? 'bg-paper-950 border-amber-500/80 shadow-lg shadow-amber-500/10'
                        : 'bg-paper-950/60 border-paper-800/80 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                        isSelected ? 'bg-amber-500 text-paper-950' : 'bg-paper-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-paper-950'
                      }`}>
                        <IconC className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-serif text-sm font-medium transition-colors ${
                            isSelected ? 'text-amber-300' : 'text-paper-100 group-hover:text-amber-300'
                          }`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-paper-800 text-paper-300 px-2 py-0.5 rounded border border-paper-700">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-paper-300 font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      {isSelected && (
                        <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-paper-800 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                          <CornerDownLeft className="w-2.5 h-2.5" /> Enter
                        </kbd>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-all ${
                        isSelected ? 'text-amber-400 translate-x-1' : 'text-paper-400 group-hover:text-amber-400 group-hover:translate-x-1'
                      }`} />
                    </div>
                  </a>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-6 py-3 bg-paper-950 border-t border-paper-800 flex items-center justify-between text-[11px] font-mono text-paper-400">
            <span>UPT Komputer IWIMA Quick Search</span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-paper-900 border border-paper-800 rounded text-paper-300">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-paper-900 border border-paper-800 rounded text-paper-300">↓</kbd>
                <span>navigasi</span>
              </span>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-paper-900 border border-paper-800 rounded text-paper-300">ESC</kbd>
                <span>menutup</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

