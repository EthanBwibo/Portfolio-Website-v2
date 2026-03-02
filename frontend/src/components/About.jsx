'use client';

import { motion } from 'framer-motion';
import { MapPin, BookOpen, Calendar, Mail, Phone } from 'lucide-react';

const STATS = [
  { value: '10+', label: 'Projects Built' },
  { value: '6+', label: 'Languages' },
  { value: '3rd', label: 'Year ICS' },
  { value: '2024', label: 'Data Analytics Cert' },
];

const INFO = [
  { icon: MapPin, text: 'Nairobi, Kenya' },
  { icon: BookOpen, text: 'Strathmore University' },
  { icon: Calendar, text: 'Internship: Jan–Mar 2026' },
  { icon: Mail, text: 'enbwibo@gmail.com' },
  { icon: Phone, text: '+254 714 516 129' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function About() {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          01 — About Me
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-16"
        >
          The Human Behind
          <span className="text-gold-gradient"> the Code</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden gold-border gold-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/ethan.jpg"
                alt="Ethan Bwibo"
                className="w-full h-[520px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 glass gold-border rounded-xl p-4 text-center"
            >
              <p className="font-syne font-bold text-gold text-2xl">3+</p>
              <p className="text-gray-400 text-xs mt-0.5">Years Coding</p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4 text-gray-300 leading-relaxed"
            >
              <p className="text-lg">
                I'm a passionate 3rd-year Informatics & Computer Science student at{' '}
                <span className="text-gold font-medium">Strathmore University</span>, Nairobi.
                My work spans software development, data analytics, and user-centered design.
              </p>
              <p>
                Recently completed a Certificate in Data Analytics & Visualization from{' '}
                <span className="text-white font-medium">iLab Africa</span>. I've built 10+ projects
                ranging from Android apps to Python dashboards, always focusing on real-world impact.
              </p>
              <p>
                Beyond tech, I serve as <span className="text-gold font-medium">Treasurer & Team Captain</span>{' '}
                for the Strathmore University Tennis Team, and actively participate in praise & worship.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="glass gold-border rounded-xl p-4 text-center">
                  <p className="font-syne font-bold text-gold text-2xl">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Info grid */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {INFO.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-400">
                  <Icon size={14} className="text-gold flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Languages */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="glass gold-border rounded-xl p-5"
            >
              <p className="text-xs section-label mb-4">Languages</p>
              {[
                { lang: 'English', level: 'Fluent', pct: 98 },
                { lang: 'Swahili', level: 'Proficient', pct: 93 },
                { lang: 'French', level: 'Basic', pct: 38 },
              ].map(({ lang, level, pct }) => (
                <div key={lang} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium">{lang}</span>
                    <span className="text-gray-500">{level}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      className="h-full gold-gradient rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
