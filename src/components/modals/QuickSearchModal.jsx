import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchItems } from '../../data/searchData';

export default function QuickSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = query.trim() === ''
    ? searchItems
    : searchItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
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
              placeholder="Cari layanan, fasilitas lab, software, atau bantuan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-paper-100 text-sm font-sans placeholder-paper-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-paper-400 hover:text-paper-100 bg-paper-950 border border-paper-800"
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
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-start justify-between p-3.5 rounded-2xl bg-paper-950/60 hover:bg-paper-950 border border-paper-800/80 hover:border-amber-500/50 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-paper-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-paper-950 transition-colors shrink-0">
                        <IconC className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm text-paper-100 font-medium group-hover:text-amber-300 transition-colors">
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
                    <ArrowRight className="w-4 h-4 text-paper-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </a>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-6 py-3 bg-paper-950 border-t border-paper-800 flex items-center justify-between text-[11px] font-mono text-paper-400">
            <span>UPT Komputer IWIMA Quick Search</span>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-paper-900 border border-paper-800 rounded text-paper-300">ESC</kbd>
              <span>untuk menutup</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
