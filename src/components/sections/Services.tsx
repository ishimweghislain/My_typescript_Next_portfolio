'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Server,
  Cloud,
  Blocks,
  GraduationCap,
} from 'lucide-react';

const serviceItems = [
  {
    title: 'Web Applications',
    description:
      'Responsive full-stack web platforms built with Next.js, React, and TypeScript. Optimized for high performance, accessibility, and zero layout shift.',
    icon: <Globe size={24} strokeWidth={1.75} />,
  },
  {
    title: 'Mobile Apps & PWAs',
    description:
      'Native-feel mobile apps built with Flutter and React Native, plus installable Progressive Web Apps with offline caching and responsive service workers.',
    icon: <Smartphone size={24} strokeWidth={1.75} />,
  },
  {
    title: 'Backend & APIs',
    description:
      'Robust backend systems using Node.js, NestJS, and Laravel. Scalable PostgreSQL database design, REST/GraphQL endpoints, and MTN MoMo payment integrations.',
    icon: <Server size={24} strokeWidth={1.75} />,
  },
  {
    title: 'DevOps & Cloud Hosting',
    description:
      'Linux server provisioning (Apache/Nginx), containerization with Docker, automated CI/CD deployment pipelines on GitHub Actions, cPanel, Vercel, and Netlify.',
    icon: <Cloud size={24} strokeWidth={1.75} />,
  },
  {
    title: 'Blockchain & Smart Contracts',
    description:
      'Smart contract development in Solidity for the Ethereum ecosystem. Web3 provider integration for decentralized applications and verified voting systems.',
    icon: <Blocks size={24} strokeWidth={1.75} />,
  },
  {
    title: 'Training & Mentoring',
    description:
      'Curriculum delivery and technical coaching in full stack development. Mentored 50+ students in modern MERN stack, Laravel, and TypeScript tooling.',
    icon: <GraduationCap size={24} strokeWidth={1.75} />,
  },
];

export default function Services() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--mouse-x', '-9999px');
    e.currentTarget.style.setProperty('--mouse-y', '-9999px');
  };

  return (
    <section id="services" className="py-24" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-2) 30%, transparent)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">05 / SERVICES</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Engineering Services &amp; Capabilities
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Direct technical services I provide for products, companies, and growing startups.
              </p>
            </div>
            <div className="mono text-xs text-[var(--muted)] shrink-0">
              End-to-End Execution
            </div>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="card p-6 md:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Icon box */}
                <div
                  className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center mb-5 border border-[var(--border)]"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--accent-text,var(--accent))',
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold mb-3 text-[var(--text)]">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] mt-6 flex items-center justify-between">
                <span className="mono text-[0.7rem] text-[var(--muted)] uppercase tracking-wider">
                  Service 0{index + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
