'use client';

import { motion } from 'framer-motion';
import { Code2, Layers, Wrench, Brain, GraduationCap, Award } from 'lucide-react';

const SKILLS = {
  programming: ['Python', 'JavaScript', 'TypeScript', 'Kotlin', 'PHP', 'Java', 'C/C++', 'SQL', 'HTML/CSS'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Streamlit', 'Android SDK', 'Firebase'],
  data: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter'],
  tools: ['Git', 'VS Code', 'IntelliJ', 'Figma'],
};

const EDUCATION = [
  {
    degree: 'BSc Informatics & Computer Science',
    school: 'Strathmore University',
    period: '2023 – Present',
    detail: 'Nairobi, Kenya',
  },
  {
    degree: 'AI Essentials for Professionals',
    school: 'Moringa School',
    period: '2026',
    detail: 'Online, Kenya',
  },
  {
    degree: 'Certificate in Data Analytics & Visualization',
    school: 'iLab Africa',
    period: '2024',
    detail: 'Strathmore University',
  },
  {
    degree: 'High School Diploma',
    school: 'Nova Pioneer Tatu Boys',
    period: '2019 – 2022',
    detail: 'Nairobi, Kenya',
  },
];

const LEADERSHIP = [
  {
    role: 'Treasurer All Saints Volunteers',
    org: 'All Saints Cathedral Nairobi',
    period: '2025 – Present',
  },
  {
    role: 'Former Treasurer & Team Captain',
    org: 'Strathmore University Tennis Team',
    period: '2024 – 2026',
  },
  {
    role: 'Tech Volunteer',
    org: 'Kilimani Primary School',
    period: '2023',
  },
  {
    role: 'Library Secretary',
    org: 'Nova Pioneer Tatu Boys',
    period: '2021',
  },
];

function SkillPill({ label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="px-3 py-1.5 rounded-lg border border-gold/15 bg-white/[0.03] text-gray-300 text-xs font-inter hover:border-gold/40 hover:text-gold transition-all"
    >
      {label}
    </motion.span>
  );
}

function BentoCard({ children, className = '' }) {
  return (
    <div className={`glass gold-border rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export default function SkillsBento() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          03 — Skills & Background
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-12"
        >
          Toolkit &
          <span className="text-gold-gradient"> Background</span>
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Programming — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Programming Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.programming.map((s) => <SkillPill key={s} label={s} />)}
              </div>
            </BentoCard>
          </motion.div>

          {/* Data Science */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-4">
                <Brain size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Data Science</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.data.map((s) => <SkillPill key={s} label={s} />)}
              </div>
            </BentoCard>
          </motion.div>

          {/* Frameworks — spans 2 cols to fill row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-4">
                <Layers size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Frameworks & Libraries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frameworks.map((s) => <SkillPill key={s} label={s} />)}
              </div>
            </BentoCard>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.tools.map((s) => <SkillPill key={s} label={s} />)}
              </div>
            </BentoCard>
          </motion.div>

          {/* Education — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-2"
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Education</span>
              </div>
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">{edu.degree}</p>
                      <p className="text-gold/80 text-xs mt-0.5">{edu.school}</p>
                      <p className="text-gray-500 text-xs">{edu.period} · {edu.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-5">
                <Award size={16} className="text-gold" />
                <span className="text-sm font-syne font-semibold text-white">Leadership</span>
              </div>
              <div className="space-y-3">
                {LEADERSHIP.map((item) => (
                  <div key={item.role} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-medium">{item.role}</p>
                      <p className="text-gray-500 text-xs">{item.org}</p>
                      <p className="text-gold/60 text-[10px]">{item.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Core Competencies — full width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-3"
          >
            <BentoCard>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-syne font-semibold text-white">Core Competencies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Team Collaboration', 'Leadership', 'Communication', 'Adaptability', 'UX/UI Design', 'Agile Development', 'Data Analysis'].map((s) => (
                  <span
                    key={s}
                    className="px-4 py-1.5 rounded-full text-xs font-inter bg-gold/10 border border-gold/25 text-gold/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
