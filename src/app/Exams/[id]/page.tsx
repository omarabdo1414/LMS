"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getExamById } from "@/Apis/exam/exam";

interface Question {
  _id: string;
  text: string;
  type: string;
  options: string[];
  correctAnswer: string;
  points: number;
  exam: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ExamAnswers {
  [questionId: string]: string;
}


const ExamComponent = () => {
  const [examData, setExamData] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<ExamAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour default
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSubmitExam = useCallback(async () => {
    setIsSubmitted(true);
    // Here you would typically send answers to the server
    console.log("Exam submitted with answers:", answers);
    // For now, just show completion message
  }, [answers]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, isSubmitted, handleSubmitExam]);

  useEffect(() => {
    async function fetchExam() {
      try {
        const response = await getExamById();
        // Check if response is an array
        if (Array.isArray(response)) {
          setExamData(response);
        } else if (Array.isArray(response.data)) {
          // If response is an object with data property
          setExamData(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch exam data";
        setError(errorMessage);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, []);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < examData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (!examData.length)
    return <div className="p-4">No questions available.</div>;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Exam Submitted Successfully!</h1>
          <p className="text-green-600 mb-4">Thank you for completing the exam. Your answers have been recorded.</p>
          <p className="text-sm text-gray-600">Results will be available soon.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = examData[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = examData.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with timer and progress */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Online Exam</h1>
            <p className="text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Progress: {currentQuestionIndex + 1}/{totalQuestions}</span>
            <span>Answered: {answeredQuestions}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
            <h3 className="font-semibold mb-3">Questions</h3>
            <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
              {examData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`p-2 rounded text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : answers[examData[index]._id]
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">
                Question {currentQuestionIndex + 1} ({currentQuestion.points} points)
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {currentQuestion.type}
              </span>
            </div>

            <p className="mb-6 text-gray-700 text-lg">{currentQuestion.text}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    answers[currentQuestion._id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option}
                    checked={answers[currentQuestion._id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[currentQuestion._id] === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion._id] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            
            <div className="flex gap-3">
              {currentQuestionIndex === examData.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamComponent;
