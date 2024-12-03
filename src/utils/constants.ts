import { Message } from '../types/message';

export const INITIAL_MESSAGE: Message = {
  id: 1,
  type: 'ai',
  content: "Hello! I'm your AI Career Counselor. I'm here to help guide you through your career journey. Feel free to ask me about:\n\n• Career path recommendations\n• Skill development advice\n• Industry trends and insights\n• Job market analysis\n• Educational opportunities",
  timestamp: new Date(),
};

export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  DEFAULT_USER: 'default-user',
};

export const ASSESSMENT_CATEGORIES = {
  GENERAL_SKILLS: 'General Skills Assessment',
  INTERESTS: 'Interest Identification',
  LEARNING_STYLES: 'Learning Styles',
  PROBLEM_SOLVING: 'Problem-Solving and Decision-Making',
  FUTURE_GOALS: 'Future Goals and Ambitions',
} as const;

export const SKILL_TYPES = {
  ANALYTICAL: 'Analytical',
  CREATIVE: 'Creative',
  COLLABORATIVE: 'Collaborative',
  PRACTICAL: 'Practical',
} as const;