export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}