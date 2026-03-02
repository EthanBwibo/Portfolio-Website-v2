'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X } from 'lucide-react';

export default function HireMeBadge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 10000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const handleHireClick = () => {
    setVisible(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-2"
          data-testid="hire-me-badge"
        >
          <motion.button
            onClick={handleHireClick}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            data-testid="hire-me-btn"
            className="flex items-center gap-2 px-5 py-3 gold-gradient text-black font-syne font-bold text-sm rounded-full shadow-[0_0_30px_rgba(255,215,0,0.35)] hover:shadow-[0_0_45px_rgba(255,215,0,0.5)] transition-shadow"
          >
            <Briefcase size={15} />
            Hire Me
          </motion.button>
          <motion.button
            onClick={() => { setVisible(false); setDismissed(true); }}
            whileHover={{ scale: 1.1 }}
            data-testid="hire-me-dismiss"
            className="w-8 h-8 rounded-full glass gold-border flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X size={13} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
