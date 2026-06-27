'use client';

import { motion } from 'framer-motion';

const SKILLS_VIZ = [
  { label: 'Python', level: 92, desc: 'Data analysis, automation, backend' },
  { label: 'Data Visualization', level: 88, desc: 'Plotly, Matplotlib, Seaborn' },
  { label: 'React / Next.js', level: 82, desc: 'Full-stack web development' },
  { label: 'Android / Kotlin', level: 75, desc: 'Native mobile applications' },
  { label: 'SQL & Databases', level: 80, desc: 'MySQL, MongoDB, Firebase' },
  { label: 'UX / UI Design', level: 74, desc: 'Figma, user-centered design' },
];

function AnimatedBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-white text-sm font-medium font-inter">{skill.label}</span>
        <span className="text-gold text-sm font-syne font-bold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)' }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-60" />
        </motion.div>
      </div>
      <p className="text-gray-600 text-xs mt-1">{skill.desc}</p>
    </motion.div>
  );
}

function SVGNodes() {
  const nodes = [
    { x: 80, y: 60, r: 8 },
    { x: 180, y: 30, r: 5 },
    { x: 280, y: 80, r: 10 },
    { x: 200, y: 130, r: 6 },
    { x: 100, y: 140, r: 7 },
    { x: 320, y: 150, r: 5 },
    { x: 350, y: 60, r: 8 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 6], [6, 5], [5, 3],
  ];

  return (
    <svg viewBox="0 0 400 180" className="w-full h-full opacity-60">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(255,215,0,0.25)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.8 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={n.r}
          fill="rgba(255,215,0,0.4)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
        />
      ))}
    </svg>
  );
}

export default function DataViz() {
  return (
    <section id="dataviz" className="py-28 px-4 sm:px-6 lg:px-8 bg-surface/20">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          06 — Analytics Expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-12"
        >
          Proficiency
          <span className="text-gold-gradient"> Breakdown</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bar Chart */}
          <div className="space-y-6">
            {SKILLS_VIZ.map((skill, i) => (
              <AnimatedBar key={skill.label} skill={skill} index={i} />
            ))}
          </div>

          {/* SVG Visualization + Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass gold-border rounded-2xl p-6 h-48 flex items-center justify-center"
            >
              <SVGNodes />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="glass gold-border rounded-xl p-5">
                <h3 className="font-syne font-bold text-white mb-2">Data Analytics Journey</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Certified in Data Analytics & Visualization from iLab Africa (Strathmore University).
                  Built dashboards tracking UN SDGs in Kenya and road accident patterns — turning raw
                  CSV data into actionable policy insights using Python, Pandas, and Plotly.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '5+', label: 'Dashboards' },
                  { value: '3', label: 'Datasets' },
                  { value: '2024', label: 'Certified' },
                ].map(({ value, label }) => (
                  <div key={label} className="glass gold-border rounded-xl p-3 text-center">
                    <p className="font-syne font-bold text-gold text-xl">{value}</p>
                    <p className="text-gray-500 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
