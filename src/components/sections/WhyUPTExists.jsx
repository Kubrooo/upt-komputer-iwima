import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { pillars } from '../../data/statsData';

/**
 * Komponen WhyUPTExists.
 * Menjelaskan 3 pilar utama alasan keberadaan UPT Komputer (Akses Terbuka, Keandalan Fasilitas, & Pendampingan).
 */
export default function WhyUPTExists() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-950 text-paper-100 relative overflow-hidden scroll-section">
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 text-[140px] font-serif font-black text-amber-500/[0.025] select-none pointer-events-none tracking-widest uppercase hidden lg:block">
        MISSION
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Bab 02 — Misi Utama</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-tight">
            Mengapa UPT Komputer <br />
            <span className="italic text-amber-300">Harus Ada untuk Mahasiswa?</span>
          </h2>
          <p className="text-paper-300 text-base sm:text-lg font-sans leading-relaxed">
            Teknologi dalam perkuliahan seharusnya mempermudah, bukan mempersulit. UPT Komputer hadir untuk memastikan tidak ada mahasiswa yang tertinggal hanya karena kendala perangkat atau ketidaktahuan teknis.
          </p>
        </motion.div>

        {/* 4 Pillars of Support System */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  rotate: idx % 2 === 0 ? 2.5 : -2.5,
                  transition: { type: "spring", stiffness: 450, damping: 16, mass: 0.6 }
                }}
                whileTap={{ scale: 0.95 }}
                className="h-full flex flex-col"
              >
                <div className="h-full flex-1 bg-paper-900/90 p-8 rounded-2xl border border-paper-800 flex flex-col justify-between hover:border-amber-400 transition-colors duration-200 group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-500/25">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: [0, -15, 15, -10, 0] }}
                      transition={{ type: "spring", stiffness: 500, damping: 12 }}
                      className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-paper-950 transition-all duration-300 shrink-0 shadow-inner"
                    >
                      <IconComp className="w-6 h-6" />
                    </motion.div>

                    {/* Fixed min-height title container so 1-line and 2-line titles align 100% straight across */}
                    <div className="min-h-[60px] flex items-center">
                      <h3 className="text-xl font-serif font-medium text-paper-50 group-hover:text-amber-300 transition-colors leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm text-paper-300 font-sans leading-relaxed flex-1">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-paper-800/80 flex items-center gap-2 text-xs font-mono text-paper-400 group-hover:text-amber-400 transition-colors shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Standar Layanan IWIMA</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Big Editorial Manifesto Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-r from-paper-900 via-paper-900 to-amber-950/40 p-8 sm:p-14 border border-paper-800 overflow-hidden shadow-2xl group"
        >
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Manifesto Pelayanan</span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-paper-50 leading-snug">
              "Kami mengukur keberhasilan bukan dari seberapa canggih spesifikasi komputer kami, tetapi dari seberapa mudah mahasiswa menyelesaikan studi mereka."
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-paper-300">
              <span className="text-amber-400">Tim UPT Komputer IWIMA</span>
              <span>•</span>
              <span>Institut Widya Pratama Pekalongan</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
