// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  category: string;
}

// Service type
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Skill type
export interface Skill {
  name: string;
  level: number;
}

// Skill category type
export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Social link type
export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

// Snowflake type
export interface Snowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  animationDuration: number;
  delay: number;
}
