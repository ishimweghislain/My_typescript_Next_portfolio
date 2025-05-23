'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Scene3D from '../3d/Scene3D';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10 pt-24 md:pt-20 pb-16 relative">
        {/* Overlay to ensure text visibility */}
        <div
          className="absolute inset-0 backdrop-blur-sm -mx-4 -my-20 z-[-1] hidden lg:block"
          style={{ backgroundColor: 'var(--glass-background)' }}
        ></div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left mt-6 lg:mt-0"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium mb-2"
              style={{ color: 'var(--primary)' }}
            >
              Hello, I&apos;m
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              ISHIMWE GHISLAIN
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl md:text-2xl mb-6"
              style={{ color: 'var(--foreground-secondary)' }}
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-2">
                <span style={{ color: 'var(--accent)' }}>{'<'}</span>
                <div className="typewriter relative overflow-hidden border-r-2 pr-1 animate-cursor" style={{ borderColor: 'var(--primary)' }}>
                  <span className="inline-block animate-typewriter overflow-hidden whitespace-nowrap">
                    Fullstack Developer / Software Engineer / Graphic Designer / Content Creator
                  </span>
                </div>
                <span style={{ color: 'var(--accent)' }}>{'/>'}</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: 'var(--foreground-muted)' }}
            >
              Based in Kamonyi, Rwanda. I create stunning digital experiences with modern technologies and creative designs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#contact"
                className="font-medium py-3 px-6 rounded-full transition-all duration-300 glow-hover glass-card"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                }}
              >
                Contact Me
              </Link>
              <Link
                href="#projects"
                className="font-medium py-3 px-6 rounded-full transition-all duration-300 glow-hover glass"
                style={{
                  color: 'var(--foreground)',
                  borderColor: 'var(--card-border)'
                }}
              >
                View My Work
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full"
          >
            <div className="w-full flex justify-center items-center">
              <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden relative">
                <Image
                  src="/images/me.jpg"
                  alt="ISHIMWE GHISLAIN"
                  className="w-full h-full object-cover object-center"
                  style={{
                    boxShadow: '0 0 30px var(--glow-color)',
                  }}
                  width={400}
                  height={400}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t to-transparent rounded-full"
                  style={{
                    background: `linear-gradient(to top, var(--background-secondary), transparent)`
                  }}
                ></div>

                {/* Animated border */}
                <div
                  className="absolute inset-[-5px] rounded-full border-4 animate-spin-slow"
                  style={{ borderColor: 'var(--primary)' }}
                ></div>
                <div
                  className="absolute inset-[-10px] rounded-full border-4 opacity-50 animate-spin-slow-reverse"
                  style={{ borderColor: 'var(--accent)' }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
          style={{ color: 'var(--foreground)' }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <p className="mb-2">Scroll Down</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
