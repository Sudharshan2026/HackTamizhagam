import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MissedQuestionsAlertProps {
  missedCount: number;
  totalQuestions: number;
}

export default function MissedQuestionsAlert({ missedCount, totalQuestions }: MissedQuestionsAlertProps) {
  if (missedCount === 0) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            {missedCount} Question{missedCount > 1 ? 's' : ''} Skipped
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              You skipped {missedCount} out of {totalQuestions} questions. 
              For more accurate career recommendations, consider retaking the assessment 
              and answering all questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}