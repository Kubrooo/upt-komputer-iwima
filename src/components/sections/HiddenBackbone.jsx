import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../../data/statsData';

/**
 * Komponen HiddenBackbone.
 * Menampilkan alur narasi peran UPT Komputer ("The Story") serta statistik vital
 * infrastruktur jaringan, jam operasional, dan kapasitas komputer.
 */
export default function HiddenBackbone() {
  const steps = [
    { num: '01', title: 'Kendala Mahasiswa', desc: 'Tugas bertumpuk, error instalasi software, atau perangkat pribadi yang terbatas.' },
    { num: '02', title: 'Tuntutan Teknologi', desc: 'Perkuliahan modern membutuhkan tools spesifik yang berat dan presisi.' },
    { num: '03', title: 'Laboratorium Siap', desc: 'Fasilitas kampus harus selalu diuji dan dipastikan dalam kondisi prima 100%.' },
    { num: '04', title: 'Software Berjalan', desc: 'Bantuan instalasi & penanganan error dari staf teknis yang responsif.' },
    { num: '05', title: 'UPT Komputer Hadir', desc: 'Tempat mahasiswa menemukan tempat belajar, konsultasi teknis, dan solusi.', isHighlight: true },
  ];

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-900 border-y border-paper-800 relative overflow-hidden scroll-section">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header: Editorial Documentary Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              <span>Bab 01 — Realita Kampus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-paper-50 font-normal leading-tight">
              Di Balik Layar <br />
              <span className="italic font-serif text-amber-300">Setiap Perjalanan Akademik</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-paper-300 font-sans leading-relaxed text-base sm:text-lg">
            <p className="text-paper-100 font-serif text-xl sm:text-2xl leading-snug border-l-2 border-amber-500/80 pl-5 py-1 italic">
              "Setiap hari di IWIMA, ratusan jam perkuliahan bergantung pada satu hal utama: <span className="text-amber-300 font-normal not-italic">kesiapan teknologi</span>."
            </p>
            <p className="text-sm sm:text-base text-paper-300 leading-relaxed">
              Mulai dari praktikum pemrograman, simulasi bisnis, olah data statistik, hingga penyusunan tugas akhir. UPT Komputer hadir untuk memastikan setiap fasilitas kampus selalu siap mendukung aktivitas akademik mahasiswa.
            </p>
            <p className="text-sm sm:text-base text-paper-300 leading-relaxed">
              Kami bekerja di balik layar memastikan perangkat selalu prima, jaringan internet tetap cepat, dan seluruh software perkuliahan berjalan tanpa hambatan.
            </p>
          </div>
        </motion.div>

        {/* Narrative Flow Grid: Story Progression */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-paper-400 mb-6">
            Alur Perjalanan Akademik & Solusi UPT
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {steps.map((st, idx) => (
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
                className={`p-6 rounded-2xl border space-y-3 relative group transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/25 ${
                  st.isHighlight
                    ? 'bg-amber-950/40 border-amber-500/50 hover:border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-paper-950 border-paper-800 hover:border-amber-400'
                }`}
              >
                <span className={`text-2xl font-serif italic font-bold block transition-transform duration-300 group-hover:scale-110 ${st.isHighlight ? 'text-amber-400' : 'text-amber-400/60'}`}>
                  {st.num}
                </span>
                <h3 className={`font-serif text-lg font-medium transition-colors duration-200 ${st.isHighlight ? 'text-amber-300' : 'text-paper-100 group-hover:text-amber-300'}`}>
                  {st.title}
                </h3>
                <p className={`text-xs leading-relaxed ${st.isHighlight ? 'text-paper-200' : 'text-paper-400 group-hover:text-paper-200'}`}>
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Live Metrics Ticker & Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-paper-950 p-8 sm:p-12 rounded-3xl border border-paper-800/80 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-paper-800 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-mono uppercase tracking-widest text-paper-400">Komitmen Layanan</span>
              <h3 className="text-xl sm:text-2xl font-serif text-paper-50 italic">
                "Cepat, tepat, responsif, dan berorientasi pada kebutuhan civitas akademika."
              </h3>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 350 }}
                  className="space-y-1 p-2 rounded-xl hover:bg-paper-900/50 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-paper-50 font-sans tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs font-medium text-amber-400 font-mono">{item.label}</div>
                  <p className="text-[11px] text-paper-400 leading-normal">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
