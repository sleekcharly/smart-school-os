/**
 * @file lib/utils.ts
 * @description Standard utility helpers. Exposes common layout and layout calculation utils.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility helper to conditionally join and merge CSS Tailwind classnames.
 * Resolves CSS specification order overrides automatically (preventing Tailwind duplicates/conflicts).
 * 
 * @param inputs - List of class lists, string interpolation templates, or boolean checks
 * @returns consolidated clean CSS class name string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

