// components/pricing.tsx
'use client';

import { Button } from '@/components/ui/button';
import { fadeUp, stagger } from '@/lib/motion';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '₦40,000',
    period: '/month',
    desc: 'Perfect for small schools up to 200 students',
    features: [
      'Up to 200 students',
      'Fee management',
      'Results & report cards',
      'Parent portal',
      'Email support',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₦75,000',
    period: '/month',
    desc: 'For growing schools that need more power',
    features: [
      'Up to 800 students',
      'Everything in Starter',
      'SMS notifications',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For school groups and large institutions',
    features: [
      'Unlimited students',
      'Everything in Growth',
      'Multi-branch support',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            Simple Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4"
          >
            Affordable for every school
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-gray-400 text-lg"
          >
            No hidden fees. Cancel anytime. Start free.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`rounded-3xl p-8 flex flex-col border transition-all duration-300 hover:shadow-xl ${plan.highlight ? 'bg-gradient-to-br from-[#1a3a8f] to-[#0d5c3a] border-transparent text-white scale-105 shadow-2xl shadow-blue-500/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
            >
              {plan.highlight && (
                <span className="inline-block bg-green-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                  Most Popular
                </span>
              )}
              <h3
                className={`font-heading font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-5 ${plan.highlight ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {plan.desc}
              </p>
              <div className="mb-6">
                <span
                  className={`font-heading font-extrabold text-4xl ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${plan.highlight ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-green-400' : 'text-green-500'}`}
                    />
                    <span
                      className={
                        plan.highlight
                          ? 'text-white/85'
                          : 'text-gray-700 dark:text-gray-300'
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href={plan.price === 'Custom' ? '/dashboard' : '/signup'}>
                <Button
                  className={`w-full rounded-xl h-11 font-semibold cursor-pointer ${plan.highlight ? 'bg-white text-[#1a3a8f] hover:bg-gray-100' : 'bg-[#1a3a8f] hover:bg-[#142d73] text-white'}`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
