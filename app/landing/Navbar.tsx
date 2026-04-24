// components/navbar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' : 'bg-transparet'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {scrolled ? (
            <Image
              src="/icon_only_logo.png"
              alt="Eduvia"
              className="w-9 h-9 md:w-12 md:h-12 rounded-xl"
              width={39}
              height={39}
            />
          ) : (
            <Image
              src="/icon_only_white.png"
              alt="Eduvia"
              className="w-9 h-9 md:w-16 md:h-16 rounded-xl"
              width={39}
              height={39}
            />
          )}

          <div
            className={`text-xl font-heading font-bold ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
          >
            Edu<span className="text-[#10b981]">via</span>
          </div>
        </div>
        <div
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}
        >
          <a
            href="#features"
            className={`transition-colors ${scrolled ? 'hover:text-gray-900 dark:hover:text-white' : 'hover:text-white'}`}
          >
            Features
          </a>
          <a
            href="#how"
            className={`transition-colors ${scrolled ? 'hover:text-gray-900 dark:hover:text-white' : 'hover:text-white'}`}
          >
            How it works
          </a>
          <a
            href="#pricing"
            className={`transition-colors ${scrolled ? 'hover:text-gray-900 dark:hover:text-white' : 'hover:text-white'}`}
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className={`transition-colors ${scrolled ? 'hover:text-gray-900 dark:hover:text-white' : 'hover:text-white'}`}
          >
            Testimonials
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className={`rounded-xl text-sm font-medium ${scrolled ? '' : 'text-white hover:bg-white/15 hover:text-white'}`}
            >
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              className={`rounded-xl text-sm font-medium px-5 ${scrolled ? 'bg-[#1a3a8f] hover:bg-[#142d73] text-white' : 'bg-white text-[#1a3a8f] hover:bg-white/90'}`}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
        <button
          className={`md:hidden p-2 rounded-xl ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-3">
          {['Features', 'How it works', 'Pricing', 'Reviews'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link href="/" className="block">
            <Button className="w-full rounded-xl mt-2 bg-[#1a3a8f] hover:bg-[#142d73] text-white">
              Get Started Free
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
