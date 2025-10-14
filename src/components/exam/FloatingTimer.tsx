import React from 'react';

interface FloatingTimerProps {
  timeRemaining?: number;
  timeLimit?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const FloatingTimer: React.FC<FloatingTimerProps> = ({ 
  timeRemaining, 
  timeLimit, 
  position = 'top-right' 
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
      return 'bg-green-500 text-white';
    } else if (percentageRemaining > 25) {
      return 'bg-orange-500 text-white';
    } else {
      return 'bg-red-500 text-white';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getWarningMessage = () => {
    const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
    
    if (percentageRemaining <= 25) {
      return '⚠️ Time is running out!';
    } else if (percentageRemaining <= 50) {
      return '⚠️ Half time remaining';
    }
    return null;
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      <div className={`${getTimerColor()} px-4 py-2 rounded-lg shadow-lg border-2 border-white`}>
        <div className="flex flex-col items-center">
          <div className="font-mono font-bold text-lg">
            {formatTime(timeRemaining)}
          </div>
          {getWarningMessage() && (
            <div className="text-xs mt-1 text-center">
              {getWarningMessage()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingTimer;
