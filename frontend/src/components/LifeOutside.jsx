'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Music, MapPin, Heart, Activity } from 'lucide-react';

/* ──────────────────────────────
   Tennis Ball (Current Logic Kept)
────────────────────────────── */
function TennisBall() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={{ y: [-30, 40, -30] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        className="relative w-20 h-20 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 32%, #d4eb3b, #8ab800)',
          boxShadow: '0 0 30px rgba(196,224,59,0.25), inset 0 -4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-50">
          <path d="M 10,0 C 20,40 80,40 80,0" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-45 50 50)" />
          <path d="M 10,100 C 20,60 80,60 80,100" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-45 50 50)" />
        </svg>
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/felt.png')`, backgroundSize: '150px' }} />
      </motion.div>
      <motion.div animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }} className="w-14 h-2 bg-black/60 rounded-full blur-md" />
    </div>
  );
}

/* ──────────────────────────────
   Spotify Widget (Polished UI)
────────────────────────────── */
function SpotifyWidget() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const res = await fetch('/api/spotify');
      const data = await res.json();
      setTrack(data);
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
    <div className="glass gold-border rounded-2xl p-5 h-full flex flex-col group hover:border-gold/50 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Music2 size={16} className="text-[#1DB954]" />
          <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-syne font-bold">Live Audio</span>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" 
          alt="Spotify" 
          className="h-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all"
        />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : track?.isPlaying ? (
        <div className="flex gap-4 items-center flex-1">
          {track.albumArt && (
            <div className="relative">
              <img src={track.albumArt} alt={track.album} className="w-16 h-16 rounded-lg object-cover shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center border-2 border-[#171717]">
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="block text-white font-bold text-sm truncate hover:text-gold transition-colors">
              {track.title}
            </a>
            <p className="text-gray-400 text-xs truncate">{track.artist}</p>
            <div className="flex items-end gap-1 mt-3 h-3">
              {[0.4, 1, 0.6, 0.8, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#1DB954] rounded-full"
                  animate={{ scaleY: [h, 1, 0.3, h] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  style={{ height: '100%', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          <Music size={24} className="text-gray-700" />
          <p className="text-gray-500 text-xs font-medium">Currently Offline</p>
          <p className="text-[10px] text-gray-600 uppercase tracking-tighter">Christian · Melodic Rap · Pop · Afrobeats</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${track?.isPlaying ? 'bg-[#1DB954] animate-pulse' : 'bg-gray-700'}`} />
        <p className="text-[9px] text-gray-600 uppercase font-inter tracking-tighter">Spotify Protocol v2.0</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────
   Strava Ticker (Polished UI)
────────────────────────────── */
function StravaTicker() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strava')
      .then(r => r.json())
      .then(d => { setActivities(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="glass gold-border rounded-2xl p-5 h-full flex flex-col group hover:border-gold/50 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[#FC4C02]" />
          <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-syne font-bold">Field Activity</span>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg" alt="Strava" className="h-3 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
           <div className="w-7 h-7 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4 flex-1">
          {activities.map((a, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="relative pl-4 border-l border-gold/10 hover:border-gold/40 transition-colors"
            >
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-sm font-medium leading-none mb-1">{a.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{a.type}</span>
                      <span>•</span>
                      <span>{new Date(a.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-syne font-bold text-sm">{a.distance} <span className="text-[10px] opacity-60 font-inter">KM</span></p>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Activity size={24} className="text-gray-700" />
          <p className="text-gray-500 text-xs italic">Rest day in progress... 🎾</p>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FC4C02] animate-pulse" />
        <p className="text-[9px] text-gray-600 uppercase font-inter tracking-tighter">Live Athletics Feed</p>
      </div>
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
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-label mb-3">
          05 — Life & Live
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-12">
          Beyond the <span className="text-gold-gradient">Screen</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tennis Tile */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 glass gold-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
            <TennisBall />
            <div>
              <p className="text-xs text-gold/70 font-inter mb-2 uppercase tracking-widest">Sports & Movement</p>
              <h3 className="font-syne font-bold text-white text-2xl mb-3">More Than a Side Quest</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Sport is where I decompress, compete, and stay sharp. I've spent years on the tennis court — most recently leading the Strathmore University Tennis Team as Treasurer & Captain — and I bring that same discipline and team-first mentality to everything I build.
              </p>

              <div className="flex gap-3 mt-4">
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl mt-3">
                Off the court, you'll find me cycling through Nairobi, keeping tabs on Arsenal, or debating why the beautiful game is the greatest sport ever invented.
              </p>
              </div>

              <div className="flex gap-3 mt-4">
                {['Tennis', 'Cycling', 'Football'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-gold/20 text-gold/70">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Location tile */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="glass gold-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-gold" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">Base</span>
            </div>
            <div>
              <p className="font-syne font-bold text-white text-2xl">Nairobi</p>
              <p className="text-gray-400 text-sm font-medium">Kenya 🇰🇪</p>
              <p className="text-gray-600 text-[10px] mt-2 uppercase tracking-widest">EAT — UTC+3</p>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
              <Heart size={12} className="text-gold" />
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter">Cycling · Music · Arsenal FC</p>
            </div>
          </motion.div>

          {/* Spotify Widget */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <SpotifyWidget />
          </motion.div>

          {/* Strava Ticker */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
            <StravaTicker />
          </motion.div>
        </div>
      </div>
    </section>
  );
}