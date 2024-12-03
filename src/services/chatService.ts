import { ChatRequest, ChatResponse } from '../types/chat';
import { API_CONFIG } from '../utils/constants';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/chat`, {
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
  const response = await fetch(`${API_CONFIG.BASE_URL}/clear_history?user_id=${userId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to clear history');
  }
}