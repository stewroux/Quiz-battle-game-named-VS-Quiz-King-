
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
