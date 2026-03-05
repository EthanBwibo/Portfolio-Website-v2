'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Music, GitCommit, Github, MapPin, Heart } from 'lucide-react';

// /* ──────────────────────────────
//    Tennis Ball (CSS animation)
// ────────────────────────────── */
// function TennisBall() {
//   return (
//     <div className="flex flex-col items-center gap-3">
//       <motion.div
//         animate={{ y: [-24, 0, -24] }}
//         transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
//         className="relative w-20 h-20 rounded-full"
//         style={{
//           background: 'radial-gradient(circle at 35% 32%, #d4eb3b, #8ab800)',
//           boxShadow: '0 0 30px rgba(196,224,59,0.25), inset 0 -3px 8px rgba(0,0,0,0.25)',
//         }}
//       >
//         <div
//           className="absolute inset-0 rounded-full"
//           style={{
//             border: '2.5px solid transparent',
//             borderTop: '2.5px solid rgba(255,255,255,0.55)',
//             borderBottom: '2.5px solid rgba(255,255,255,0.55)',
//             transform: 'rotate(35deg)',
//           }}
//         />
//         <div
//           className="absolute inset-0 rounded-full"
//           style={{
//             border: '2.5px solid transparent',
//             borderTop: '2.5px solid rgba(255,255,255,0.55)',
//             borderBottom: '2.5px solid rgba(255,255,255,0.55)',
//             transform: 'rotate(-35deg)',
//           }}
//         />
//       </motion.div>
//       <motion.div
//         animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.25, 0.45, 0.25] }}
//         transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
//         className="w-14 h-2 bg-black/60 rounded-full blur-sm"
//       />
//     </div>
//   );
// }

function TennisBall() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Ball Container */}
      <motion.div
        animate={{ y: [-30, 40, -30] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        className="relative w-20 h-20 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 32%, #d4eb3b, #8ab800)',
          boxShadow: '0 0 30px rgba(196,224,59,0.25), inset 0 -4px 10px rgba(0,0,0,0.3)',
        }}
      >
        {/* Corrected Seams using Intersecting Quadratic Arcs */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full opacity-50"
        >
          {/* Left arc */}
          <path
            d="M 10,0 C 20,40 80,40 80,0"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform="rotate(-45 50 50)"
          />
          {/* Right arc */}
          <path
            d="M 10,100 C 20,60 80,60 80,100"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform="rotate(-45 50 50)"
          />
        </svg>
        
        {/* Subtle Felt Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none" 
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/felt.png')`,
            backgroundSize: '150px'
          }} 
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        className="w-14 h-2 bg-black/60 rounded-full blur-md"
      />
    </div>
  );
}

/* ──────────────────────────────
   Spotify Widget
────────────────────────────── */
function SpotifyWidget() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const res = await fetch('/api/spotify');
      setTrack(await res.json());
    } catch {
      setTrack({ isPlaying: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const t = setInterval(fetchTrack, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass gold-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Music2 size={14} className="text-green-400" />
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-inter">
          Currently Playing
        </span>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : track?.isPlaying ? (
        <div className="flex gap-3 items-center flex-1">
          {track.albumArt && (
            <img
              src={track.albumArt}
              alt={track.album}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white font-medium text-sm truncate hover:text-gold transition-colors"
            >
              {track.title}
            </a>
            <p className="text-gray-400 text-xs mt-0.5 truncate">{track.artist}</p>
            <div className="flex items-end gap-0.5 mt-3 h-4">
              {[0.8, 1, 0.6, 0.9, 0.7].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-green-400 rounded-full"
                  animate={{ scaleY: [h, 1, 0.4, h] }}
                  transition={{ duration: 0.9, delay: i * 0.12, repeat: Infinity }}
                  style={{ height: '100%', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          <Music size={28} className="text-gray-600" />
          <p className="text-gray-500 text-sm">Not playing right now</p>
          <p className="text-gray-600 text-xs">Christian · Melodic Rap · Pop</p>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────
   GitHub Ticker
────────────────────────────── */
function GitHubTicker() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => { setCommits(d.commits || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="glass gold-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Github size={14} className="text-gray-400" />
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-inter">Latest Commits</span>
        <a
          href="https://github.com/ethanbwibo-Strath"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[10px] text-gold hover:underline"
        >
          @ethanbwibo-Strath
        </a>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : commits.length > 0 ? (
        <div className="space-y-2 flex-1">
          {commits.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-2 py-1"
            >
              <GitCommit size={11} className="text-gold mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-xs truncate">{c.message}</p>
                <p className="text-gray-600 text-[10px] mt-0.5">{c.repo} · {fmt(c.date)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center">No recent activity</p>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────
    Strava API Route
────────────────────────────── */
function StravaWidget() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strava')
      .then(r => r.json())
      .then(d => { setActivities(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="glass gold-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#FC4C02]" /> {/* Strava Orange */}
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-inter">Recent Activity</span>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center"><div className="animate-spin ..." /></div>
      ) : activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <p className="text-white text-sm font-medium">{a.name}</p>
                <p className="text-gray-500 text-xs">{a.type} · {new Date(a.date).toLocaleDateString()}</p>
              </div>
              <p className="text-gold font-bold text-sm">{a.distance}km</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Rest day today! 🎾</p>
      )}
    </div>
  );
}


/* ──────────────────────────────
   Main LifeOutside Component
────────────────────────────── */
export default function LifeOutside() {
  return (
    <section id="life" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-3"
        >
          04 — Life & Live
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-12"
        >
          Beyond the
          <span className="text-gold-gradient"> Screen</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tennis Tile — large */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass gold-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8"
          >
            <TennisBall />
            <div>
              <p className="text-xs text-gold/70 font-inter mb-2 uppercase tracking-widest">Life Outside Code</p>
              <h3 className="font-syne font-bold text-white text-2xl mb-3">
                Strathmore Tennis Captain
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                As Treasurer & Team Captain of the Strathmore University Tennis Team, I lead
                by example both on and off the court — balancing competitive sport, team
                management, and my academic journey.
              </p>
              <div className="flex gap-3 mt-4">
                {['Team Leadership', 'Strategy', 'Resilience'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-gold/20 text-gold/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Location tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass gold-border rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-gold" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">Location</span>
            </div>
            <div>
              <p className="font-syne font-bold text-white text-2xl">Nairobi</p>
              <p className="text-gray-400 text-sm">Kenya 🇰🇪</p>
              <p className="text-gray-600 text-xs mt-2">EAT — UTC+3</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Heart size={12} className="text-gold" />
              <p className="text-gray-500 text-xs">Cycling · Music · Arsenal FC</p>
            </div>
          </motion.div>

          {/* Spotify */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SpotifyWidget />
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* <GitHubTicker /> */}
            <StravaWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
