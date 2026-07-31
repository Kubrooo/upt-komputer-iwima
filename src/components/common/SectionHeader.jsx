import React from 'react';

/**
 * Komponen reusabel untuk header setiap bagian (section) halaman.
 *
 * @param {Object} props - Props komponen
 * @param {string} [props.badge] - Teks badge kecil di atas judul (misal: "FAQS", "SERVICES")
 * @param {string} props.title - Judul utama section
 * @param {string} [props.highlight] - Teks judul yang di-highlight (italic & berpendar)
 * @param {string} [props.subtitle] - Deskripsi singkat di bawah judul
 * @param {string} [props.className] - Kelas CSS tambahan
 */
export default function SectionHeader({ badge, title, highlight, subtitle, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl font-serif font-normal text-paper-50 leading-tight">
        {title} <br />
        {highlight && <span className="italic text-amber-300">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-sm font-sans text-paper-300 max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}
