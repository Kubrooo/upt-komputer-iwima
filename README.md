# Dokumentasi Sistem & Portal Web UPT Komputer IWIMA

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Framer_Motion](https://img.shields.io/badge/Framer_Motion-11.11-ff0055?style=flat-square&logo=framer)

Selamat datang di repositori resmi **Portal Web UPT Komputer IWIMA** (Unit Pelaksana Teknis Komputer Institut Widyagama Malang). Portal ini dirancang dengan estetika editorial modern (*Editorial Dark Mode*) untuk memberikan informasi lengkap, layanan laboratorium, ticketing bantuan akademik, galeri kegiatan, serta akses pencarian cepat bagi civitas akademika.

---

## Daftar Isi

1. [Gambaran Umum](#-gambaran-umum)
2. [Fitur Utama](#-fitur-utama)
3. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
4. [Struktur Proyek](#-struktur-proyek)
5. [Panduan Instalasi & Penggunaan](#-panduan-instalasi--penggunaan)
6. [Struktur Data & Kustomisasi](#-struktur-data--kustomisasi)
7. [Dokumentasi Komponen Utama](#-dokumentasi-komponen-utama)
8. [Deployment](#-deployment)

---

## Gambaran Umum

UPT Komputer IWIMA berperan sebagai tulang punggung infrastruktur teknologi informasi dan komputasi di lingkungan kampus. Web portal ini berfungsi sebagai pintu gerbang utama bagi mahasiswa, dosen, dan staf untuk:
- Mengakses informasi fasilitas & spesifikasi Laboratorium Komputer.
- Mengajukan tiket bantuan akademik (*Academic Support Ticket*) untuk penanganan kendala sistem/portal/software.
- Mengakses katalog software resmi yang didukung.
- Mencari informasi cepat menggunakan fitur **Quick Search Palette** (Shortcut `Ctrl + K`).
- Mempelajari FAQ & panduan operasional laboratorium.

---

## Fitur Utama

| Fitur | Deskripsi | Komponen Terkait |
| :--- | :--- | :--- |
| **Hero Section** | Area selamat datang dengan status operasional real-time, statistik singkat, dan Tombol Pintas Tiket / Lab. | [Hero.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/Hero.jsx) |
| **Hidden Backbone** | Menampilkan statistik vital infrastruktur UPT Komputer (workstation, bandwidth, server uptime). | [HiddenBackbone.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/HiddenBackbone.jsx) |
| **Why UPT Exists** | Menjelaskan filosofi dan peran UPT Komputer dalam mendukung perkuliahan dan riset. | [WhyUPTExists.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/WhyUPTExists.jsx) |
| **Featured Services** | Katalog interaktif layanan lab & dukungan teknis lengkap dengan modal detail spesifikasi/software. | [FeaturedServices.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/FeaturedServices.jsx) |
| **Interactive Lab Explorer** | Virtual tour / filter interaktif ruangan laboratorium komputer beserta jadwal & fasilitasnya. | [LabExplorer.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/LabExplorer.jsx) |
| **Academic Support Ticket** | Formulir pengajuan tiket bantuan teknis (lupa password, kendala software, dll.) dengan generator kode tiket & efek selebrasi. | [AcademicSupportTicket.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/AcademicSupportTicket.jsx) |
| **Documentation Gallery** | Galeri foto kegiatan praktikum, pelatihan, dan maintenance fasilitas UPT Komputer. | [DocumentationGallery.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/DocumentationGallery.jsx) |
| **UPT Dump** | Koleksi foto candid polaroid & momen behind-the-scenes aktivitas harian UPT Komputer beserta fitur Like interaktif. | [UPTDump.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/UPTDump.jsx) |
| **Editorial FAQ** | Daftar pertanyaan umum berbasis kategori dengan fitur akordeon interaktif. | [EditorialFAQ.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/EditorialFAQ.jsx) |
| **Quick Search Modal** | Command Palette / Palette Pencarian Serbaguna yang dapat dipanggil via tombol navbar atau shortcut `Ctrl + K`. | [QuickSearchModal.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/modals/QuickSearchModal.jsx) |

---

## Teknologi yang Digunakan

- **Core Framework**: [React 18](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan skema warna *Custom Paper Dark Mode* (`paper-950`, `paper-900`, `amber-400`, dll.)
- **Animasi & Transisi**: [Framer Motion](https://www.framer.com/motion/)
- **Icon Pack**: [Lucide React](https://lucide.dev/)
- **Interaktivitas Visual**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Utility CSS**: [clsx](https://www.npmjs.com/package/clsx) & [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)

---

## Struktur Proyek

```text
upt_komputer_iwima/
├── public/                 # Asset statis publik
├── src/
│   ├── components/         # Komponen React modular
│   │   ├── common/         # Komponen reusabel (misal: SectionHeader)
│   │   │   └── SectionHeader.jsx
│   │   ├── layout/         # Komponen tata letak (Navbar & Footer)
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── modals/         # Komponen dialog & modal
│   │   │   └── QuickSearchModal.jsx
│   │   └── sections/       # Komponen bagian-bagian utama halaman
│   │       ├── Hero.jsx
│   │       ├── HiddenBackbone.jsx
│   │       ├── WhyUPTExists.jsx
│   │       ├── FeaturedServices.jsx
│   │       ├── LabExplorer.jsx
│   │       ├── AcademicSupportTicket.jsx
│   │       ├── DocumentationGallery.jsx
│   │       └── EditorialFAQ.jsx
│   ├── data/               # Sumber data statis terpisah (JSON/JS Objects)
│   │   ├── faqsData.js
│   │   ├── galleryData.js
│   │   ├── labExplorerData.js
│   │   ├── searchData.js
│   │   ├── servicesData.js
│   │   ├── statsData.js
│   │   └── supportData.js
│   ├── utils/              # Helper & utility functions
│   │   └── cn.js           # Function penanganan conditional Tailwind classes
│   ├── App.jsx             # Komponen utama penataan layout & state global modal
│   ├── main.jsx            # Entry point aplikasi React
│   └── index.css           # Konfigurasi Tailwind directives & font kustom
├── index.html              # Template HTML utama
├── package.json            # Daftar dependensi & npm scripts
├── postcss.config.js       # Konfigurasi PostCSS untuk Tailwind CSS
├── tailwind.config.js      # Custom theme, font, & warna Tailwind
├── vercel.json             # Konfigurasi deployment Vercel
└── vite.config.js          # Konfigurasi bundler Vite
```

---

## Panduan Instalasi & Penggunaan

### Prasyarat System
Pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (versi **18.x** atau lebih baru disarankan)
- [npm](https://www.npmjs.com/) (versi **9.x** atau lebih baru)

### Langkah-Langkah

1. **Buka Terminal / PowerShell** di direktori proyek:
   ```bash
   cd upt_komputer_iwima
   ```

2. **Instal Seluruh Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di `http://localhost:5173`.

4. **Kompilasi Production Build**:
   ```bash
   npm run build
   ```
   Hasil kompilasi siap rilis akan disimpan dalam direktori `/dist`.

5. **Preview Hasil Production Build**:
   ```bash
   npm run preview
   ```

---

## Struktur Data & Kustomisasi

Untuk mempermudah pemeliharaan tanpa mengubah kode UI, semua konten web dipisahkan di direktori `src/data/`:

1. **`servicesData.js`**  
   Menyimpan daftar layanan utama UPT Komputer beserta highlight dan rincian spesifikasi teknis / katalog software.

2. **`labExplorerData.js`**  
   Menyimpan daftar unit laboratorium komputer, kapasitas, spesifikasi hardware, jam operasional, dan status ketersediaan.

3. **`faqsData.js`**  
   Menyimpan kategori FAQ (Umum, Laboratorium, Akun & Software, Ticketing) beserta pertanyaan dan jawabannya.

4. **`galleryData.js`**  
   Menyimpan item foto dokumentasi kegiatan laboratorium, caption, tanggal, dan kategori.

5. **`searchData.js`**  
   Menyimpan indeks pencarian cepat untuk modal command palette (`Ctrl + K`).

6. **`supportData.js` & `statsData.js`**  
   Menyimpan data kategori tiket dukungan dan metrik statistik vital UPT Komputer.

---

## Dokumentasi Komponen Utama

### `App.jsx`
[src/App.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/App.jsx)  
Merupakan komponen induk (*root*) yang menyusun seluruh bagian halaman dari [Navbar](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/layout/Navbar.jsx) hingga [Footer](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/layout/Footer.jsx), serta mengelola state keterbukaan modal `QuickSearchModal` (`searchOpen`).

### `AcademicSupportTicket.jsx`
[src/components/sections/AcademicSupportTicket.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/sections/AcademicSupportTicket.jsx)  
Mengelola alur pengajuan tiket akademik mahasiswa/dosen. Menyediakan validator input, pembuat nomor tiket otomatis (format: `TKT-YYYYMMDD-XXXX`), salin kode tiket, dan pemicu efek kembang api (`canvas-confetti`).

### `QuickSearchModal.jsx`
[src/components/modals/QuickSearchModal.jsx](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/components/modals/QuickSearchModal.jsx)  
Menyediakan fitur pencarian instan berbasis keyboard shortcut (`Ctrl + K` / `Cmd + K`). Menyaring data dari `searchData.js` secara otomatis sesuai kata kunci pengguna.

### `cn.js`
[src/utils/cn.js](file:///c:/Users/Ardiansyah/Documents/upt_komputer_iwima/src/utils/cn.js)  
Menggabungkan class Tailwind secara dinamis dengan mengombinasikan `clsx` dan `tailwind-merge` untuk menghindari pembentrokan class CSS.

---

## Deployment

Repositori ini sudah dilengkapi konfigurasi `vercel.json` untuk kemudahan penggelaran (*deployment*) di platform **Vercel** atau platform hosting statis lainnya (Netlify, GitHub Pages, Cloudflare Pages).

Command Build Vercel:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

*Dikembangkan untuk UPT Komputer IWIMA - Universitas / Institut Widyagama Malang.*
