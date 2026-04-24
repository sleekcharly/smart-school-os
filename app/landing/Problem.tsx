'use client';

import { fadeUp, stagger } from '@/lib/motion';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const problems = [
  'Collecting fees manually and losing track of who paid',
  'Sharing results on WhatsApp in scattered screenshots',
  "Parents calling every day asking about their child's progress",
  'Losing student records in notebooks and Excel files',
  'Spending 3 days typing report cards every term',
  'No clear view of school finances at any time',
];

export default function Problem() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3"
          >
            Sound Familiar?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white"
          >
            If your school still struggles with these...
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-2xl p-5"
            >
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5 text-red-500" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {p}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-10"
        >
          <p className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
            Eduvia fixes all of this -{' '}
            <span className="text-green-600">in one platform.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
