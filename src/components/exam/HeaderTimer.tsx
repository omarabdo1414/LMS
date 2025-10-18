import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const HeaderTimer: React.FC = () => {
  const { timeRemaining, timeLimit, isExamStarted } = useSelector((state: RootState) => state.exam);

  // Don't show timer if exam is not started or no time limit
  if (!isExamStarted || !timeRemaining || !timeLimit) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining > 50) {
      return 'text-green-600';
    } else if (percentageRemaining > 25) {
      return 'text-orange-600';
    } else {
      return 'text-red-600';
    }
  };

  const getWarningMessage = () => {
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining <= 25) {
      return '⚠️ Time running out!';
    } else if (percentageRemaining <= 50) {
      return '⚠️ Half time left';
    }
    return null;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`font-mono font-bold ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </div>
      {getWarningMessage() && (
        <div className={`text-xs ${getTimerColor()}`}>
          {getWarningMessage()}
        </div>
      )}
    </div>
  );
};

export default HeaderTimer;
