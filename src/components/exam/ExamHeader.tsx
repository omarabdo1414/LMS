import React from 'react';
import { Quiz } from '@/constants/interfaces';

interface ExamHeaderProps {
  exam: Quiz;
  timeRemaining?: number;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({ exam, timeRemaining }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">E</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">EduQuest</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Courses</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Calendar</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Messages</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {timeRemaining !== undefined && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <span className="text-red-600 font-medium">
                  Time: {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
