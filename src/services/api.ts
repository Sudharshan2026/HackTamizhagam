import { ChatRequest, ChatResponse } from '../types/api';

const API_URL = 'http://localhost:8000';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}

export async function clearHistory(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/clear_history?user_id=${userId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to clear history');
  }
}