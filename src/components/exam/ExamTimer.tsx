import React from 'react';

interface ExamTimerProps {
  timeRemaining?: number;
  timeLimit?: number;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ timeRemaining, timeLimit }) => {
  if (!timeRemaining || !timeLimit) {
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
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (percentageRemaining > 25) {
      return 'text-orange-600 bg-orange-50 border-orange-200';
    } else {
      return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getTimerIcon = () => {
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining > 50) {
      return '🟢'; // Green circle
    } else if (percentageRemaining > 25) {
      return '🟠'; // Orange circle
    } else {
      return '🔴'; // Red circle
    }
  };

  const getWarningMessage = () => {
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining <= 25) {
      return 'Time is running out!';
    } else if (percentageRemaining <= 50) {
      return 'Half time remaining';
    }
    return null;
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300 ${getTimerColor()}`}>
      <span className="mr-2 text-lg">{getTimerIcon()}</span>
      <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
      {getWarningMessage() && (
        <span className="ml-2 text-sm font-normal">{getWarningMessage()}</span>
      )}
    </div>
  );
};

export default ExamTimer;
