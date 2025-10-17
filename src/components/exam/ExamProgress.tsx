import React from 'react';

interface ExamProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
}

const ExamProgress: React.FC<ExamProgressProps> = ({ 
  currentQuestion, 
  totalQuestions, 
  answeredQuestions 
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const answeredProgress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Progress</h2>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="relative">
        {/* Background progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          {/* Answered questions progress */}
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${answeredProgress}%` }}
          />
          {/* Current progress */}
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 absolute top-0"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{answeredQuestions} answered</span>
        </div>
      </div>
    </div>
  );
};

export default ExamProgress;
