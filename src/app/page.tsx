'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import SnowEffect from '@/components/ui/SnowEffect';

// Dynamically import Web3Connect to avoid SSR issues
const Web3Connect = dynamic(() => import('@/components/ui/Web3Connect'), {
  ssr: false,
});

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

          {/* Web3 Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Web3 Integration</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                  Connect your Ethereum wallet to interact with blockchain features.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Web3Connect />
              </div>
            </div>
          </section>

          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
