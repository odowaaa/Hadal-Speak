export interface Lesson {
  id: string;
  level: number;
  lessonNumber: number;
  title: string;
  english: string;
  somali: string;
  keyWords: Record<string, string>;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  completedAt: string | null;
}
