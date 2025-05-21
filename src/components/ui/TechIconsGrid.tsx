'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the technology icons with their colors and logos
const technologies = [
  { name: 'HTML', color: '#E34F26', icon: 'html5' },
  { name: 'CSS', color: '#1572B6', icon: 'css3' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'js' },
  { name: 'TypeScript', color: '#3178C6', icon: 'typescript' },
  { name: 'React', color: '#61DAFB', icon: 'react' },
  { name: 'Next.js', color: '#000000', icon: 'nextjs' },
  { name: 'Node.js', color: '#339933', icon: 'nodejs' },
  { name: 'Python', color: '#3776AB', icon: 'python' },
  { name: 'PHP', color: '#777BB4', icon: 'php' },
  { name: 'Java', color: '#007396', icon: 'java' },
  { name: 'C#', color: '#239120', icon: 'csharp' },
  { name: 'MongoDB', color: '#47A248', icon: 'mongodb' },
  { name: 'MySQL', color: '#4479A1', icon: 'mysql' },
  { name: 'PostgreSQL', color: '#336791', icon: 'postgresql' },
  { name: 'GraphQL', color: '#E10098', icon: 'graphql' },
  { name: 'Docker', color: '#2496ED', icon: 'docker' },
  { name: 'Git', color: '#F05032', icon: 'git' },
  { name: 'AWS', color: '#FF9900', icon: 'aws' },
  { name: 'Firebase', color: '#FFCA28', icon: 'firebase' },
  { name: 'Tailwind', color: '#38B2AC', icon: 'tailwindcss' },
  { name: 'Three.js', color: '#000000', icon: 'threejs' },
  { name: 'Web3.js', color: '#F16822', icon: 'web3js' },
];

// Component for a single technology icon
const TechIcon = ({ name, color, icon, index }: { name: string; color: string; icon: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col items-center justify-center p-2"
    >
      <div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 relative overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
        style={{
          backgroundColor: `${color}20`,
          boxShadow: isHovered ? `0 0 20px ${color}80` : 'none',
          transform: `rotate(${index % 2 === 0 ? '5deg' : '-5deg'})`,
        }}
      >
        {/* Animated background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${color}80, transparent)`,
            animation: `pulse-${index} 3s infinite alternate`
          }}
        />

        {/* Rotating border */}
        <div
          className="absolute inset-0 rounded-full border-2 opacity-50"
          style={{
            borderColor: color,
            animation: `spin-${index} ${8 + index % 5}s linear infinite`
          }}
        />

        {/* Icon */}
        <div
          className="relative z-10 text-3xl md:text-4xl font-bold flex items-center justify-center w-full h-full"
          style={{ color }}
        >
          {getIconElement(icon)}
        </div>
      </div>
      <span className="text-sm text-gray-300 mt-2 font-medium">{name}</span>
    </motion.div>
  );
};

// Function to get the icon element based on the icon name
const getIconElement = (icon: string) => {
  // This is a simplified version - in a real app, you'd use actual SVG icons or an icon library
  switch (icon) {
    case 'html5':
      return <span className="tech-icon">HTML</span>;
    case 'css3':
      return <span className="tech-icon">CSS</span>;
    case 'js':
      return <span className="tech-icon">JS</span>;
    case 'typescript':
      return <span className="tech-icon">TS</span>;
    case 'react':
      return <span className="tech-icon">⚛️</span>;
    case 'nextjs':
      return <span className="tech-icon">N.js</span>;
    case 'nodejs':
      return <span className="tech-icon">Node</span>;
    case 'python':
      return <span className="tech-icon">Py</span>;
    case 'php':
      return <span className="tech-icon">PHP</span>;
    case 'java':
      return <span className="tech-icon">Java</span>;
    case 'csharp':
      return <span className="tech-icon">C#</span>;
    case 'mongodb':
      return <span className="tech-icon">Mongo</span>;
    case 'mysql':
      return <span className="tech-icon">SQL</span>;
    case 'postgresql':
      return <span className="tech-icon">PG</span>;
    case 'graphql':
      return <span className="tech-icon">GQL</span>;
    case 'docker':
      return <span className="tech-icon">🐳</span>;
    case 'git':
      return <span className="tech-icon">Git</span>;
    case 'aws':
      return <span className="tech-icon">AWS</span>;
    case 'firebase':
      return <span className="tech-icon">🔥</span>;
    case 'tailwindcss':
      return <span className="tech-icon">TW</span>;
    case 'threejs':
      return <span className="tech-icon">3JS</span>;
    case 'web3js':
      return <span className="tech-icon">W3</span>;
    default:
      return <span className="tech-icon">?</span>;
  }
};

// Main component
const TechIconsGrid = () => {
  // Generate CSS for the animations
  useEffect(() => {
    const style = document.createElement('style');
    let keyframes = '';

    technologies.forEach((_, index) => {
      // Pulse animation for the background
      keyframes += `
        @keyframes pulse-${index} {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1.2) rotate(${Math.random() * 20}deg); }
        }
      `;

      // Spin animation for the border
      keyframes += `
        @keyframes spin-${index} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
    });

    style.innerHTML = keyframes;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h4 className="text-xl text-blue-400 font-bold inline-block relative">
            My Tech Stack
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
          </h4>
        </motion.div>

        {/* Icons Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <TechIcon
              key={tech.name}
              name={tech.name}
              color={tech.color}
              icon={tech.icon}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechIconsGrid;
