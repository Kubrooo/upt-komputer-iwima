import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, CheckCircle2, Terminal, ShieldAlert } from 'lucide-react';

/**
 * Komponen Hero Section.
 * Bagian atas utama yang menampilkan judul editorial UPT Komputer, status operasional real-time,
 * statistik interaktif, serta Call To Action (CTA) ke Tiket Bantuan dan Penjelajah Lab.
 *
 * @param {Object} props - Props komponen
 * @param {Function} props.onOpenSearch - Callback untuk membuka modal pencarian cepat (Ctrl+K)
 */
export default function Hero({ onOpenSearch }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-paper-950 bg-grid-pattern scroll-section"
    >
      {/* Dynamic Mouse Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.06), transparent 80%)`,
        }}
      />

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/50 to-paper-950/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper-950/70 via-transparent to-paper-950/70 z-10" />
        <img
          src="/images/DSC03564.webp"
          alt="Suasana Laboratorium Komputer IWIMA"
          className="w-full h-full object-cover object-center filter brightness-75 contrast-110 scale-105"
        />
        <div className="absolute inset-0 bg-noise opacity-20 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8 mt-6">

        {/* Storytelling Problem Statement Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-paper-900/90 border border-paper-700/80 backdrop-blur-md shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-wider text-paper-200">
            A Place to Grow Together — UPT Komputer IWIMA
          </span>
        </motion.div>

        {/* Emotional Storytelling Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-paper-50 font-normal">
            Banyak yang menggunakan fasilitas kampus setiap hari.
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-amber-200/90 font-light max-w-3xl mx-auto">
            Kami hadir memastikan setiap perangkat, laboratorium, dan software perkuliahanmu selalu siap tanpa hambatan.
          </p>
        </motion.div>

        {/* Reveal: UPT Komputer IWIMA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-2 pb-4"
        >
          <div className="inline-block relative">
            <span className="text-xs uppercase font-mono tracking-widest text-paper-300 block mb-2">
              Memperkenalkan
            </span>
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-paper-50 font-sans border-b-2 border-amber-500/80 pb-2">
              UPT Komputer IWIMA
            </div>
            <p className="mt-3 text-sm sm:text-base text-paper-300 max-w-2xl mx-auto font-sans leading-relaxed">
              Bukan sekadar pengelola laboratorium. Kami adalah <span className="text-paper-100 font-medium underline decoration-amber-500/60 underline-offset-4">support system</span> di balik setiap praktikum, pengetikan tugas akhir, hingga kelancaran proses belajar civitas akademika.
            </p>
          </div>
        </motion.div>

        {/* Emotional Problem Micro Cards - Student Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-2 text-left"
        >
          <div className="bg-paper-900/80 backdrop-blur-md p-3.5 rounded-xl border border-paper-800/80 text-xs space-y-1 hover:border-paper-700 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Praktikum Besok?</span>
            </div>
            <p className="text-paper-300">Software praktikum bermasalah? Kami pastikan terinstal sempurna.</p>
          </div>

          <div className="bg-paper-900/80 backdrop-blur-md p-3.5 rounded-xl border border-paper-800/80 text-xs space-y-1 hover:border-paper-700 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Butuh Lab Mandiri?</span>
            </div>
            <p className="text-paper-300">Komputer high-spec & internet cepat siap menemani risetmu.</p>
          </div>

          <div className="bg-paper-900/80 backdrop-blur-md p-3.5 rounded-xl border border-paper-800/80 text-xs space-y-1 hover:border-paper-700 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kendala Laptop?</span>
            </div>
            <p className="text-paper-300">Staf teknis responsif siap membantumu mencari solusi teknis.</p>
          </div>
        </motion.div>

        {/* CTA Microcopy Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.a
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            href="#story"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-paper-950 font-semibold text-sm transition-colors duration-300 shadow-xl shadow-amber-500/25 group cursor-pointer"
          >
            <span>Mulai Mengenal UPT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            href="#labs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-paper-900 hover:bg-paper-800 border border-paper-700 hover:border-amber-400 text-paper-100 font-medium text-sm transition-colors duration-300 group cursor-pointer shadow-lg"
          >
            <Monitor className="w-4 h-4 text-paper-400 group-hover:text-amber-400 transition-colors" />
            <span>Jelajahi Laboratorium</span>
          </motion.a>
        </motion.div>

        {/* Keyboard shortcut hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-4 text-xs font-mono text-paper-300 flex items-center justify-center gap-2"
        >
          <span>Tekan</span>
          <kbd className="px-2 py-0.5 rounded bg-paper-800 border border-paper-700 text-paper-200">Ctrl + K</kbd>
          <span>untuk akses navigasi instan</span>
        </motion.div>

      </div>
    </section>
  );
}
