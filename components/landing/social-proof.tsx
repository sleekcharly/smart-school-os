'use client';

import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/motion';

const stats = [
  { value: '500+', label: 'Schools Onboarded' },
  { value: '₦2B+', label: 'Fees Processed' },
  { value: '50k+', label: 'Students Tracked' },
  { value: '99.9%', label: 'Uptime' },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0d2260] to-[#0d5c3a]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <p className="font-heading font-extrabold text-4xl">{s.value}</p>
              <p className="text-white/60 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
