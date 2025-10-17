import React from 'react';

interface ExamControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  hasAnswered: boolean;
}

const ExamControls: React.FC<ExamControlsProps> = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  hasAnswered,
}) => {
  return (
    <div className="flex items-center justify-between bg-white border-t border-gray-200 px-6 py-4">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 1}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentQuestion === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-3">
        {!isLastQuestion ? (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              hasAnswered
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasAnswered}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamControls;
