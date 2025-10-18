import React from 'react';
import { QuizQuestion } from '@/constants/interfaces';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string | number;
  onAnswerSelect: (answer: string | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}) => {
  const handleAnswerChange = (answer: string | number) => {
    onAnswerSelect(answer);
  };

  const isOptionSelected = (optionIndex: number) => {
    if (question.questionType === 'Multiple Choice') {
      return selectedAnswer === optionIndex;
    }
    return selectedAnswer === question.options[optionIndex].text;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Question {questionNumber} of {totalQuestions}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {question.questionText}
        </p>
      </div>

      <div className="space-y-3">
        {question.questionType === 'Multiple Choice' && question.options.map((option, index) => (
          <label
            key={option.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              isOptionSelected(index)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={isOptionSelected(index)}
              onChange={() => handleAnswerChange(index)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              isOptionSelected(index)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {isOptionSelected(index) && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span className={`flex-1 ${
              isOptionSelected(index) ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {option.text}
            </span>
          </label>
        ))}

        {question.questionType === 'True/False' && (
          <div className="space-y-3">
            <label
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedAnswer === 'true'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value="true"
                checked={selectedAnswer === 'true'}
                onChange={() => handleAnswerChange('true')}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswer === 'true'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === 'true' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`flex-1 ${
                selectedAnswer === 'true' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                True
              </span>
            </label>

            <label
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedAnswer === 'false'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value="false"
                checked={selectedAnswer === 'false'}
                onChange={() => handleAnswerChange('false')}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswer === 'false'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === 'false' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`flex-1 ${
                selectedAnswer === 'false' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                False
              </span>
            </label>
          </div>
        )}

        {(question.questionType === 'Short Answer' || question.questionType === 'Essay') && (
          <textarea
            value={selectedAnswer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your answer here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={question.questionType === 'Essay' ? 6 : 3}
          />
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100">
          {question.points} points
        </span>
        {question.required && (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 ml-2">
            Required
          </span>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
