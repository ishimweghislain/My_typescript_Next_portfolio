'use client';

import { motion } from 'framer-motion';
import TechIconsGrid from '../ui/TechIconsGrid';
import SkillBar from '../ui/SkillBar';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3/SASS', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React.js', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Vue.js', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'Django', level: 75 },
        { name: 'PHP', level: 78 },
        { name: 'Laravel', level: 75 },
        { name: 'MongoDB', level: 82 },
        { name: 'MySQL/PostgreSQL', level: 80 },
      ],
    },
    {
      title: 'Design & Others',
      skills: [
        { name: 'Adobe Photoshop', level: 85 },
        { name: 'Adobe Illustrator', level: 80 },
        { name: 'Figma', level: 88 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'Content Creation', level: 82 },
        { name: 'Git/GitHub', level: 85 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20" style={{ backgroundColor: 'var(--background-secondary)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>My Skills</h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
            I have acquired a diverse range of skills throughout my career as a fullstack developer, software engineer, graphic designer, and content creator.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 glow-hover"
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--primary)' }}>{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    skill={skill.name}
                    percentage={skill.level}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--foreground)' }}>Technologies I Work With</h3>

          {/* Technology Icons Grid */}
          <div className="relative w-full overflow-hidden glass-card p-6">
            <div className="absolute inset-0 bg-gradient-to-b opacity-20 z-0" style={{
              background: `linear-gradient(to bottom, var(--primary), var(--accent))`
            }}></div>
            <div className="relative z-10">
              <TechIconsGrid />
            </div>
          </div>

          <div className="text-center mt-4" style={{ color: 'var(--foreground-muted)' }}>
            <p className="italic">
              Hover over the icons to see the technologies I work with
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
