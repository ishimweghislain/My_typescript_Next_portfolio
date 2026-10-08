'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects, featuredProjects, projectCategories, type ProjectCategory } from '@/data';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');

  // Compute count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    for (const p of projects) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered list for the main grid
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">04 / PROJECTS</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Production Systems &amp; Builds
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Real platforms engineered for clients across fintech, e-commerce, property management, and Web3.
              </p>
            </div>
            <div className="mono text-xs text-[var(--muted)] shrink-0">
              {projects.length} Total Projects • {featuredProjects.length} Featured
            </div>
          </div>
        </div>

        {/* Featured Projects Highlight Row */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <h3 className="text-sm font-semibold mono uppercase tracking-wider text-[var(--text)]">
              Featured Flagships
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={`featured-${project.slug}`} project={project} featured />
            ))}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="pt-8 border-t border-[var(--border)] mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mono text-[var(--text)]">
                All Projects
              </span>
              <span className="mono text-xs text-[var(--muted)]">
                ({filteredProjects.length})
              </span>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => {
                const count = categoryCounts[category] || 0;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="chip transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? 'var(--accent)' : 'var(--surface-2)',
                      color: isActive ? 'var(--accent-fg)' : 'var(--muted)',
                      borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <span>{category}</span>
                    <span
                      className="opacity-70 text-[0.65rem]"
                      style={{ color: isActive ? 'var(--accent-fg)' : 'var(--muted)' }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtered Projects Grid with animated transitions */}
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* GitHub link callout */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/ishimweghislain"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mono text-xs"
          >
            Explore more repositories on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
