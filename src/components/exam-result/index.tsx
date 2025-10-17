'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ExamAnswer, QuizQuestion } from '@/constants/interfaces';
const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#3B82F6"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-gray-800">{Math.round(percentage)}%</div>
        <div className="text-sm text-gray-500">Score</div>
      </div>
    </div>
  );
};

const ExamResult: React.FC = () => {
  const router = useRouter();
  const { currentExam, answers, score, totalQuestions } = useSelector((state: RootState) => state.exam);

  if (!currentExam || !answers.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">It seems you haven&apos;t completed an exam yet.</p>
          <button
            onClick={() => router.push('/exam')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Exam
          </button>
        </div>
      </div>
    );
  }

  const correctAnswers = answers.filter((answer: ExamAnswer) => answer.isCorrect).length;

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Great Job!';
    if (score >= 70) return 'Good Work!';
    if (score >= 60) return 'Good Effort!';
    return 'Keep Practicing!';
  };

  const getAnswerDisplay = (question: QuizQuestion, userAnswer: string | number | undefined) => {
    if (userAnswer === undefined) return 'Not answered';
    
    if (question.questionType === 'Multiple Choice') {
      const optionIndex = typeof userAnswer === 'number' ? userAnswer : parseInt(String(userAnswer));
      return question.options[optionIndex]?.text || String(userAnswer);
    }
    
    if (question.questionType === 'True/False') {
      return String(userAnswer);
    }
    
    return String(userAnswer);
  };

  const getCorrectAnswerDisplay = (question: QuizQuestion) => {
    if (question.questionType === 'Multiple Choice') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return question.options.find((opt: any) => opt.isCorrect)?.text || 'N/A';
    }
    
    if (question.questionType === 'True/False') {
      return String(question.correctAnswer);
    }
    
    return String(question.correctAnswer) || 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-600">{currentExam.title}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col items-center">
            <CircularProgress percentage={score} />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{getScoreMessage(score)}</h2>
              <p className="text-gray-600">
                You answered <span className="font-semibold text-gray-900">{correctAnswers} out of {totalQuestions}</span> questions correctly.
              </p>
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('question-review')?.offsetTop, behavior: 'smooth' })}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>

        {/* Question Review Section */}
        <div id="question-review" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Review</h2>
          <div className="space-y-4">
            {currentExam.questions.map((question: QuizQuestion, index: number) => {
              const answer = answers.find((ans: ExamAnswer) => ans.questionId === question.id);
              const isCorrect = answer?.isCorrect || false;
              const userAnswer = answer?.answer;

              return (
                <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Question {index + 1}: {question.questionText}
                      </h3>
                      
                      <div className="space-y-2 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">Your Answer: </span>
                          <span className={`text-sm font-medium ${isCorrect ? 'text-gray-900' : 'text-gray-900'}`}>
                            {getAnswerDisplay(question, userAnswer)}
                          </span>
                        </div>
                        
                        {!isCorrect && (
                          <div>
                            <span className="text-sm text-gray-600">Correct Answer: </span>
                            <span className="text-sm font-medium text-green-700">
                              {getCorrectAnswerDisplay(question)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Explanation for incorrect answers */}
                      {!isCorrect && question.explanation && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                          <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                          <p className="text-sm text-blue-700">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/exam')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Retake Exam
          </button>
          <button
            onClick={() => router.push('/home')}
            className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;