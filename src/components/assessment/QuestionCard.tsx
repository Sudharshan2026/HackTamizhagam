import React from 'react';
import { Question, Answer } from '../../types/assessment';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: Answer) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm text-blue-600 font-medium mb-2">
        {question.category}
      </h3>
      <p className="text-lg font-medium text-gray-900 mb-4">{question.text}</p>
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() =>
              onAnswerSelect({
                questionId: question.id,
                selectedOption: key as 'a' | 'b' | 'c' | 'd',
              })
            }
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              selectedAnswer === key
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{key.toUpperCase()}.</span> {value}
          </button>
        ))}
      </div>
    </div>
  );
}