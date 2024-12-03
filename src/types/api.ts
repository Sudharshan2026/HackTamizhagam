export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  user_id: string;
  question: string;
}

export interface ChatResponse {
  answer: string;
}