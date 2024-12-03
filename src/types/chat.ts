export interface ChatRequest {
  user_id: string;
  question: string;
}

export interface ChatResponse {
  answer: string;
}