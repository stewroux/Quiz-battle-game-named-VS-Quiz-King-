
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum GameState {
  Start = 'START',
  CategorySelection = 'CATEGORY_SELECTION',
  Quiz = 'QUIZ',
  End = 'END',
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}
