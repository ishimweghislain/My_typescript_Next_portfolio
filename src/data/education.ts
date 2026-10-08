export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

export const education: EducationItem[] = [
  {
    institution: "Adventist University of Central Africa (AUCA)",
    degree: "BSc Software Engineering",
    period: "2025 — 2029",
    detail: "Year 2"
  },
  {
    institution: "Saint Kizito",
    degree: "A-Level Secondary Education",
    period: "2022 — 2025"
  }
];
