import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../store/assessmentStore';
import { questions } from '../../data/questions';
import QuestionCard from './QuestionCard';
import AssessmentProgress from './AssessmentProgress';
import { ChevronLeft, ChevronRight, Forward } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    completeAssessment,
    skipQuestion,
  } = useAssessmentStore();

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.selectedOption;

  const handleComplete = () => {
    completeAssessment();
    navigate('/assessment/results');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <AssessmentProgress
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
      />
      
      <div className="mt-8">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setAnswer}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>

        <button
          onClick={skipQuestion}
          className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700"
        >
          <Forward className="w-5 h-5 mr-2" />
          Skip Question
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Assessment
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}