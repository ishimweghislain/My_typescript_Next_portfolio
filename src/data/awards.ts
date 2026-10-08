export interface AwardItem {
  title: string;
  issuer: string;
  detail?: string;
}

export const awards: AwardItem[] = [
  {
    title: "4th Place — Hack With Me Hackathon",
    issuer: "Hack With Me",
    detail: "Tora Rwanda blockchain voting system (out of ~30 teams)"
  },
  {
    title: "Leadership Award",
    issuer: "Saint Kizito",
    detail: "Church Coordinator of the Adventist Group at Saint Kizito"
  },
  {
    title: "Digital Skills Certificate (Phase 2)",
    issuer: "Digital Skills Training"
  }
];
