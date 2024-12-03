import { Answer, Question, CategoryScore } from '../types/assessment';
import { ASSESSMENT_CATEGORIES, SKILL_TYPES } from './constants';

export function getMissedQuestions(answers: Answer[], questions: Question[]): number {
  const missedCount = answers.filter(answer => answer.selectedOption === null).length;
  const unansweredCount = questions.length - answers.length;
  return missedCount + unansweredCount;
}

export function getSkippedQuestionIds(answers: Answer[]): number[] {
  return answers
    .filter(answer => answer.selectedOption === null)
    .map(answer => answer.questionId);
}

export function calculateCategoryScores(answers: Answer[], questions: Question[]) {
  const categories = [...new Set(questions.map(q => q.category))];
  
  return categories.map(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryAnswers = answers.filter(a => 
      categoryQuestions.map(q => q.id).includes(a.questionId)
    );
    
    const score = {
      analytical: categoryAnswers.filter(a => a.selectedOption === 'a').length,
      creative: categoryAnswers.filter(a => a.selectedOption === 'b').length,
      collaborative: categoryAnswers.filter(a => a.selectedOption === 'c').length,
      practical: categoryAnswers.filter(a => a.selectedOption === 'd').length,
    };

    return {
      category,
      score,
      total: categoryQuestions.length,
    };
  });
}

export function formatCategoryScores(categoryScores: ReturnType<typeof calculateCategoryScores>): {
  [key: string]: CategoryScore;
} {
  return {
    general_skills: formatScoreCategory(categoryScores[0]),
    interests: formatScoreCategory(categoryScores[1]),
    learning_styles: formatScoreCategory(categoryScores[2]),
    problem_solving: formatScoreCategory(categoryScores[3]),
    future_goals: formatScoreCategory(categoryScores[4]),
  };
}

function formatScoreCategory(categoryScore: ReturnType<typeof calculateCategoryScores>[0]): CategoryScore {
  return {
    scores: [
      categoryScore.score.analytical,
      categoryScore.score.creative,
      categoryScore.score.collaborative,
      categoryScore.score.practical,
    ],
    categories: [
      SKILL_TYPES.ANALYTICAL,
      SKILL_TYPES.CREATIVE,
      SKILL_TYPES.COLLABORATIVE,
      SKILL_TYPES.PRACTICAL,
    ],
  };
}

export function getCareerRecommendations(categoryScores: ReturnType<typeof calculateCategoryScores>) {
  const totalScores = categoryScores.reduce(
    (acc, { score }) => ({
      analytical: acc.analytical + score.analytical,
      creative: acc.creative + score.creative,
      collaborative: acc.collaborative + score.collaborative,
      practical: acc.practical + score.practical,
    }),
    { analytical: 0, creative: 0, collaborative: 0, practical: 0 }
  );

  const recommendations = [];
  const maxScore = Math.max(...Object.values(totalScores));

  if (totalScores.analytical === maxScore) {
    recommendations.push('Data Analysis and Business Intelligence');
  }
  if (totalScores.creative === maxScore) {
    recommendations.push('UX/UI Design and Creative Direction');
  }
  if (totalScores.collaborative === maxScore) {
    recommendations.push('Project Management and Team Leadership');
  }
  if (totalScores.practical === maxScore) {
    recommendations.push('Software Development and Engineering');
  }

  return recommendations;
}