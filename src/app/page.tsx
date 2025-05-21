'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import SnowEffect from '@/components/ui/SnowEffect';

export default function Home() {
  return (
    <div className="relative">
      {/* Snow Effect Background */}
      <SnowEffect />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero Section with 3D Animation */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Content Sections */}
        <div className="relative z-20">
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
