import React from 'react';
import { Quiz } from '@/constants/interfaces';

interface ExamIntroProps {
  exam: Quiz;
  onStartExam: () => void;
  timeLimit?: number;
}

const ExamIntro: React.FC<ExamIntroProps> = ({ exam, onStartExam, timeLimit }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {exam.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {exam.description}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Exam Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center">
              <span className="text-blue-600 font-medium mr-2">Questions:</span>
              <span className="text-blue-800">{exam.questions.length}</span>
            </div>
            {timeLimit && (
              <div className="flex items-center">
                <span className="text-blue-600 font-medium mr-2">Time Limit:</span>
                <span className="text-blue-800">{timeLimit} minutes</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-blue-600 font-medium mr-2">Total Points:</span>
              <span className="text-blue-800">
                {exam.questions.reduce((sum, q) => sum + q.points, 0)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 font-medium mr-2">Required Questions:</span>
              <span className="text-blue-800">
                {exam.questions.filter(q => q.required).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Instructions</h3>
          <ul className="text-left text-yellow-700 space-y-2">
            <li>• Read each question carefully before answering</li>
            <li>• You can navigate between questions using Previous/Next buttons</li>
            <li>• Make sure to answer all required questions</li>
            {timeLimit && <li>• You have {timeLimit} minutes to complete the exam</li>}
            <li>• Click "Submit Quiz" when you're ready to finish</li>
          </ul>
        </div>

        <button
          onClick={onStartExam}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-200"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default ExamIntro;
