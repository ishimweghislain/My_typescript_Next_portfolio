import projectsData from './projects.json';

export type ProjectCategory =
  | 'Fintech'
  | 'E-commerce'
  | 'Education'
  | 'Blockchain'
  | 'Business'
  | 'Media';

export type ProjectRole =
  | 'Solo build'
  | 'Frontend, team project'
  | 'Team'
  | 'Team of 4';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured?: boolean;
  url: string;
  description: string;
  technologies: string[];
  role: ProjectRole | string;
  year?: number;
  previewRefresh?: boolean;
  fallbackImage?: string;
}

export const projects: Project[] = projectsData as Project[];

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Fintech',
  'E-commerce',
  'Education',
  'Blockchain',
  'Business',
  'Media'
];

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export * from './profile';
export * from './experience';
export * from './skills';
export * from './education';
export * from './awards';
