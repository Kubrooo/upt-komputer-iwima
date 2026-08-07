import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Search, ThumbsUp, X } from 'lucide-react';
import { faqs } from '../../data/faqsData';

/**
 * Komponen EditorialFAQ.
 * Menampilkan daftar pertanyaan yang sering diajukan (FAQ) seputar operasional lab,
 * bantuan teknis, dan perizinan dalam format akordeon interaktif dengan live search & reaction.
 */
export default function EditorialFAQ() {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [reactions, setReactions] = useState(
    faqs.reduce((acc, item) => ({ ...acc, [item.id]: item.helpful }), {})
  );
  const [votedMap, setVotedMap] = useState({});

  const categories = ['Semua', 'Laboratorium', 'Software & Akun', 'Fasilitas', 'Layanan'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'Semua' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const firstMatch = faqs.find((f) => cat === 'Semua' || f.category === cat);
    setOpenId(firstMatch ? firstMatch.id : null);
  };

  const handleToggleVote = (id) => {
    const isVoted = votedMap[id];
    setVotedMap((prev) => ({ ...prev, [id]: !isVoted }));
    setReactions((prev) => ({
      ...prev,
      [id]: isVoted ? prev[id] - 1 : prev[id] + 1
    }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-900 border-b border-paper-800 relative overflow-hidden scroll-section">
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] font-serif font-black text-amber-500/[0.03] select-none pointer-events-none tracking-widest uppercase hidden lg:block">
        FAQS
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Bab 07 — Pertanyaan Umum</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-paper-50 leading-tight">
            Pertanyaan yang Sering <br />
            <span className="italic text-amber-300">Diajukan Mahasiswa</span>
          </h2>
          <p className="text-sm font-sans text-paper-300">
            Jawaban jelas dan transparan mengenai aturan, akses fasilitas, dan dukungan teknis UPT Komputer IWIMA.
          </p>
        </motion.div>

        {/* Interactive Controls Bar: Live Search & Category Filter */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-paper-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan seputar lab, software, akun, atau aturan..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-paper-950 border border-paper-800 text-sm font-sans text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-paper-400 hover:text-paper-100 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-paper-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-paper-950 text-paper-300 border-paper-800 hover:border-paper-700 hover:text-paper-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-paper-950 rounded-2xl border border-paper-800 text-paper-400 text-sm font-sans">
            Tidak ada pertanyaan yang sesuai dengan kata kunci "<span className="text-amber-400">{searchQuery}</span>".
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.006 }}
                  className={`bg-paper-950 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-amber-500/60 shadow-xl shadow-amber-500/5' : 'border-paper-800/90 hover:border-amber-500/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-paper-900 border border-paper-800 text-[10px] font-mono text-amber-400 font-bold uppercase">
                        {faq.category}
                      </span>
                      <span className="font-serif text-lg font-medium text-paper-100">
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`p-2 rounded-full bg-paper-900 ${isOpen ? 'text-amber-400 bg-amber-500/10' : 'text-paper-400'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6 pb-6 pt-0 text-sm font-sans text-paper-300 leading-relaxed border-t border-paper-900 overflow-hidden space-y-4"
                      >
                        <p className="pt-4 border-l-2 border-amber-500/40 pl-4">
                          {faq.a}
                        </p>

                        {/* Interactive Reaction Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-paper-900 text-xs font-mono text-paper-400">
                          <span>Apakah jawaban ini membantu?</span>
                          <button
                            onClick={() => handleToggleVote(faq.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                              votedMap[faq.id]
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                                : 'bg-paper-900 text-paper-300 border-paper-800 hover:text-paper-100 hover:border-paper-700'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${votedMap[faq.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
                            <span>Membantu ({reactions[faq.id]})</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quick Contact Option */}
        <div className="bg-paper-950 p-6 sm:p-8 rounded-2xl border border-paper-800 text-center space-y-3">
          <MessageSquare className="w-6 h-6 text-amber-400 mx-auto" />
          <h3 className="text-lg font-serif text-paper-100">Punya Pertanyaan Lain yang Belum Terjawab?</h3>
          <p className="text-xs text-paper-300 font-sans max-w-md mx-auto">
            Tim teknis kami selalu terbuka untuk berkonsultasi. Jangan ragu untuk langsung datang ke Ruang UPT Komputer IWIMA.
          </p>
        </div>

      </div>
    </section>
  );
}
