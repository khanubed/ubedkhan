export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Design' | 'DevOps';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
}
