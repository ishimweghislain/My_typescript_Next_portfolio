'use client';

import { motion } from 'framer-motion';
import TechIconsGrid from '../ui/TechIconsGrid';

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
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
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
              className="bg-black p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-500 mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
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
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Technologies I Work With</h3>

          {/* Technology Icons Grid */}
          <div className="relative w-full overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 z-0"></div>
            <div className="relative z-10">
              <TechIconsGrid />
            </div>
          </div>

          <div className="text-gray-400 text-center mt-4">
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
