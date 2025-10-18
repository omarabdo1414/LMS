'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { startExam } from '@/redux/exam';
import { useRouter } from 'next/navigation';
import { sampleQuiz } from '@/components/exam/SampleQuizData';

export default function ExamDemoPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleStartDemoExam = () => {
    // Start the exam with sample data
    dispatch(startExam({ exam: sampleQuiz, timeLimit: 30 })); // 30 minutes
    // Navigate to exam page
    router.push('/exam');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Exam System Demo
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Sample Quiz: History of Ancient Civilizations</h2>
            <p className="text-blue-700 mb-4">
              This is a demonstration of the exam system. The quiz contains 4 questions covering ancient civilizations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="flex items-center">
                <span className="text-blue-600 font-medium mr-2">Questions:</span>
                <span className="text-blue-800">4</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-medium mr-2">Time Limit:</span>
                <span className="text-blue-800">30 minutes</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-medium mr-2">Total Points:</span>
                <span className="text-blue-800">45</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-medium mr-2">Question Types:</span>
                <span className="text-blue-800">Multiple Choice, True/False</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Features Demonstrated:</h3>
            <ul className="text-left text-yellow-700 space-y-2">
              <li>• Redux state management for exam data</li>
              <li>• Modular component structure</li>
              <li>• Timer functionality</li>
              <li>• Question navigation</li>
              <li>• Answer tracking</li>
              <li>• Score calculation</li>
              <li>• Detailed results page</li>
            </ul>
          </div>

          <button
            onClick={handleStartDemoExam}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-200"
          >
            Start Demo Exam
          </button>
        </div>
      </div>
    </div>
  );
}
