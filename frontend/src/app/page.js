'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SkillsBento from '@/components/SkillsBento';
import LifeOutside from '@/components/LifeOutside';
import DataViz from '@/components/DataViz';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HireMeBadge from '@/components/HireMeBadge';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <HireMeBadge />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <SkillsBento />
      <LifeOutside />
      <DataViz />
      <Contact />
      <Footer />
    </main>
  );
}
