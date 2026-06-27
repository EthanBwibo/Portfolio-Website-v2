'use client';

import { Linkedin, Github, Mail } from 'lucide-react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#life', label: 'Life & Live' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-syne font-extrabold text-2xl text-gold-gradient mb-2">Ethan Bwibo</p>
            <p className="text-gray-500 text-sm">Software Developer · Data Analyst</p>
            <p className="text-gray-600 text-xs mt-1">Nairobi, Kenya</p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-inter">Explore</p>
            <div className="space-y-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-gray-400 text-sm hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-inter">Contact</p>
            <div className="space-y-2">
              <a
                href="mailto:enbwibo@gmail.com"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-gold transition-colors"
              >
                <Mail size={13} />
                enbwibo@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/ethan-bwibo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-gold transition-colors"
              >
                <Linkedin size={13} />
                in/ethan-bwibo
              </a>
              <a
                href="https://github.com/EthanBwibo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-gold transition-colors"
              >
                <Github size={13} />
                EthanBwibo
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Ethan Bwibo. All rights reserved.</p>
          <p className="text-gray-700 text-xs">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
