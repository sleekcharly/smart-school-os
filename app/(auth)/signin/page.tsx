'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, School, Shield, Users, Zap } from 'lucide-react';

const perks = [
  { icon: School, label: 'Full school management' },
  { icon: Users, label: 'Student & fee tracking' },
  { icon: Zap, label: 'Instant results & reports' },
  { icon: Shield, label: 'Secure & reliable platform' },
];

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);

  // Animate loading dots
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, [loading]);

  // Hadle form submission
  const handleSignIn = () => {
    setLoading(true);
    // firebase login functionality and redirect to /dashboard.
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#070d1a]">
      {/* --- LEFT: Formm Side --- */}
      <div className="relative w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 flex flex-col justify-between p-8 xl:p-12 z-10">
        {/* Subtle left-panel texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#070d1a] to-[#0a1628]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(20,80,200,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(16,120,60,0.12) 0%, transparent 60%)',
          }}
        />

        {/* TOP: Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <Image
              src="/icon_only_white.png"
              alt="Eduvia"
              width={24}
              height={24}
              className="w-10 h-10"
            />
            <span className="font-heading font-extrabold text-xl text-white group-hover:text-green-400 transition-colors">
              Eduvia
            </span>
          </Link>
        </div>

        {/* MIDDLE: Main content */}
        <div className="relative z-10 flex flex-col gap-10">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-green-500/25 text-green-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              School Portal
            </div>
            <h1 className="font-heading font-extrabold text-4xl xl:text-5xl text-white leading-tight mb-3">
              Welcome
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-300">
                back.
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Sign in to your school's Eduvia dashboard - manage students, fees,
              results, more.
            </p>
          </motion.div>

          {/* Sign in button - the main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="group w-full relative overflow-hidden flex items-center justify-between px-6 py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-base shadow-green-500/30 transition-all duration-300 hover:shadow-green-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <LogIn className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">
                    {loading
                      ? `Redirecting${'.'.repeat(dots)}`
                      : 'Sign In to Dashboard'}
                  </div>
                  <div className="text-xs text-white/70 font-normal mt-0.5">
                    Use your school portal credentials
                  </div>
                </div>
              </div>
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 ${loading ? 'animate-puls' : 'group-hover:translate-x-1'}`}
              />
            </button>

            <p className="text-center text-xs text-slate-600 mt-5">
              Secure sign-in powered by Eduvia's authentication system
            </p>
          </motion.div>

          {/* Perks list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-3"
          >
            {perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center flex-shrink-0">
                  <perk.icon className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-xs text-slate-400 leading-tight">
                  {perk.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM */}
        <div className="relative z-10">
          <p className="text-xs text-slate-600 text-center">
            New school?{' '}
            <Link
              href="/signup"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              Register for free →
            </Link>
          </p>
        </div>
      </div>

      {/* ---RIGHT: Full-bleed image--- */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/login_image.png)' }}
        />
        {/* Left fade into dark panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d1a] via-[#070d1a]/20 to-transparent" />
        {/* Bottom text overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a]/80 via-transparent to-transparent" />

        {/* Floating quote card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-10 right-10 max-w-sm"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="text-white/85 text-sm italic leading-relaxed mb-4">
              "The report card feature alone saved us 3 days every term. Our
              parents love being able to check results online."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                EN
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  Mr. Emeka Nwosu
                </p>
                <p className="text-white/45 text-xs">
                  School Owner, Excel Comprehensive, Abuja
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute top-12 right-12 flex flex-col gap-3"
        >
          {[
            ['500+', 'Schools'],
            ['50k+', 'Students'],
            ['99.9%', 'Uptime'],
          ].map(([val, label], i) => (
            <div
              key={i}
              className="bg-black/35 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 text-center min-w-[90px]"
            >
              <p className="font-heading font-extrabold text-xl text-white">
                {val}
              </p>
              <p className="text-white/45 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
