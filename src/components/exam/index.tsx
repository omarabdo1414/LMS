'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { startExam, answerQuestion, nextQuestion, previousQuestion, submitExam, updateTimeRemaining } from '@/redux/exam';
import { Quiz } from '@/constants/interfaces';

// Import components
import ExamIntro from './ExamIntro';
import ExamProgress from './ExamProgress';
import QuestionCard from './QuestionCard';
import ExamControls from './ExamControls';
import ExamTimer from './ExamTimer';
import CompactTimer from './CompactTimer';
import FloatingTimer from './FloatingTimer';

interface ExamProps {
  examData?: Quiz;
  timeLimit?: number;
  timerStyle?: 'inline' | 'compact' | 'floating';
}

const Exam: React.FC<ExamProps> = ({ examData, timeLimit = 2, timerStyle = 'inline' }) => {
  const dispatch = useDispatch();
  const { 
    currentExam, 
    currentQuestionIndex, 
    answers, 
    isExamStarted, 
    isExamCompleted,
    timeRemaining 
  } = useSelector((state: RootState) => state.exam);

  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');

  // Use examData if provided, otherwise use currentExam from Redux
  const exam = examData || currentExam;

  // Timer effect
  useEffect(() => {
    if (!isExamStarted || isExamCompleted || !timeLimit) return;

    const timer = setInterval(() => {
      if (timeRemaining && timeRemaining > 0) {
        dispatch(updateTimeRemaining(timeRemaining - 1));
      } else {
        // Auto-submit when time runs out
        dispatch(submitExam());
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamCompleted, timeRemaining, timeLimit, dispatch]);

  // Get current answer for the current question
  useEffect(() => {
    if (exam && isExamStarted) {
      const currentQuestion = exam.questions[currentQuestionIndex];
      const existingAnswer = answers.find(ans => ans.questionId === currentQuestion.id);
      setCurrentAnswer(existingAnswer?.answer || '');
    }
  }, [currentQuestionIndex, exam, answers, isExamStarted]); 

  const handleStartExam = () => {
    if (exam) {
      dispatch(startExam({ exam, timeLimit }));
    }
  };

  const handleAnswerSelect = (answer: string | number) => {
    if (!exam || !isExamStarted) return;
    
    setCurrentAnswer(answer);
    
    const currentQuestion = exam.questions[currentQuestionIndex];
    
    dispatch(answerQuestion({
      questionId: currentQuestion.id,
      answer,
      timeSpent: 0 // You can implement more sophisticated timing
    }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleSubmit = () => {
    dispatch(submitExam());
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Exam Found</h2>
          <p className="text-gray-600">Please select an exam to begin.</p>
        </div>
      </div>
    );
  }

  if (isExamCompleted) {
    // Redirect to results page
    window.location.href = '/exam-result';
    return null;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const answeredQuestions = answers.length;
  const hasAnswered = currentAnswer !== '';

  const renderTimer = () => {
    switch (timerStyle) {
      case 'compact':
        return (
          <div className="flex justify-end mb-4">
            <CompactTimer 
              timeRemaining={timeRemaining} 
              timeLimit={timeLimit} 
            />
          </div>
        );
      case 'floating':
        return (
          <FloatingTimer 
            timeRemaining={timeRemaining} 
            timeLimit={timeLimit} 
            position="top-right"
          />
        );
      default:
        return (
          <div className="flex justify-end mb-6">
            <ExamTimer 
              timeRemaining={timeRemaining} 
              timeLimit={timeLimit} 
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!isExamStarted ? (
          <ExamIntro 
            exam={exam} 
            onStartExam={handleStartExam} 
            timeLimit={timeLimit}
          />
        ) : (
          <>
            {/* Timer - style based on prop */}
            {renderTimer()}

            <ExamProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={exam.questions.length}
              answeredQuestions={answeredQuestions}
            />

            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={exam.questions.length}
              selectedAnswer={currentAnswer}
              onAnswerSelect={handleAnswerSelect}
            />

            <ExamControls
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={exam.questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isLastQuestion={currentQuestionIndex === exam.questions.length - 1}
              hasAnswered={hasAnswered}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;