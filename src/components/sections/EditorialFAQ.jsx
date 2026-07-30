import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { faqs } from '../../data/faqsData';

export default function EditorialFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-900 border-b border-paper-800 relative overflow-hidden scroll-section">
      <div className="max-w-5xl mx-auto space-y-16">
        
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

        {/* Editorial Accordion */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`bg-paper-950 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-amber-500/60 shadow-xl shadow-amber-500/5' : 'border-paper-800/90 hover:border-amber-500/30'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      0{index + 1}
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
                      className="px-6 pb-6 pt-0 text-sm font-sans text-paper-300 leading-relaxed border-t border-paper-900 overflow-hidden"
                    >
                      <p className="pt-4 border-l-2 border-amber-500/40 pl-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

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
