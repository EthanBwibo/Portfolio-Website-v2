'use client';
import { EXPERIENCES } from '@/data/experience';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag, MapPin, Calendar } from 'lucide-react';

function ExperienceCard({ experience, onClick }) {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const onMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }));

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(experience)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden border border-gold/10 cursor-pointer group"
      style={{
        background: spotlight.visible
          ? `radial-gradient(circle 280px at ${spotlight.x}px ${spotlight.y}px, rgba(255,215,0,0.08), transparent 70%), #111111`
          : '#111111',
        transition: 'background 0.15s',
      }}
    >
      {/* Top gradient banner */}
      <div className={`h-32 bg-gradient-to-br ${experience.gradient} flex items-center justify-center relative`}>
        <span className="font-syne font-bold text-5xl text-white/10 select-none">
          {experience.company.charAt(0)}
        </span>
        <div className="absolute top-3 right-3 text-xs glass border-8 gold-border px-2 py-1 rounded-full text-gold font-inter">
          {experience.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-gold/70 font-inter mb-1">{experience.company}</p>
        <h3 className="font-syne font-bold text-white text-lg mb-1">{experience.role}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-inter mb-3">
          <Calendar size={11} />
          <span>{experience.period}</span>
          <span className="mx-1">·</span>
          <MapPin size={11} />
          <span>{experience.location}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{experience.short}</p>
        <div className="flex flex-wrap gap-1.5">
          {experience.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-gold/20 text-gold/70 font-inter"
            >
              {tag}
            </span>
          ))}
          {experience.tags.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-500 font-inter">
              +{experience.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceDrawer({ experience, onClose }) {
  return (
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface border-l border-gold/10 z-50 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur-xl border-b border-gold/10 p-6 flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-gold/70 font-inter">{experience.type}</p>
                <h2 className="font-syne font-bold text-white text-xl mt-0.5">{experience.role}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">

              {/* Banner */}
              <div className={`rounded-xl h-36 bg-gradient-to-br ${experience.gradient} flex items-center justify-center border border-gold/10`}>
                <span className="font-syne font-bold text-6xl text-white/10 select-none">
                  {experience.company.charAt(0)}
                </span>
              </div>

              {/* Meta */}
              <div className="glass gold-border rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Company</span>
                  <span className="text-white font-inter text-sm font-medium">{experience.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Period</span>
                  <span className="text-gold font-syne font-bold text-sm">{experience.period}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Location</span>
                  <span className="text-white font-inter text-sm">{experience.location}</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-white font-syne font-semibold mb-3">Overview</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{experience.description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-white font-syne font-semibold mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                      <span className="text-gold mt-1.5 shrink-0">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-white font-syne font-semibold mb-3">Skills & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold/80 font-inter"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company link */}
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 glass gold-border rounded-xl text-gold hover:bg-gold/5 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Visit {experience.company.split(' ')[0]} Website
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          02 — Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-4"
        >
          Where I've
          <span className="text-gold-gradient"> Worked</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-12 max-w-xl"
        >
          Click any role for a detailed view — responsibilities, skills, and more.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} onClick={setSelected} />
          ))}
        </div>
      </div>

      <ExperienceDrawer experience={selected} onClose={() => setSelected(null)} />
    </section>
  );
}