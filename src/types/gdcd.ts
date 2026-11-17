export type GradeLevel = '6' | '7' | '8' | '9';

export type ScreenName = 'welcome' | 'map' | 'quiz' | 'summary';

export type ScenarioIconKey =
  | 'alarm'
  | 'shirt'
  | 'book'
  | 'tv'
  | 'palette'
  | 'message'
  | 'wallet'
  | 'rain'
  | 'chef'
  | 'compass';

export interface Scenario {
  id: number;
  title: string;
  category: string;
  characterName: string;
  storyContext: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  lessonCore: string;
  icon: ScenarioIconKey;
}

export interface AnswerRecord {
  scenarioId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface StudentSession {
  name: string;
  grade: GradeLevel;
  answers: Record<number, AnswerRecord>;
  score: number;
  unlockedUpTo: number;
  completedAt: string | null;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  grade: GradeLevel;
  score: number;
  correctCount: number;
  date: string;
}
