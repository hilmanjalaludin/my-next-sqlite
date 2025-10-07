import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Menggabungkan class Tailwind secara aman.
 * Mirip seperti classnames() tapi lebih aman untuk Tailwind.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
