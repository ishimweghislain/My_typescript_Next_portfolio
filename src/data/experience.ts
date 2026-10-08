export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  subperiod?: string;
  bullets: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "fullstack-software",
    role: "Full Stack Developer & Project Manager",
    company: "Fullstack Software Ltd",
    location: "Kigali, Rwanda",
    period: "March 2026 — Present",
    subperiod: "Professional Intern Feb — Mar 2026",
    bullets: [
      "Built and shipped Alamode.rw solo (Next.js, Prisma, PostgreSQL, Flutter, MoMo payments).",
      "Designed LoanMS's PostgreSQL database and built BNR (National Bank of Rwanda) regulatory reporting (Next.js + Laravel).",
      "Built Elimo.rw and Fullstack Domains solo.",
      "Built the Gear.rw frontend (React, PWA).",
      "Deploy and host client systems on Linux (Apache/Nginx), Docker, cPanel, Vercel, Netlify with CI/CD.",
      "Act as project manager on several client projects."
    ]
  },
  {
    id: "impanolabs",
    role: "Trainer, Software Development",
    company: "ImpanoLabs Training Center",
    location: "Kigali, Rwanda",
    period: "July 2025 — January 2026",
    bullets: [
      "Trained 50+ students in MERN stack, Laravel, Next.js with TypeScript, and modern development tooling."
    ]
  }
];
