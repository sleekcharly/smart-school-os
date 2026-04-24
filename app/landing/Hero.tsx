// components/hero.tsx
'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Schools Onboarded' },
  { value: '₦2B+', label: 'Fees Processed' },
  { value: '50k+', label: 'Students Tracked' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2260] via-[#1a3a8f] to-[#0d5c3a]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1800&q=80')] bg-cover bg-center opacity-10" />

      {/* Descriptive blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2260]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* left */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-white"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Built for Nigerian & African Schools
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Run Your School{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Smarter.
            </span>
            <br />
            Not Harder
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg"
          >
            Eduvia helps you manage fees, results, attendance and communication
            without stress.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/">
              <Button
                size="lg"
                className="rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold px-8 h-12 text-base shadow-xl shadow-green-500/30 w-full sm:w-auto"
              >
                Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#how" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 text-white hover:bg-white/10 h-12 text-base w-full sm:w-auto bg-transparent"
              >
                See How It Works <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-white/15"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-2xl text-white">
                  {s.value}
                </p>
                <p className="text-xs text-white/55 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 bg-white/10 rounded-lg px-3 py-1 text-xs text-white/70 font-mono">
                app.eduvia.io
              </div>
            </div>
            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ['👩‍🎓 Students', '1,247', '+12%'],
                ['💰 Fees Collected', '₦4.2M', '+23%'],
                ['📊 Results Entered', '3,841', 'This term'],
                ['📣 Announcements', '8', 'Active'],
              ].map(([label, val, sub]) => (
                <div key={label} className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">{label}</p>
                  <p className="font-heading font-bold text-xl text-white">
                    {val}
                  </p>
                  <p className="text-xs text-green-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
            {/* Mini fee list */}
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-xs text-white/60 font-semibold uppercase tracking-wider mb-3">
                Recent Payments
              </p>
              {[
                ['Chidi Okonkwo', 'JSS 2', '₦45,000', 'Paid'],
                ['Amina Hassan', 'SS 1', '₦60,000', 'Partial'],
                ['Tunde Adeyemi', 'Primary 5', '₦30,000', 'Paid'],
              ].map(([name, cls, amt, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-white/50">{cls}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{amt}</p>
                    <span
                      className={`text-xs font-medium ${status === 'Paid' ? 'text-green-400' : 'text-amber-400'}`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
    </section>
  );
}
