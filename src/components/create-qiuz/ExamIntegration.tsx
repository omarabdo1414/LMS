'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Play, Eye } from 'lucide-react';

const ExamIntegration: React.FC = () => {
  const router = useRouter();
  const { questions, currentQuiz } = useSelector((state: RootState) => state.questions);

  const canTakeExam = questions.length > 0 && currentQuiz?.title && currentQuiz?.description;

  const handleTakeExam = () => {
    if (canTakeExam) {
      router.push('/exam');
    }
  };

  const handlePreviewExam = () => {
    if (canTakeExam) {
      router.push('/exam?preview=true');
    }
  };

  if (!canTakeExam) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Ready to test your quiz?</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Add questions and set a title/description to take your exam.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-green-800">Your quiz is ready!</h3>
          <p className="text-sm text-green-700 mt-1">
            {questions.length} question{questions.length !== 1 ? 's' : ''} ready for testing.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handlePreviewExam}
            variant="outline"
            size="sm"
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            onClick={handleTakeExam}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-4 h-4 mr-1" />
            Take Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamIntegration;
