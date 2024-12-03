import { create } from 'zustand';
import { AssessmentState, Answer } from '../types/assessment';
import { questions } from '../data/questions';

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  isCompleted: false,

  setAnswer: (answer: Answer) =>
    set((state) => ({
      answers: [
        ...state.answers.filter((a) => a.questionId !== answer.questionId),
        answer,
      ],
    })),

  skipQuestion: () =>
    set((state) => {
      const currentQuestion = questions[state.currentQuestionIndex];
      return {
        answers: [
          ...state.answers.filter((a) => a.questionId !== currentQuestion.id),
          { questionId: currentQuestion.id, selectedOption: null },
        ],
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          questions.length - 1
        ),
      };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        questions.length - 1
      ),
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),

  completeAssessment: () =>
    set(() => ({
      isCompleted: true,
    })),

  resetAssessment: () =>
    set(() => ({
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
    })),
}));