import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility helper untuk menggabungkan class-name Tailwind CSS secara kondisional
 * serta menangani konflik kelas Tailwind secara otomatis.
 *
 * @param {...(string|Object|Array|boolean|undefined|null)} inputs - Variadic argument berisi class CSS
 * @returns {string} String class Tailwind yang sudah digabung & diselesaikan konfliknya
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

