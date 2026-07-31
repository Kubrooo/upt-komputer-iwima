import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, Laptop, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportIssues } from '../../data/supportData';
import SectionHeader from '../common/SectionHeader';

/**
 * Komponen AcademicSupportTicket.
 * Menangani formulir pengajuan tiket bantuan teknis akademik (lupa password, kendala software, dll.)
 * serta membuat struk tiket otomatis dan memicu efek selebrasi kembang api.
 */
export default function AcademicSupportTicket() {
  const [issueType, setIssueType] = useState('instalasi');
  const [studentName, setStudentName] = useState('');
  const [studentProdi, setStudentProdi] = useState('');
  const [issueDetail, setIssueDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentIssue = supportIssues.find((i) => i.id === issueType);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="support" className="py-24 px-4 sm:px-6 lg:px-8 bg-paper-900 border-b border-paper-800 relative overflow-hidden scroll-section">
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
            badge="Bab 05 — Dukungan Akademik"
            title="Punya Kendala Teknis?"
            highlight="Kami Siap Membantu Tanpa Birokrasi"
            subtitle="Mahasiswa IWIMA dapat mengajukan permohonan bantuan instalasi software, konsultasi error, hingga penggunaan lab mandiri secara mudah."
          />
        </motion.div>

        {/* Support Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Select Issue & Quick Guide */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono text-paper-400 uppercase tracking-widest block">
                  Pilih Jenis Kendala / Layanan:
                </span>
                <span className="text-[11px] font-mono text-amber-400">3 Opsi Bantuan</span>
              </div>

              <div className="space-y-3">
                {supportIssues.map((item) => {
                  const isSelected = item.id === issueType;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIssueType(item.id);
                        setSubmitted(false);
                      }}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-2 ${isSelected
                          ? 'bg-paper-950 border-amber-500/80 ring-1 ring-amber-500/50 shadow-xl'
                          : 'bg-paper-950/60 border-paper-800 hover:border-paper-700'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-medium text-paper-100">{item.title}</h3>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          {item.timeEst}
                        </span>
                      </div>
                      <p className="text-xs text-paper-300 font-sans">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Steps Guide Box */}
            {currentIssue && (
              <div className="bg-paper-950 p-6 rounded-2xl border border-paper-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Terminal className="w-4 h-4" />
                  <span>Langkah Penanganan "{currentIssue.title}":</span>
                </div>
                <div className="space-y-2.5">
                  {currentIssue.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-paper-300 font-sans">
                      <span className="w-5 h-5 rounded-full bg-paper-800 text-amber-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Support Request Form Simulation */}
          <div className="lg:col-span-6 bg-paper-950 rounded-3xl p-8 sm:p-10 border border-paper-800 shadow-2xl relative flex flex-col justify-between h-full">
            <div className="space-y-6">

              <div className="space-y-2 border-b border-paper-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Laptop className="w-4 h-4" />
                  <span>Form Tiket Bantuan Teknis UPT</span>
                </div>
                <h3 className="text-xl font-serif text-paper-50 font-medium">
                  Kirim Pesan atau Janji Temu Staf
                </h3>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-serif text-paper-50">Tiket Bantuan Berhasil Dibuat!</h4>
                  <p className="text-xs text-paper-300 font-sans max-w-md mx-auto">
                    Terima kasih <strong className="text-paper-100">{studentName}</strong> ({studentProdi}). Tim UPT Komputer IWIMA telah menerima permintaan untuk <span className="text-amber-400 font-medium">{currentIssue.title}</span>.
                  </p>
                  <p className="text-xs font-mono text-paper-400">
                    Silakan langsung menuju ke Ruang UPT Komputer IWIMA pada jam operasional.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStudentName('');
                      setStudentProdi('');
                      setIssueDetail('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-paper-900 border border-paper-700 text-xs font-mono text-amber-400 hover:bg-paper-800 transition-colors"
                  >
                    Buat Permohonan Lain
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-paper-300 block">Nama Lengkap & NIM</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ardiansyah (20240199)"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-paper-900 border border-paper-800 text-xs text-paper-100 placeholder-paper-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-paper-300 block">Program Studi / Jurusan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Sistem Informasi / Akuntansi / Manajemen"
                      value={studentProdi}
                      onChange={(e) => setStudentProdi(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-paper-900 border border-paper-800 text-xs text-paper-100 placeholder-paper-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-paper-300 block">Detail Kendala atau Catatan Tambahan</label>
                    <textarea
                      rows="3"
                      placeholder="Jelaskan secara singkat kendala software atau jadwal kunjungan yang diinginkan..."
                      value={issueDetail}
                      onChange={(e) => setIssueDetail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-paper-900 border border-paper-800 text-xs text-paper-100 placeholder-paper-400 focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-paper-950 font-bold text-xs uppercase tracking-wider font-mono transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Permohonan Tiket Bantuan</span>
                  </button>

                  <p className="text-[11px] text-paper-400 font-mono text-center">
                    Layanan UPT Komputer 100% Bebas Biaya untuk Seluruh Mahasiswa IWIMA
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
