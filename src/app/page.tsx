'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import SnowEffect from '@/components/ui/SnowEffect';
import ParticleSystem from '@/components/ui/ParticleSystem';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main App */}
      {!isLoading && (
        <div className="relative">
          {/* Background Effects */}
          <ParticleSystem />
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
      )}
    </>
  );
}
