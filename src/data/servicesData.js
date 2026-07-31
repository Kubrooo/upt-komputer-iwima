import { Monitor, Wrench, ShieldCheck } from 'lucide-react';

/**
 * Data Katalog Layanan Utama UPT Komputer IWIMA.
 * Digunakan oleh komponen FeaturedServices.jsx untuk merender kartu & detail spesifikasi layanan.
 *
 * @type {Array<Object>}
 */
export const services = [
  {
    id: 'lab-komputer',
    number: '01',
    title: 'Laboratorium Komputer Utama',
    tagline: 'Performa & Kecepatan Tinggi',
    category: 'Infrastruktur Utama',
    description: 'Laboratorium berkapasitas besar dengan 50 PC Praktikan + 1 Master Console Dosen dan internet berkecepatan tinggi untuk mendukung praktikum, riset, dan pengembangan proyek mahasiswa.',
    icon: Monitor,
    highlights: [
      '50 Workstation Praktikan + 1 Master Console Dosen',
      'Internet Dedicated Fibre Optic 100Mbps+',
      'Mendukung Praktikum Pemrograman, Akuntansi, & Statistik',
      'Prosesor Kinerja Tinggi untuk Rendering & Analisis Data'
    ],
    interactiveDemo: {
      type: 'hardware-specs',
      label: 'Spesifikasi Unit Komputer',
      details: [
        { title: 'Prosesor', val: 'Intel Core i5 / High Performance Multi-Thread' },
        { title: 'Memory (RAM)', val: '16GB DDR4 High Speed' },
        { title: 'Storage', val: '512GB NVMe SSD Ultra-Fast Read/Write' },
        { title: 'Displays', val: '24" Full HD Eye-Care IPS Monitor' }
      ]
    }
  },
  {
    id: 'software-support',
    number: '02',
    title: 'Software & Hardware Support',
    tagline: 'Pendampingan Teknis Mahasiswa',
    category: 'Layanan Bantuan',
    description: 'Mulai dari instalasi software perkuliahan, penanganan error, hingga konsultasi teknis agar proses belajar tidak terhambat.',
    icon: Wrench,
    highlights: [
      'Bantuan Instalasi Software Perkuliahan Resmi',
      'Troubleshooting Error & Penanganan Kendala Laptop',
      'Bimbingan Teknis Penggunaan Tools Laboratorium',
      'Konsultasi Teknis Bebas Birokrasi untuk Mahasiswa'
    ],
    interactiveDemo: {
      type: 'software-catalog',
      label: 'Katalog Software Didukung',
      details: [
        { title: 'Pemrograman', val: 'NetBeans, VS Code, Python, JDK, MySQL' },
        { title: 'Statistik & Bisnis', val: 'SPSS, Microsoft Office Suite, EViews' },
        { title: 'Desain & Grafis', val: 'CorelDRAW, Adobe Photoshop, Figma' },
        { title: 'Sistem Operasi', val: 'Windows 11 Pro Enterprise & Linux Ubuntu' }
      ]
    }
  }
];
