import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { dumpItems } from '../../data/dumpData';
import SectionHeader from '../common/SectionHeader';

/**
 * Komponen UPTDump (Physical Photo Stack Polaroid Style).
 * Menampilkan tumpukan foto fisik interaktif di tengah halaman.
 * Pengunjung dapat menepuk (tap/swipe) atau menekan tombol navigasi untuk mengambil foto teratas
 * dengan animasi fisik 3D slip-out ke belakang tumpukan.
 */
export default function UPTDump() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animDirection, setAnimDirection] = useState('next'); // 'next' | 'prev'
  const [likedMap, setLikedMap] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    dumpItems.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );

  const total = dumpItems.length;

  const handleNext = () => {
    if (animating) return;
    setAnimDirection('next');
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimDirection('prev');
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setAnimating(false);
    }, 450);
  };

  const handleToggleLike = (e, id) => {
    e.stopPropagation();
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: isLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  // Get current 3 items in the stack
  const frontItem = dumpItems[currentIndex];
  const midItem = dumpItems[(currentIndex + 1) % total];
  const backItem = dumpItems[(currentIndex + 2) % total];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-950 text-paper-100 relative overflow-hidden scroll-section border-t border-paper-800/80">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Ambient Glow Orbs with Floating Motion */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none animate-float-delayed" />

      {/* Large Typography Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] sm:text-[170px] font-serif font-black text-amber-500/[0.04] select-none pointer-events-none tracking-widest whitespace-nowrap uppercase leading-none">
        UPT DUMP
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
        
        {/* Section Header */}
        <SectionHeader
          badge="Bab 07 — UPT Dump"
          title="UPT DUMP"
          highlight="Random Moment UPT"
          subtitle="Ketuk atau usap tumpukan foto polaroid di bawah ini untuk melihat momen candid behind-the-scenes UPT Komputer IWIMA."
          className="mx-auto text-center"
        />

        {/* Central Physical Photo Stack Container */}
        <div className="pt-4 pb-2 flex flex-col items-center">
          
          <div
            onClick={handleNext}
            className="photo-stack-container group select-none"
            title="Klik atau Tap untuk ganti foto"
          >

            {/* Back Card (Card 3) */}
            <div
              className={`physical-photo-card stack-back ${
                animating
                  ? animDirection === 'next'
                    ? 'card-anim-promote-back'
                    : 'card-anim-demote-mid'
                  : ''
              }`}
            >
              <img src={backItem.image} alt="Photo Dump UPT" width="500" height="600" loading="lazy" />
            </div>

            {/* Mid Card (Card 2) */}
            <div
              className={`physical-photo-card stack-mid ${
                animating
                  ? animDirection === 'next'
                    ? 'card-anim-promote-mid'
                    : 'card-anim-demote-front'
                  : ''
              }`}
            >
              <img src={midItem.image} alt="Photo Dump UPT" width="500" height="600" loading="lazy" />
            </div>

            {/* Front Main Card (Card 1) */}
            <div
              className={`physical-photo-card stack-front ${
                animating
                  ? animDirection === 'next'
                    ? 'card-anim-pulling-next'
                    : 'card-anim-pulling-prev'
                  : ''
              }`}
            >
              <img src={frontItem.image} alt="Photo Dump UPT" width="500" height="600" loading="lazy" />
            </div>
          </div>

          {/* Interactive Action Bar Below Stack */}
          <div className="max-w-xl mx-auto pt-6 text-center">
            {/* Controls Bar: Prev, Tap Hint, Like, Next */}
            <div className="flex items-center justify-between gap-4 px-2">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                disabled={animating}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper-900 border border-paper-800 text-xs font-mono text-paper-300 hover:text-paper-50 hover:border-paper-700 transition-all disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {/* Central Tap Hint */}
              <button
                onClick={handleNext}
                className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tap Foto untuk Ambil Berikutnya</span>
              </button>

              {/* Like & Next Group */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleToggleLike(e, frontItem.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono transition-all border ${
                    likedMap[frontItem.id]
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-paper-900 text-paper-300 border-paper-800 hover:text-paper-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[frontItem.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likeCounts[frontItem.id]}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={animating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-paper-950 font-semibold text-xs hover:bg-amber-400 transition-all disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
