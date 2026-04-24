'use client';

import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/motion';
import { School, Users, Zap } from 'lucide-react';
export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3"
          >
            Simple Setup
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white"
          >
            Up and running in 3 steps
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              step: '01',
              title: 'Create your school',
              desc: 'Set up your school profile, add classes, subjects, and your session calendar in minutes.',
              icon: School,
            },
            {
              step: '02',
              title: 'Enrol your students',
              desc: 'Import or manually add students with their parent contact details and class assignments.',
              icon: Users,
            },
            {
              step: '03',
              title: 'Start operating',
              desc: 'Collect fees, enter results, send announcements, and let parents access the portal immediately.',
              icon: Zap,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#1a3a8f] to-[#0d5c3a] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                <s.icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 -translate-x-8 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
