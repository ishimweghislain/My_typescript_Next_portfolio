'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  skill, 
  percentage, 
  color = 'var(--primary)', 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span 
          className="font-medium text-sm md:text-base"
          style={{ color: 'var(--foreground)' }}
        >
          {skill}
        </span>
        <span 
          className="text-sm font-bold"
          style={{ color }}
        >
          {percentage}%
        </span>
      </div>
      
      <div className="relative">
        {/* Background bar */}
        <div 
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--background-tertiary)' }}
        >
          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ 
              duration: 1.5, 
              delay: delay + 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="h-full rounded-full relative overflow-hidden"
            style={{ backgroundColor: color }}
          >
            {/* Animated shine effect */}
            <motion.div
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: '50%' }}
            />
          </motion.div>
        </div>
        
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: delay + 0.5 }}
          viewport={{ once: true }}
          className="absolute inset-0 rounded-full blur-sm"
          style={{ 
            backgroundColor: color,
            width: `${percentage}%`,
            height: '3px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;
