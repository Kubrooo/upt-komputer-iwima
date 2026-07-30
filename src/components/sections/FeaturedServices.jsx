import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, Check } from 'lucide-react';
import { services } from '../../data/servicesData';
import SectionHeader from '../common/SectionHeader';

export default function FeaturedServices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-900 border-b border-paper-800 relative overflow-hidden scroll-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            badge="Bab 03 — Layanan Unggulan"
            title="Tiga Pilar Utama"
            highlight="Dukungan Teknologi UPT"
            subtitle="Setiap layanan dirancang untuk memastikan mahasiswa memiliki akses cepat terhadap perangkat, software, dan tempat belajar berstandar tinggi."
          />
        </motion.div>

        {/* Tab Selector Navigation for Immersive Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 border-b border-paper-800 pb-4 overflow-x-auto"
        >
          {services.map((svc, index) => {
            const IconC = svc.icon;
            const isActive = activeTab === index;
            return (
              <motion.button
                key={svc.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setActiveTab(index)}
                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-xs tracking-wider transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-paper-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-paper-950 text-paper-300 hover:text-paper-100 hover:bg-paper-800'
                }`}
              >
                <span>{svc.number}</span>
                <IconC className="w-4 h-4" />
                <span>{svc.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Immersive Service Panel Display */}
        <AnimatePresence mode="wait">
          {services.map((svc, index) => {
            if (index !== activeTab) return null;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-paper-950 rounded-3xl p-8 sm:p-12 border border-paper-800 shadow-2xl relative overflow-hidden"
              >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Left Side: Storytelling Description & Highlights */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-amber-400 uppercase tracking-widest">
                      <span>Service {svc.number}</span>
                      <span>•</span>
                      <span>{svc.category}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif text-paper-50 font-medium">
                      {svc.title}
                    </h3>
                    <p className="text-sm font-mono text-amber-300/90 italic">
                      "{svc.tagline}"
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-paper-200 font-sans leading-relaxed border-l-2 border-amber-500/60 pl-4">
                    {svc.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono text-paper-400 uppercase tracking-wider block">
                      Keunggulan & Fasilitas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-paper-200 font-sans">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href="#labs"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-paper-900 hover:bg-paper-800 border border-paper-700 text-xs font-mono text-paper-100 transition-colors"
                    >
                      <span>Jelajahi Fasilitas ini</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Interactive Spec / Feature Visualizer */}
                <div className="lg:col-span-5 bg-paper-900/90 rounded-2xl p-6 sm:p-8 border border-paper-800/90 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-paper-800">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{svc.interactiveDemo.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                        Terverifikasi
                      </span>
                    </div>

                    <div className="space-y-4">
                      {svc.interactiveDemo.details.map((item, idx) => (
                        <div key={idx} className="bg-paper-950 p-3.5 rounded-xl border border-paper-800 space-y-1">
                          <div className="text-[11px] font-mono text-paper-400 uppercase tracking-wide">
                            {item.title}
                          </div>
                          <div className="text-xs font-sans text-paper-100 font-medium">
                            {item.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-paper-800 text-[11px] font-mono text-paper-400 text-center">
                    Bisa diakses oleh seluruh mahasiswa & dosen IWIMA
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>
    </section>
  );
}
