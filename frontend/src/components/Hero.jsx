'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Download, ArrowDown } from 'lucide-react';

const ROLES = ['Software Developer', 'Data Analyst', 'Strathmore Tennis Captain'];

function MagneticButton({ children, className, href, onClick, testId }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 22 });
  const springY = useSpring(y, { stiffness: 200, damping: 22 });

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
    className,
    'data-testid': testId,
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-10 overflow-hidden flex justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block font-syne font-bold text-2xl sm:text-3xl text-gold-gradient"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,215,0,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-16">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gold-border text-xs text-gray-300 mb-10 font-inter"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for Work, Internships and Projects
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-4"
        >
          Ethan{' '}
          <span className="text-gold-gradient">Bwibo</span>
        </motion.h1>

        {/* Role Cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <RoleCycler />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-inter"
        >
          Building impactful tech solutions through code, design, and data.
          Final year ICS student at Strathmore University, Nairobi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 gold-gradient text-black font-syne font-bold text-sm rounded-xl hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-shadow"
            testId="view-work-btn"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            href="/media/Ethan_Bwibo_CV_2026.pdf"
            className="flex items-center gap-2 px-8 py-4 glass gold-border text-gold font-syne font-semibold text-sm rounded-xl hover:bg-gold/5 transition-colors"
            testId="download-cv-btn"
          >
            <Download size={15} />
            Download CV
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-20 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-inter">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
