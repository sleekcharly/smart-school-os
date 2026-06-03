'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import {
  BarChart3,
  CreditCard,
  FileText,
  GraduationCap,
  Megaphone,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Student Management',
    desc: 'Never lose track of any student again. From admission to graduation, everything stays organized in one place.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: CreditCard,
    title: 'Fee Collection',
    desc: 'Stop chasing fees. Send invoices and get payments automatically.',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: FileText,
    title: 'Results & Report Cards',
    desc: 'Enter scores, auto-calculate grades, and produce beautiful PDF report cards.',
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    icon: Megaphone,
    title: 'Announcements',
    desc: 'Communicate with parents, teachers, and students via targeted announcements.',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: GraduationCap,
    title: 'Parent Portal',
    desc: 'Parents check results, fees, and school updates anytime, from any device.',
    color: 'bg-rose-500/10 text-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Admin Dashboard',
    desc: 'Real-time analytics on enrollment, fee collection, and school performance.',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            Everything You Need
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4"
          >
            One platform. Every School operation.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            No more switching between apps, spreadsheets, and WhatsApp. Rektora
            brings everything under one roof.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white dark:bg-gray-800 rounded-3xl p-7 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${f.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
