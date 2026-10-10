'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Music, MapPin, Heart, Activity, ArrowUpRight, Disc } from 'lucide-react';

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
   Vinyl Track Component (Stacks Over Next Records)
────────────────────────────── */
function VinylTrack({ track, index, total }) {
  // Descending z-index so the left disc pulls OVER the right items
  const stackingZ = (total - index) * 10;

  return (
    <div 
      className="relative shrink-0 transition-all duration-300 hover:!z-50"
      style={{ zIndex: stackingZ }}
    >
      <a
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${track.title} — ${track.artist}`}
        className="relative group/vinyl block"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 pr-8 sm:pr-10 flex items-center">
          {/* Physical Grooved Disc (Layers cleanly OVER adjacent elements) */}
          <div 
            className="absolute left-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#111111] shadow-[0_6px_22px_rgba(0,0,0,0.9)] border border-neutral-700/60 flex items-center justify-center transition-all duration-500 ease-out group-hover/vinyl:translate-x-10 sm:group-hover/vinyl:translate-x-13 group-hover/vinyl:rotate-90 pointer-events-none"
            style={{ zIndex: 25 }}
          >
            {/* Outer Grooves */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-neutral-800 flex items-center justify-center">
              {/* Inner Grooves */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-neutral-700/70 flex items-center justify-center bg-black">
                {/* Center Label */}
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1DB954] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Album Sleeve Jacket Cover */}
          <div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.7)] bg-neutral-950 shrink-0 group-hover/vinyl:scale-[1.02] transition-transform duration-300"
            style={{ zIndex: 30 }}
          >
            {track.albumArt ? (
              <img src={track.albumArt} alt={track.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <Disc size={24} className="text-gray-600" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 max-w-[80px] sm:max-w-[96px]">
          <p className="text-white text-[11px] font-medium truncate group-hover/vinyl:text-[#1DB954] transition-colors">
            {track.title}
          </p>
          <p className="text-gray-500 text-[9px] truncate">
            {track.artist}
          </p>
        </div>
      </a>
    </div>
  );
}

/* ──────────────────────────────
   Expanded Spotify Widget (Clean Spacing & Live State)
────────────────────────────── */
function SpotifyWidget() {
  const [data, setData] = useState({
    isPlaying: false,
    current: null,
    recent: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const res = await fetch('/api/spotify');
      const json = await res.json();
      setData({
        isPlaying: json.isPlaying || false,
        current: json.current || (json.title ? json : null),
        recent: json.recent || [],
      });
    } catch {
      setData({ isPlaying: false, current: null, recent: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const t = setInterval(fetchTrack, 30000);
    return () => clearInterval(t);
  }, []);

  const active = data.isPlaying ? data.current : null;
  const songTitle = active?.title || 'Nothing Currently Playing';
  const artistName = active?.artist || 'Christian · Melodic Rap · Pop · Afrobeats';

  return (
    <div className="glass gold-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#1DB954]/60 hover:shadow-[0_0_35px_rgba(29,185,84,0.18)] transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Music2 size={16} className="text-[#1DB954]" />
          <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-syne font-bold">
            Audio Rotation & Vinyl Shelf
          </span>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" 
          alt="Spotify" 
          className="h-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>

      {loading ? (
        <div className="py-12 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 my-auto">
        {/* Left: Active Stream OR Nothing in Rotation (Widened + Full-Crawl Marquee) */}
          <div className="flex items-center gap-4 shrink-0 w-[280px] sm:w-[310px]">
            {active?.albumArt ? (
              <div className="relative shrink-0">
                <img 
                  src={active.albumArt} 
                  alt={active.album || 'Track Art'} 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-white/10" 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center border-2 border-[#121212]">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Music size={26} className="text-gray-600" />
              </div>
            )}

            <div className="min-w-0 flex-1 overflow-hidden">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-1">
                {data.isPlaying ? 'Now Playing' : 'Live Stream'}
              </span>

              {/* Seamless Looping Track Title Container */}
              <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,white_85%,transparent)]">
                {songTitle.length > 16 ? (
                  <div className="animate-continuous-marquee">
                    <a
                      href={active?.songUrl || 'https://open.spotify.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-syne font-bold text-base sm:text-lg hover:text-[#1DB954] transition-colors leading-tight pr-16 sm:pr-20 shrink-0"
                    >
                      {songTitle}
                    </a>
                    <a
                      href={active?.songUrl || 'https://open.spotify.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-syne font-bold text-base sm:text-lg hover:text-[#1DB954] transition-colors leading-tight pr-16 sm:pr-20 shrink-0"
                    >
                      {songTitle}
                    </a>
                  </div>
                ) : (
                  <a
                    href={active?.songUrl || 'https://open.spotify.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white font-syne font-bold text-base sm:text-lg hover:text-[#1DB954] transition-colors leading-tight truncate"
                  >
                    {songTitle}
                  </a>
                )}
              </div>

              {/* Seamless Looping Artist Container */}
              <div className="relative overflow-hidden w-full mt-1 [mask-image:linear-gradient(to_right,white_85%,transparent)]">
                {artistName.length > 22 ? (
                  <div className="animate-continuous-marquee" style={{ animationDuration: '20s' }}>
                    <p className="text-gray-400 text-xs sm:text-sm leading-tight pr-16 sm:pr-20 shrink-0">
                      {artistName}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-tight pr-16 sm:pr-20 shrink-0">
                      {artistName}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs sm:text-sm leading-tight truncate">
                    {artistName}
                  </p>
                )}
              </div>

              {data.isPlaying && (
                <div className="flex items-end gap-1 mt-2.5 h-2.5">
                  {[0.4, 1, 0.6, 0.8, 0.5].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#1DB954] rounded-full"
                      animate={{ scaleY: [h, 1, 0.3, h] }}
                      transition={{ duration: 1.1, delay: i * 0.08, repeat: Infinity }}
                      style={{ height: '100%', transformOrigin: 'bottom' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Vinyl Crate Section with slim Spotify green scrollbar */}
          {data.recent && data.recent.length > 0 && (
            <div className="w-full lg:flex-1 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8 overflow-x-auto pb-2 lg:pb-0 spotify-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  Recently Played
                </span>
                <span className="text-[9px] text-gray-600 font-mono hidden sm:inline">
                  Hover to spin
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                {data.recent.slice(0, 5).map((item, idx, arr) => (
                  <VinylTrack key={idx} track={item} index={idx} total={arr.length} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${data.isPlaying ? 'bg-[#1DB954] animate-pulse' : 'bg-gray-700'}`} />
          <p className="text-[9px] text-gray-500 uppercase font-inter tracking-tighter">Connected via Spotify Web API</p>
        </div>
        <p className="text-[9px] text-gray-600 uppercase font-inter tracking-wider">Live Synced Profile</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────
   Enhanced Strava Card (With Glowing Orange Activity Pills)
────────────────────────────── */
function StravaCard() {
  const sports = ['Cycling', 'Tennis', 'Football', 'Hiking', 'Walking'];

  return (
    <div className="glass gold-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#FC4C02]/60 hover:shadow-[0_0_35px_rgba(252,76,2,0.18)] transition-all duration-500">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#FC4C02]" />
            <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-syne font-bold">Field Activity</span>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg"
            alt="Strava"
            className="h-3 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          />
        </div>

        {/* Body Info */}
        <div className="flex items-center gap-4 my-2">
          <div className="w-12 h-12 rounded-xl bg-[#FC4C02]/10 border border-[#FC4C02]/20 flex items-center justify-center text-[#FC4C02] group-hover:scale-105 group-hover:bg-[#FC4C02] group-hover:text-white transition-all duration-300 shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-white font-syne font-bold text-base group-hover:text-gold transition-colors">
              Strava Athlete
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Pacing splits & endurance rides across Nairobi.
            </p>
          </div>
        </div>

        {/* Active Disciplines with Glowing Strava Orange Hover */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono block mb-2.5">
            Active Disciplines
          </span>
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <span
                key={sport}
                className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 font-inter cursor-default transition-all duration-300 hover:border-[#FC4C02] hover:text-white hover:bg-[#FC4C02]/20 hover:shadow-[0_0_16px_rgba(252,76,2,0.4)]"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Defined Pill Button */}
      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FC4C02] animate-pulse" />
          <p className="text-[9px] text-gray-500 uppercase font-inter tracking-tighter">Athletics Hub</p>
        </div>

        <a
          href="https://www.strava.com/athletes/157087545"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#FC4C02] border border-white/10 hover:border-[#FC4C02] text-xs font-semibold text-white transition-all duration-300 shadow-sm"
        >
          <span>View Profile</span>
          <ArrowUpRight size={13} className="text-[#FC4C02] group-hover:text-white transition-colors" />
        </a>
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
          {/* Row 1: Tennis Tile (2 cols) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 glass gold-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
            <TennisBall />
            <div>
              <p className="text-xs text-gold/70 font-inter mb-2 uppercase tracking-widest">Sports & Movement</p>
              <h3 className="font-syne font-bold text-white text-2xl mb-3">More Than a Side Quest</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Sport is where I decompress, compete, and stay sharp. I've spent years on the tennis court, most recently leading the Strathmore University Tennis Team as Treasurer & Captain, and I bring that same discipline and team-first mentality to everything I build.
              </p>

              <div className="flex gap-3 mt-4">
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl mt-3">
                  Off the court, you'll find me cycling through Nairobi, keeping tabs on Arsenal, or debating why the beautiful game is the greatest sport ever invented.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 1: Location tile (1 col) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="glass gold-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-gold" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">Base</span>
            </div>
            <div>
              <p className="font-syne font-bold text-white text-2xl">Nairobi</p>
              <p className="text-gray-400 text-sm font-medium">Kenya 🇰🇪</p>
              <p className="text-gray-600 text-[10px] mt-2 uppercase tracking-widest">EAT - UTC+3</p>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
              <Heart size={12} className="text-gold" />
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter">Cycling · Music · Arsenal FC</p>
            </div>
          </motion.div>

          {/* Row 2: Strava Card on Left (1 col) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-1">
            <StravaCard />
          </motion.div>

          {/* Row 2: Spotify Widget on Right (2 cols) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
            <SpotifyWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}