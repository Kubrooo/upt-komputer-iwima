import React from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-paper-950 text-paper-100 border-t border-paper-800 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative scroll-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission Statement (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/Logo UPT.png"
                alt="Logo UPT Komputer IWIMA"
                className="h-12 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic font-bold tracking-tight text-xl text-paper-50">
                    UPT Komputer
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    IWIMA
                  </span>
                </div>
                <span className="text-xs text-paper-300 font-sans">
                  Institut Widya Pratama Pekalongan
                </span>
              </div>
            </div>

            <p className="text-sm font-sans text-paper-300 leading-relaxed max-w-md">
              Unit Pelayanan Teknis yang mendukung kegiatan akademik melalui fasilitas laboratorium komputer modern dan bantuan teknis responsif untuk seluruh mahasiswa.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Status Sistem: Operasional & Siap Melayani</span>
            </div>
          </div>

          {/* Quick Navigation Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">Navigasi Utama</h4>
            <ul className="space-y-2.5 text-xs font-mono text-paper-300">
              <li>
                <a href="#story" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Kisah & Realita Kampus</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Layanan Laboratorium & Software</span>
                </a>
              </li>
              <li>
                <a href="#labs" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Spesifikasi Perangkat Lab</span>
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Form Bantuan Teknis Mahasiswa</span>
                </a>
              </li>
              <li>
                <a href="#documentation" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Dokumentasi Kegiatan Fasilitas</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-paper-50 transition-colors flex items-center gap-1.5">
                  <span>› Pertanyaan Umum (FAQ)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">Kontak & Jam Operasional</h4>
            
            <div className="space-y-3 text-xs font-sans text-paper-300">
              <div className="flex items-start gap-3 bg-paper-900 p-3 rounded-xl border border-paper-800">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Ruang UPT, Kampus Institut Widya Pratama (IWIMA), Kota Pekalongan, Jawa Tengah</span>
              </div>

              <div className="flex items-center gap-3 bg-paper-900 p-3 rounded-xl border border-paper-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Senin – Sabtu (08.00 – 16.00 WIB)</span>
              </div>

              <div className="flex items-center gap-3 bg-paper-900 p-3 rounded-xl border border-paper-800">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>uptkomputer@widyapratama.ac.id</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
