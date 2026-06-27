'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle } from 'lucide-react';

const FIELDS = [
  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Internship Opportunity' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          06 — Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-4"
        >
          Let's
          <span className="text-gold-gradient"> Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-12 max-w-xl"
        >
          Actively seeking internship opportunities for January–March 2026. Have a project or opportunity in mind? Let's talk.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: 'Email', value: 'enbwibo@gmail.com', href: 'mailto:enbwibo@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+254 714 516 129', href: 'tel:+254714516129' },
              { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass gold-border rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm hover:text-gold transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="glass gold-border rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-3">Connect with me</p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/ethan-bwibo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="linkedin-link"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass gold-border text-gray-300 hover:text-gold text-sm transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/EthanBwibo"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="github-link"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass gold-border text-gray-300 hover:text-gold text-sm transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative glass gold-border rounded-2xl p-8 backdrop-blur-2xl">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-sm z-10"
                    data-testid="success-state"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={52} className="text-gold" />
                    </motion.div>
                    <p className="font-syne font-bold text-white text-xl">Message Sent!</p>
                    <p className="text-gray-400 text-sm text-center max-w-xs">
                      I'll get back to you soon. Check your inbox for a confirmation email.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-5">
                {/* Honeypot */}
                <input type="text" name="website" className="sr-only" tabIndex={-1} autoComplete="off" />

                {FIELDS.map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs text-gray-400 mb-1.5 font-inter">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      value={form[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      data-testid={`contact-${id}`}
                      className="w-full px-4 py-3 bg-white/[0.04] border border-gold/15 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-xs text-gray-400 mb-1.5 font-inter">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    data-testid="contact-message"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-gold/15 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  data-testid="contact-submit-btn"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 gold-gradient text-black font-syne font-bold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] transition-shadow disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
