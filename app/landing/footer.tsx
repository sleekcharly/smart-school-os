'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/icon_only_white.png"
                alt="Eduvia"
                className="w-9 h-9 md:w-16 md:h-16 rounded-xl"
                width={39}
                height={39}
              />
              <span className="font-heading font-bold text-xl text-white">
                Eduvia
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Smart school operating system for Nigerian and African schools.
            </p>
            <p className="text-sm mt-3 text-green-500 font-medium">eduvia.io</p>
          </div>
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press'],
            },
            {
              title: 'Support',
              links: ['Help Center', 'Contact', 'Status', 'Privacy Policy'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(' ', '')}`}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 Eduvia. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
