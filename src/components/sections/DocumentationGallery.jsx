import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Sparkles } from 'lucide-react';
import { galleryItems } from '../../data/galleryData';
import SectionHeader from '../common/SectionHeader';

export default function DocumentationGallery() {
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="documentation" className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-950 text-paper-100 border-b border-paper-800 relative overflow-hidden scroll-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            badge="Bab 06 — Jejak Visual"
            title="Dokumentasi Kegiatan &"
            highlight="Fasilitas Nyata Kampus"
          />

          {/* Filter Categories with Spring */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'Semua Dokumentasi' },
              { id: 'lab-komputer', label: 'Lab Komputer' },
              { id: 'maintenance', label: 'Pemeliharaan' },
              { id: 'support', label: 'Bantuan Teknis' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-amber-500 text-paper-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-paper-900 text-paper-300 hover:text-paper-100'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  rotate: idx % 2 === 0 ? 2.5 : -2.5,
                  transition: { type: "spring", stiffness: 450, damping: 16, mass: 0.6 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-paper-900 border border-paper-800 cursor-pointer shadow-lg hover:border-amber-400 transition-colors duration-200 hover:shadow-2xl hover:shadow-amber-500/25"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-paper-950/80 backdrop-blur-md border border-paper-700 text-[10px] font-mono text-amber-300">
                    {item.tag}
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-paper-950/80 backdrop-blur-md border border-paper-700 flex items-center justify-center text-paper-300 group-hover:text-amber-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg text-paper-100 font-medium group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-paper-300 font-sans leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 z-50 bg-paper-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-paper-900 rounded-3xl overflow-hidden border border-paper-800 shadow-2xl space-y-0"
              >
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-paper-950/80 text-paper-300 hover:text-paper-50 flex items-center justify-center border border-paper-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={activeImage.image}
                    alt={activeImage.title}
                    className="w-full h-full object-contain max-h-[60vh]"
                  />
                </div>

                <div className="p-8 space-y-3 bg-paper-900">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeImage.tag}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-paper-50 font-medium">{activeImage.title}</h3>
                  <p className="text-sm font-sans text-paper-200 leading-relaxed">{activeImage.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
