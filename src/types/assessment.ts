export interface Question {
  id: number;
  category: string;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

export interface Answer {
  questionId: number;
  selectedOption: 'a' | 'b' | 'c' | 'd' | null;
}

export interface AssessmentState {
  currentQuestionIndex: number;
  answers: Answer[];
  isCompleted: boolean;
  setAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  skipQuestion: () => void;
}

export interface CategoryScore {
  scores: number[];
  categories: string[];
}

export interface AssessmentResults {
  username: string;
  assessment_results: {
    general_skills: CategoryScore;
    interests: CategoryScore;
    learning_styles: CategoryScore;
    problem_solving: CategoryScore;
    future_goals: CategoryScore;
    missed_questions: number;
  };
}