import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, CheckCircle2, Sparkles, Maximize2 } from 'lucide-react';
import { labData } from '../../data/labExplorerData';
import SectionHeader from '../common/SectionHeader';

/**
 * Komponen LabExplorer.
 * Menampilkan eksplorasi unit laboratorium komputasi utama beserta spesifikasi PC,
 * peta seat 2D interaktif, kapasitas ruangan, dukungan software, dan jam operasional.
 */
export default function LabExplorer() {
  const [activeTabSpec, setActiveTabSpec] = useState('specs');
  const [photoZoom, setPhotoZoom] = useState(false);

  const currentLab = labData.komputer;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-950 text-paper-100 relative overflow-hidden scroll-section">
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none animate-float-delayed" />
      <div className="absolute top-1/2 left-10 text-[140px] font-serif font-black text-amber-500/[0.03] select-none pointer-events-none tracking-widest uppercase hidden lg:block">
        LABS
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <SectionHeader
            badge="Bab 04 — Eksplorasi Ruang"
            title="Jelajahi Fasilitas"
            highlight="Laboratorium Komputer IWIMA"
            subtitle="Laboratorium modern berkapasitas 50 PC praktikan + 1 master console dosen yang didesain untuk kenyamanan praktikum dan olah data."
          />

          <div className="flex items-center gap-2 bg-paper-900 px-4 py-2 rounded-2xl border border-paper-800 self-start md:self-auto shadow-xl text-xs font-mono text-amber-400">
            <Monitor className="w-4 h-4 text-amber-400" />
            <span>50 PC Praktikan + 1 Master Console</span>
          </div>
        </motion.div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Photo Preview Container */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div className="relative flex-1 rounded-3xl overflow-hidden border border-paper-800 group shadow-2xl bg-paper-900 min-h-[380px] sm:min-h-[460px] flex flex-col">
              <img
                src={currentLab.image || '/images/praktikumlab.webp'}
                alt={currentLab.name}
                width="800"
                height="600"
                loading="lazy"
                className={`w-full flex-1 h-full object-cover transition-all duration-700 ${photoZoom ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/20 to-transparent" />

              {/* Photo Overlay Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-950/80 backdrop-blur-md border border-paper-700/80 text-xs font-mono text-paper-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Dokumentasi Resmi IWIMA</span>
              </div>

              {/* Photo Zoom Toggle Button */}
              <button
                onClick={() => setPhotoZoom(!photoZoom)}
                className="absolute top-4 right-4 p-2 rounded-full bg-paper-950/80 backdrop-blur-md border border-paper-700 text-paper-200 hover:text-amber-400 transition-colors"
                title="Perbesar Tampilan Foto"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Photo Title Info */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{currentLab.capacity}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-paper-50 font-medium">
                  {currentLab.name}
                </h3>
              </div>
            </div>

            <p className="text-xs font-mono text-paper-400 text-center shrink-0">
              Foto nyata suasana fasilitas Laboratorium Komputer UPT IWIMA
            </p>
          </div>

          {/* Detailed Lab Information Tabbed Panel */}
          <div className="lg:col-span-6 bg-paper-900 rounded-3xl p-6 sm:p-10 border border-paper-800 flex flex-col justify-between space-y-6">

            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Detail Fasilitas Utama</span>
              <h3 className="text-2xl font-serif text-paper-50 font-medium">{currentLab.name}</h3>
              <p className="text-sm font-sans text-paper-300 italic">{currentLab.tagline}</p>
            </div>

            {/* Sub-tabs for Spec / Software / Rules */}
            <div className="flex items-center gap-2 border-b border-paper-800 pb-3">
              <button
                onClick={() => setActiveTabSpec('specs')}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTabSpec === 'specs'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-paper-400 hover:text-paper-200'
                  }`}
              >
                Spesifikasi Perangkat
              </button>

              <button
                onClick={() => setActiveTabSpec('software')}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTabSpec === 'software'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-paper-400 hover:text-paper-200'
                  }`}
              >
                Software Terpasang
              </button>

              <button
                onClick={() => setActiveTabSpec('rules')}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTabSpec === 'rules'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-paper-400 hover:text-paper-200'
                  }`}
              >
                Tata Tertib
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="min-h-[220px]">
              {activeTabSpec === 'specs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLab.specs.map((item, idx) => (
                      <div key={idx} className="bg-paper-950 p-3 rounded-xl border border-paper-800 space-y-1">
                        <div className="text-[11px] font-mono text-paper-400">{item.label}</div>
                        <div className="text-xs font-sans text-paper-100 font-medium">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Prominent 3D Hardware Spec Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simulasi 3D Interaktif</span>
                      </div>
                      <p className="text-xs text-paper-300 font-sans">
                        Eksplorasi arsitektur motherboard & komponen hardware dalam tampilan 3D.
                      </p>
                    </div>
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('launch-3d-explorer'))}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-paper-950 font-mono text-xs font-bold transition-all duration-300 shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer flex items-center gap-2 hover:scale-105"
                    >
                      <span>Buka 3D Mobo</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTabSpec === 'software' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentLab.software.map((sw, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-paper-950 border border-paper-800 text-xs text-paper-200 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{sw}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTabSpec === 'rules' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                  {currentLab.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-paper-950 border border-paper-800 text-xs text-paper-300 font-sans">
                      <span className="font-mono text-amber-400 font-bold">{idx + 1}.</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Quick Lab Booking / Hours Notice */}
            <div className="pt-4 border-t border-paper-800 flex items-center justify-between text-xs font-mono text-paper-400">
              <span>Operasional: Senin – Sabtu (08.00 – 16.00 WIB)</span>
              <span className="text-amber-400">Bisa Pinjam Lab Mandiri</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
