# Ethan Bwibo Portfolio — PRD

## Overview
A high-end, bespoke personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. "Obsidian & Gold" design theme with deep charcoal/black backgrounds and gold (#FFD700–#FFA500) accents.

## Architecture
- **Framework**: Next.js 14 (App Router, `src/` directory)
- **Styling**: Tailwind CSS with custom Obsidian & Gold palette
- **Animations**: Framer Motion 11
- **Fonts**: Syne (headings) + Inter (body) via next/font/google
- **Email**: Resend API (`resend` npm package)
- **Spotify**: Spotify Web API (refresh token flow)
- **GitHub**: GitHub Events API (public, no auth)

## Directory Structure
```
/app/frontend/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout, fonts
│   │   ├── page.js            # Main page assembling all sections
│   │   ├── globals.css        # Tailwind + custom CSS
│   │   └── api/
│   │       ├── contact/route.js   # POST - Resend email
│   │       ├── spotify/route.js   # GET - Currently playing
│   │       └── github/route.js    # GET - Latest commits
│   ├── components/
│   │   ├── CustomCursor.jsx   # Gold ring cursor
│   │   ├── Navbar.jsx         # Fixed transparent nav
│   │   ├── Hero.jsx           # Hero + MagneticButton + RoleCycler
│   │   ├── About.jsx          # About section
│   │   ├── Projects.jsx       # Project cards + slide-over drawer
│   │   ├── SkillsBento.jsx    # Bento grid: skills/education/leadership
│   │   ├── LifeOutside.jsx    # Tennis + Spotify + GitHub + Location
│   │   ├── DataViz.jsx        # Animated SVG + proficiency bars
│   │   ├── Contact.jsx        # Glassmorphism contact form
│   │   └── Footer.jsx         # Footer
│   └── data/
│       └── projects.js        # 10 project definitions
├── public/media/              # All media assets
├── package.json
├── tailwind.config.js
├── next.config.js
├── jsconfig.json
└── .env.local                 # API keys
```

## Environment Variables
```
RESEND_API_KEY=re_SvbAgv1N_AhtrRe8HQm6eVxModnZSQRFp
SPOTIFY_CLIENT_ID=1dbd61d8c1154f1bb6846a1ded9ae972
SPOTIFY_CLIENT_SECRET=a38a33a64eb0441caae0b81da8b793a2
SPOTIFY_REFRESH_TOKEN=AQAVqm5ZbSVM9-...
GITHUB_USERNAME=EthanBwibo
```

## Features Implemented ✅ (Feb 2026)
- [x] Obsidian & Gold design system (Syne + Inter fonts)
- [x] Custom gold ring cursor (Framer Motion spring)
- [x] Fixed navbar with scroll blur effect
- [x] Hero: Magnetic CTA buttons + Role text cycler
- [x] About: Profile image, stats, language bars
- [x] Projects: 10 projects (6 new + 4 existing) with spotlight hover
- [x] Projects: Slide-over drawer with full project details
- [x] Skills: Bento grid (programming, frameworks, data science, tools, education, leadership)
- [x] Life & Live: CSS tennis ball animation + location tile
- [x] Life & Live: Spotify "Currently Playing" widget (live API)
- [x] Life & Live: GitHub commits ticker (live API)
- [x] Data Analytics: Animated SVG nodes + proficiency bars
- [x] Contact: Glassmorphism form + Resend email (notification + auto-reply)
- [x] Footer with full navigation

## New Projects Added
1. IT Internship @ MOHI (Missions of Hope International)
2. Rafiki IT Chatbot (Python, FastAPI, Streamlit)
3. Google Workspace Automation Suite
4. Hilton the Artist (artist portfolio)

## User Persona
- Ethan Bwibo, final year ICS @ Strathmore University, Nairobi
- Seeking Jan–Mar 2026 internship
- Tennis Team Captain + Treasurer
- Interests: Pop, Hip-hop, Afrobeats

## Prioritized Backlog

### P0 (Critical — Must Have)
- Deploy to Netlify (update netlify.toml for Next.js)
- Verify Spotify refresh token scope has `user-read-currently-playing`

### P1 (High — Next Sprint)
- Add Lottie animation for tennis tile (replace CSS animation)
- Add project live demo links
- Add mobile screenshot for each project card
- Add Netlify form action fallback
- Replace `onboarding@resend.dev` with verified domain sender

### P2 (Backlog)
- Dark/light mode toggle
- Blog section
- PDF viewer for resume
- Analytics (Plausible or GA4)
- SEO meta images (og:image)

## Testing Status
- Backend APIs: 100% passing (iteration 2)
- Frontend: 100% passing (iteration 2)
- Spotify: Live — returns real currently playing track
- GitHub: Live — returns 6 real commits from EthanBwibo repos
- Contact form: Verified real email delivery to enbwibo@gmail.com via Resend
- Hire Me badge: Appears after 10s, dismiss works

## Architecture Note
All /api/* requests are routed by Kubernetes ingress to FastAPI backend (port 8001).
Next.js API routes (port 3000) are only used locally.
FastAPI backend at /app/backend/server.py handles: Spotify, GitHub, Contact.
