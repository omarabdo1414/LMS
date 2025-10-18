import React from 'react';

interface CompactTimerProps {
  timeRemaining?: number;
  timeLimit?: number;
  showWarning?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CompactTimer: React.FC<CompactTimerProps> = ({ 
  timeRemaining, 
  timeLimit, 
  showWarning = true,
  size = 'md' 
}) => {
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
      return 'text-green-600';
    } else if (percentageRemaining > 25) {
      return 'text-orange-600';
    } else {
      return 'text-red-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-2 py-1';
      case 'lg':
        return 'text-lg px-4 py-2';
      default:
        return 'text-base px-3 py-1.5';
    }
  };

  const getWarningMessage = () => {
    if (!showWarning) return null;
    
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining <= 25) {
      return '⚠️ Critical';
    } else if (percentageRemaining <= 50) {
      return '⚠️ Warning';
    }
    return null;
  };

  return (
    <div className={`inline-flex items-center font-mono ${getSizeClasses()} ${getTimerColor()}`}>
      <span className="font-bold">{formatTime(timeRemaining)}</span>
      {getWarningMessage() && (
        <span className="ml-1 text-xs">{getWarningMessage()}</span>
      )}
    </div>
  );
};

export default CompactTimer;
