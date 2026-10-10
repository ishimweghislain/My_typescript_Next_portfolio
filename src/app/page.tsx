'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';
import ConstellationCanvas from '@/components/ui/ConstellationCanvas';

export default function Home() {
  return (
    <div className="relative">
      {/* Full-page interactive star constellation — sits below everything */}
      <ConstellationCanvas className="fixed inset-0 pointer-events-none z-0" />

      {/* All page content sits above the constellation */}
      <div className="relative z-10">
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
