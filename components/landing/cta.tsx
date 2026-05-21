'use client';

import { Button } from '@/components/ui/button';
import { fadeUp, stagger } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0d2260] via-[#1a3a8f] to-[#0d5c3a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1800&q=80')] bg-cover bg-center opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white"
      >
        <motion.h2
          variants={fadeUp}
          className="font-heading font-extrabold text-4xl sm:text-5xl mb-6 leading-tight"
        >
          Your school deserves better
          <br />
          than notebooks and WhatsApp.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
        >
          Join hundreds of schools across Nigeria already running smarter with
          Eduvia. Set up takes less than 10 minutes.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold px-10 h-12 text-base shadow-xl shadow-green-500/30 cursor-pointer"
            >
              Start Free Trial — No Card Needed{' '}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href="mailto:hello@eduvia.io">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/30 text-white hover:bg-white/10 h-13 text-base bg-transparent cursor-pointer"
            >
              Talk to Us
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
