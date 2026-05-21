/**
 * @file lib/motion.ts
 * @description Global Framer Motion animation variants and transition presets
 * used to maintain visual consistency across all landing page sections and UI widgets.
 */

import { Variants } from 'framer-motion';

/**
 * Fade Up Transition Variant.
 * Gradually fades element opacity in and slides it up from `y: 32` to standard position.
 * Best used for header tags, buttons, card entries, and descriptive paragraphs.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/**
 * Stagger Container Transition Variant.
 * Orchestrates sequenced stagger animations for children elements that declare motion variants.
 * Staggers consecutive children items with a dynamic 120ms gap delay.
 */
export const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};


