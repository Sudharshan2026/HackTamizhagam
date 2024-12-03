import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../store/assessmentStore';
import { questions } from '../../data/questions';
import { BarChart, RefreshCcw, Download } from 'lucide-react';
import RadarChart from './RadarChart';
import MissedQuestionsAlert from './MissedQuestionsAlert';
import { saveAssessmentData } from '../../services/storageService';
import { 
  getMissedQuestions, 
  calculateCategoryScores, 
  formatCategoryScores,
  getCareerRecommendations 
} from '../../utils/assessment';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const { answers, resetAssessment } = useAssessmentStore();

  const missedQuestions = getMissedQuestions(answers, questions);
  const categoryScores = calculateCategoryScores(answers, questions);
  const recommendations = getCareerRecommendations(categoryScores);

  const handleRetake = () => {
    resetAssessment();
    navigate('/assessment');
  };

  const handleDownload = () => {
    const formattedScores = formatCategoryScores(categoryScores);
    const assessmentData = {
      username: 'user123', // In a real app, this would come from user authentication
      assessment_results: {
        ...formattedScores,
        missed_questions: missedQuestions,
      },
    };

    saveAssessmentData(assessmentData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Assessment Results</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 text-sm text-green-600 hover:text-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Results
            </button>
            <button
              onClick={handleRetake}
              className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </button>
          </div>
        </div>

        <MissedQuestionsAlert 
          missedCount={missedQuestions} 
          totalQuestions={questions.length} 
        />

        <div className="mb-8">
          <RadarChart categoryScores={categoryScores} />
        </div>

        <div className="space-y-8">
          {categoryScores.map(({ category, score, total }) => (
            <div key={category} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Analytical Thinking</span>
                    <span className="text-sm font-medium">{Math.round((score.analytical / total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(score.analytical / total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Creative Thinking</span>
                    <span className="text-sm font-medium">{Math.round((score.creative / total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(score.creative / total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Collaborative Skills</span>
                    <span className="text-sm font-medium">{Math.round((score.collaborative / total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(score.collaborative / total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Practical Skills</span>
                    <span className="text-sm font-medium">{Math.round((score.practical / total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${(score.practical / total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <BarChart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Path Recommendations</h4>
              <p className="text-gray-700">
                Based on your assessment results, you show strong aptitude for the following career paths:
              </p>
              <ul className="mt-4 space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      index === 0 ? 'bg-blue-600' :
                      index === 1 ? 'bg-purple-600' :
                      index === 2 ? 'bg-green-600' :
                      'bg-orange-600'
                    }`} />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}