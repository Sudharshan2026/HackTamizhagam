import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/api';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex items-start space-x-3 ${isAI ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>
      <div className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
        isAI ? 'bg-white border border-gray-200' : 'bg-blue-600 text-white'
      }`}>
        <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}