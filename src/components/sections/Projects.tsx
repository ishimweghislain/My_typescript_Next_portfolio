'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'Mineracao Global',
      category: 'web',
      image: '/images/mineracao.png',
      description: 'A comprehensive platform for mining industries, providing professional solutions and services for the global mining sector.',
      technologies: ['React', 'Tailwind CSS', 'Node.js'],
      link: 'https://mineracaoglobal.com/',
    },
    {
      title: 'Elimo',
      category: 'web',
      image: '/images/elimo.png',
      description: 'A professional property management system designed to streamline real estate operations and tenant management.',
      technologies: ['PHP', 'Tailwind CSS'],
      link: 'https://elimo.rw/index.php',
    },
    {
      title: 'Instacash',
      category: 'web',
      image: '/images/instacash.png',
      description: 'A dedicated accounting and financial management solution for modern companies, ensuring efficient tracking and reporting.',
      technologies: ['PHP', 'Tailwind CSS'],
      link: 'https://instacash.rw/',
    },
    {
      title: 'CBFinance',
      category: 'web',
      image: '/images/cbfinance.png',
      description: 'A comprehensive accounting firm website offering professional financial services and accounting solutions for businesses.',
      technologies: ['PHP', 'Tailwind CSS'],
      link: 'https://cbfinance.rw/index.php',
    },
    {
      title: 'Sparkholding',
      category: 'web',
      image: '/images/sparkholding.png',
      description: 'An investment management platform that manages investor payments and provides secure online payment solutions.',
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
      link: 'https://www.sparkholding.rw/',
    },
    {
      title: 'Imboni E-Learning Platform',
      category: 'web',
      image: '/images/imboni.jpg',
      description: 'A comprehensive educational learning system designed to facilitate online education with interactive courses and progress tracking.',
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      link: 'https://imboni-e-learning.vercel.app/',
    },
    {
      title: 'Tora Rwanda - Blockchain Voting System',
      category: 'blockchain',
      image: '/images/tora.jpg',
      description: 'An innovative blockchain-based voting system integrated with AI for secure, transparent, and tamper-proof elections in Rwanda.',
      technologies: ['Blockchain', 'AI/ML', 'React', 'Web3.js', 'Smart Contracts', 'Next.js'],
      link: 'https://torarwanda.vercel.app/',
    },
    {
      title: 'MKMS - Military Kit Management System',
      category: 'web',
      image: '/images/mkms.jpg',
      description: 'A comprehensive military kit management system designed for efficient tracking and distribution of military equipment.',
      technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      link: 'https://mkms.vercel.app/pages/login',
    },
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Web', value: 'web' },
    { name: 'Blockchain', value: 'blockchain' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: 'var(--background-tertiary)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>My Projects</h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
            Here are my featured projects showcasing my skills in web development, blockchain technology, and AI integration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className="px-6 py-2 rounded-full transition-all duration-300 glow-hover"
              style={{
                backgroundColor: activeFilter === filter.value ? 'var(--primary)' : 'var(--glass-background)',
                color: activeFilter === filter.value ? 'white' : 'var(--foreground)',
                border: `1px solid ${activeFilter === filter.value ? 'var(--primary)' : 'var(--card-border)'}`
              }}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden glow-hover interactive-card flex flex-col h-full"
            >
              <div
                className="relative h-48 w-full overflow-hidden flex-shrink-0"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <h4 className="text-white font-bold text-lg text-center px-4">{project.title}</h4>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300 self-start mt-auto"
                >
                  View 80
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ishimweghislain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
          >
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
