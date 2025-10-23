'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { resetExam } from '@/redux/exam';
import { createExamFromQuizState } from '@/utils/examUtils';
import Exam from '@/components/exam';

export default function ExamPage() {
  const dispatch = useDispatch();
  const { currentExam } = useSelector((state: RootState) => state.exam);
  const questionsState = useSelector((state: RootState) => state.questions);

  // Reset exam state when component mounts
  useEffect(() => {
    dispatch(resetExam());
  }, [dispatch]);

  // Create exam data from the quiz state (questions Redux)
  const examDataFromQuiz = createExamFromQuizState(questionsState);

  // Use exam data from questions state if available, otherwise use currentExam
  const examData = examDataFromQuiz || currentExam;

  // Get time limit from saved quiz settings, default to 60 minutes if not set
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeLimit = (examData as any)?.settings?.timeLimit || 60;

  return (
    <div>
      <Exam 
        examData={examData || undefined} 
        timeLimit={timeLimit} 
        timerStyle="compact" 
      />
    </div>
  );
}