export interface SocialLink {
  name: string;
  url: string;
}

export interface Metric {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  based: string;
  currentCompany: string;
  availability: string;
  tagline: string;
  bio: string;
  email: string;
  socials: SocialLink[];
  metrics: Metric[];
  languages: { language: string; level: string }[];
  educationBrief: string;
}

export const profile: Profile = {
  name: "Ishimwe Ghislain",
  role: "Full Stack Developer",
  based: "Kamonyi, Rwanda",
  currentCompany: "Fullstack Software Ltd",
  availability: "Open to remote full stack, backend and DevOps roles",
  tagline: "I design, build and deploy fintech, e-commerce and education platforms, from database to server.",
  bio: "I'm a full stack developer based in Kamonyi, Rwanda, currently at Fullstack Software Ltd, where I build, deploy and manage production systems for clients across fintech, e-commerce, property management, insurance and media. I work end to end: database design, APIs, web and mobile interfaces, servers and CI/CD. I'm also a trainer who has taught 50+ students, and a BSc Software Engineering student at AUCA. I enjoy building practical technology for Rwandan businesses and education.",
  email: "ishimweghislain82@gmail.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ishimwe-ghislain-b26ba6288" },
    { name: "Instagram", url: "https://instagram.com/ghislain_ishimwe" },
    { name: "GitHub", url: "https://github.com/ishimweghislain" }
  ],
  metrics: [
    { value: "1+", numericValue: 1, suffix: "+ yr", label: "professional experience" },
    { value: "14+", numericValue: 14, suffix: "+", label: "production platforms" },
    { value: "50+", numericValue: 50, suffix: "+", label: "students trained" },
    { value: "4th", numericValue: 4, suffix: "th place", label: "Hack With Me hackathon" }
  ],
  languages: [
    { language: "Kinyarwanda", level: "Native" },
    { language: "English", level: "Fluent" },
    { language: "French", level: "Intermediate" }
  ],
  educationBrief: "Studying Software Engineering at AUCA"
};
