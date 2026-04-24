// components/magnetic-button.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticButton({ children }: any) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: any) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

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
