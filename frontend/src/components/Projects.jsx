'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Tag } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import Image from 'next/image';

function ProjectCard({ project, onClick }) {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const onMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }));

  return (
    <motion.div
      data-testid={`project-card-${project.id}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(project)}
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
      {/* Image */}
      <div className="h-48 overflow-hidden relative bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-gray-800 to-gray-900'} flex items-center justify-center`}>
            <span className="font-syne font-bold text-2xl text-white/20">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 text-xs glass border-8 gold-border px-2 py-1 rounded-full text-gold font-inter">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-gold/70 font-inter mb-1.5">{project.category}</p>
        <h3 className="font-syne font-bold text-white text-lg mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.short}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-gold/20 text-gold/70 font-inter"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-500 font-inter">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDrawer({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <motion.div
            data-testid="project-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface border-l border-gold/10 z-50 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur-xl border-b border-gold/10 p-6 flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-gold/70 font-inter">{project.category}</p>
                <h2 className="font-syne font-bold text-white text-xl mt-0.5">{project.title}</h2>
              </div>
              <button
                data-testid="drawer-close-btn"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              {project.image ? (
                <div className="rounded-xl overflow-hidden h-56 border border-gold/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className={`rounded-xl h-40 bg-gradient-to-br ${project.gradient || 'from-gray-800 to-gray-900'} flex items-center justify-center border border-gold/10`}>
                  <span className="font-syne font-bold text-4xl text-white/20">{project.title.charAt(0)}</span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold/80 font-inter"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-white font-syne font-semibold mb-3">Overview</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Year */}
              <div className="glass gold-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-gray-400 text-sm">Year Built</span>
                <span className="text-gold font-syne font-bold">{project.year}</span>
              </div>

              {/* Links */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 glass gold-border rounded-xl text-gold hover:bg-gold/5 transition-colors text-sm font-medium"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          02 — Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-4"
        >
          Things I've
          <span className="text-gold-gradient"> Built</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-12 max-w-xl"
        >
          Click any project for a detailed view. From Android apps to AI chatbots and data dashboards.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelected} />
          ))}
        </div>
      </div>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
