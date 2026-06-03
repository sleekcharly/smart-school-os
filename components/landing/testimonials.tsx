'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mrs. Chioma Okafor',
    role: 'Head Teacher, Greenfield Academy, Lagos',
    text: 'Rektora completely transformed how we manage our school. Fee collection used to be a nightmare — now it takes minutes. Our parents love the portal.',
    rating: 5,
    avatar: 'CO',
  },
  {
    name: 'Mr. Emeka Nwosu',
    role: 'School Owner, Excel Comprehensive, Abuja',
    text: 'We went from Excel sheets and WhatsApp groups to a fully digital operation in one week. The report card feature alone saved us 3 days every term.',
    rating: 5,
    avatar: 'EN',
  },
  {
    name: 'Mrs. Fatima Bello',
    role: 'Principal, Al-Noor International School, Kano',
    text: "The parent portal is a game changer. Parents can see their children's results and fees without calling the school. Less stress for everyone.",
    rating: 5,
    avatar: 'FB',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900">
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
            Real Schools, Real Results
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white"
          >
            Trusted by school leaders across Nigeria
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white dark:bg-gray-800 rounded-3xl p-7 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a3a8f] to-[#0d5c3a] flex items-center justify-center text-white font-heading font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
