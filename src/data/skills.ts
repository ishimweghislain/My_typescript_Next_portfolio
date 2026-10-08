export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    isCore?: boolean;
  }[];
}

export const coreSkillNames = new Set([
  "MERN",
  "Next.js",
  "TypeScript",
  "NestJS",
  "Laravel",
  "PHP",
  "PostgreSQL",
  "MongoDB",
  "React Native",
  "Flutter",
  "Ethereum"
]);

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", isCore: true },
      { name: "JavaScript", isCore: false },
      { name: "PHP", isCore: true },
      { name: "Python", isCore: false },
      { name: "Solidity", isCore: false },
      { name: "C", isCore: false },
      { name: "Java (basic)", isCore: false }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", isCore: true },
      { name: "React", isCore: false },
      { name: "Flutter", isCore: true },
      { name: "React Native", isCore: true },
      { name: "Tailwind CSS", isCore: false },
      { name: "PWA", isCore: false },
      { name: "Framer Motion", isCore: false },
      { name: "HTML5 / CSS3", isCore: false },
      { name: "Bootstrap", isCore: false }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "NestJS", isCore: true },
      { name: "Laravel", isCore: true },
      { name: "Node.js", isCore: false },
      { name: "Express", isCore: false },
      { name: "Django", isCore: false },
      { name: "REST APIs", isCore: false },
      { name: "Socket.io", isCore: false },
      { name: "Prisma", isCore: false },
      { name: "Mongoose", isCore: false },
      { name: "JWT Auth", isCore: false }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", isCore: true },
      { name: "MongoDB", isCore: true },
      { name: "MySQL", isCore: false },
      { name: "Redis", isCore: false },
      { name: "Firebase", isCore: false },
      { name: "Oracle", isCore: false }
    ]
  },
  {
    title: "DevOps & Hosting",
    skills: [
      { name: "Docker", isCore: false },
      { name: "Linux (Apache, Nginx)", isCore: false },
      { name: "CI/CD", isCore: false },
      { name: "GitHub Actions", isCore: false },
      { name: "Vercel", isCore: false },
      { name: "Netlify", isCore: false },
      { name: "cPanel", isCore: false }
    ]
  },
  {
    title: "Blockchain & Tools",
    skills: [
      { name: "Ethereum", isCore: true },
      { name: "Solidity", isCore: false },
      { name: "Smart Contracts", isCore: false },
      { name: "MTN MoMo Integration", isCore: false },
      { name: "Git", isCore: false },
      { name: "Figma", isCore: false },
      { name: "Project Management", isCore: false },
      { name: "Machine Learning (basics)", isCore: false }
    ]
  }
];
