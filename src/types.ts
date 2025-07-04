
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  experienceLevel: ExperienceLevel | null;
  enrolledCourses: string[];
  earnedTokens: number;
}

export interface Course {
  id: string;
  title: string;
  level: ExperienceLevel;
  sections: string[];
}

export interface SectionProgress {
  sectionId: string;
  completed: boolean;
}

export interface CourseProgress {
  courseId: string;
  sections: SectionProgress[];
}
