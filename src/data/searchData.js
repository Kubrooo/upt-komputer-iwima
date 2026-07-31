import { Monitor, Wrench, FileText, PhoneCall, HelpCircle } from 'lucide-react';

/**
 * Data Indeks Pencarian Cepat (Quick Search Palette / Ctrl+K).
 * Digunakan oleh komponen QuickSearchModal.jsx untuk menyaring item pencarian instan.
 *
 * @type {Array<{title: string, category: string, icon: React.ComponentType, href: string, desc: string}>}
 */
export const searchItems = [
  { title: 'Laboratorium Komputer Utama', category: 'Fasilitas', icon: Monitor, href: '#labs', desc: '50 Workstation Praktikan + 1 Master Console Dosen, internet dedicated, praktikum pemrograman' },
  { title: 'Bantuan Instalasi Software', category: 'Layanan', icon: Wrench, href: '#support', desc: 'SPSS, NetBeans, CorelDRAW, VS Code, & software matkul gratis' },
  { title: 'Penanganan Error & Trouble Laptop', category: 'Layanan', icon: Wrench, href: '#support', desc: 'Konsultasi staf UPT Komputer untuk mahasiswa hang/error' },
  { title: 'Pengajuan Pinjam Lab Mandiri', category: 'Layanan', icon: FileText, href: '#support', desc: 'Pinjam PC lab di luar jam praktikum untuk riset & tugas kelompok' },
  { title: 'Tata Tertib & Akses Mahasiswa', category: 'Informasi', icon: HelpCircle, href: '#faq', desc: 'Syarat KTM aktif, jam operasional lab' },
  { title: 'Kontak Staf Teknis UPT', category: 'Kontak', icon: PhoneCall, href: '#footer', desc: 'Lokasi Ruang UPT, Jam operasional Senin-Sabtu 08.00-16.00' },
];
