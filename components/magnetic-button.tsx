/**
 * @file components/magnetic-button.tsx
 * @description MagneticButton component. Uses Framer Motion and mouse-coordinate physics 
 * to create a premium, interactive hover effect that gently pulls the button towards the user's cursor.
 */

'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

/**
 * MagneticButton Component.
 * Implements a dynamic magnetic pull micro-interaction.
 * Calculates cursor distance from button center and applies translating styles.
 * 
 * @param children - Button contents (text, icons, components)
 */
export default function MagneticButton({ children }: any) {
  // DOM reference to target the HTML button element
  const ref = useRef<HTMLButtonElement>(null);

  /**
   * handleMouseMove Event Listener.
   * Tracks cursor position inside the button footprint.
   * 
   * Math:
   * 1. Get the viewport-relative bounding rectangle of the button.
   * 2. Find cursor relative X and Y positions within the button.
   * 3. Subtract half of width/height to get coordinates relative to the button's CENTER (0,0).
   * 4. Multiply by 0.2 damping factor to slide the button by 20% of the relative cursor distance.
   */
  const handleMouseMove = (e: any) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply the translation transformation smoothly
    ref.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  /**
   * reset Event Listener.
   * Clears translations to return the button back to its origin when the cursor exits.
   */
  const reset = () => {
    ref.current!.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="bg-secondary text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition"
    >
      {children}
    </motion.button>
  );
}

