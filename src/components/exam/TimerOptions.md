# Exam Timer Components

This document explains the different timer components available for the exam system.

## Timer Components Overview

### 1. ExamTimer (Default)
- **File**: `ExamTimer.tsx`
- **Usage**: Full-featured timer with color coding and warning messages
- **Features**:
  - Green (50%+ time remaining)
  - Orange (25-50% time remaining)  
  - Red (0-25% time remaining)
  - Warning messages when time is running low
  - Large, prominent display

### 2. CompactTimer
- **File**: `CompactTimer.tsx`
- **Usage**: Smaller timer for headers, sidebars, or limited space
- **Features**:
  - Same color coding as ExamTimer
  - Compact size options (sm, md, lg)
  - Minimal warning messages
  - Perfect for integration with existing headers

### 3. FloatingTimer
- **File**: `FloatingTimer.tsx`
- **Usage**: Fixed position timer that floats over content
- **Features**:
  - Fixed positioning (top-right, top-left, bottom-right, bottom-left)
  - Color-coded background
  - Always visible during exam
  - High z-index to stay on top

### 4. HeaderTimer
- **File**: `HeaderTimer.tsx`
- **Usage**: Redux-connected timer for header integration
- **Features**:
  - Automatically connects to exam Redux state
  - Only shows when exam is active
  - Perfect for existing header components
  - Color coding based on time remaining

## Color Coding System

All timers use the same color coding system:

- **Green**: 50%+ time remaining
- **Orange**: 25-50% time remaining
- **Red**: 0-25% time remaining

## Usage Examples

### In Exam Component
```tsx
// Default inline timer
<Exam examData={quiz} timerStyle="inline" />

// Compact timer (good for headers/sidebars)
<Exam examData={quiz} timerStyle="compact" />

// Floating timer
<Exam examData={quiz} timerStyle="floating" />
```

### In Header Component
```tsx
import HeaderTimer from '@/components/exam/HeaderTimer';

function Header() {
  return (
    <header>
      <div className="flex justify-between">
        <div>Logo</div>
        <HeaderTimer /> {/* Automatically shows/hides based on exam state */}
      </div>
    </header>
  );
}
```

### Standalone Usage
```tsx
import CompactTimer from '@/components/exam/CompactTimer';

function MyComponent() {
  return (
    <div>
      <CompactTimer 
        timeRemaining={1800} 
        timeLimit={60} 
        size="sm" 
        showWarning={true}
      />
    </div>
  );
}
```

## Integration with Existing Layout

Since the exam header has been removed, you can now integrate timers into your existing header/sidebar:

### Option 1: Add to Existing Header
```tsx
// In your existing header component
import HeaderTimer from '@/components/exam/HeaderTimer';

function Header() {
  return (
    <div className="header">
      <div className="left-section">Logo, Navigation</div>
      <div className="right-section">
        <HeaderTimer />
        <div>User Profile</div>
      </div>
    </div>
  );
}
```

### Option 2: Add to Sidebar
```tsx
// In your sidebar component
import CompactTimer from '@/components/exam/CompactTimer';

function Sidebar() {
  const { timeRemaining, timeLimit, isExamStarted } = useSelector(state => state.exam);
  
  if (!isExamStarted) return <div>Regular sidebar content</div>;
  
  return (
    <div className="sidebar">
      <div className="timer-section">
        <CompactTimer timeRemaining={timeRemaining} timeLimit={timeLimit} />
      </div>
      <div>Other sidebar content</div>
    </div>
  );
}
```

### Option 3: Use Floating Timer
```tsx
// The floating timer automatically positions itself
<Exam examData={quiz} timerStyle="floating" />
```

## Customization

### Custom Colors
You can modify the color schemes in each timer component:

```tsx
const getTimerColor = () => {
  const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
  
  // Customize these thresholds and colors
  if (percentageRemaining > 60) {
    return 'text-green-600'; // Custom: 60% instead of 50%
  } else if (percentageRemaining > 30) {
    return 'text-orange-600'; // Custom: 30% instead of 25%
  } else {
    return 'text-red-600';
  }
};
```

### Custom Warning Messages
```tsx
const getWarningMessage = () => {
  const percentageRemaining = (timeRemaining / (timeLimit * 60)) * 100;
  
  if (percentageRemaining <= 20) {
    return '🚨 URGENT: Submit now!';
  } else if (percentageRemaining <= 40) {
    return '⏰ Time running low';
  }
  return null;
};
```

## Best Practices

1. **Use CompactTimer** for existing headers/sidebars
2. **Use HeaderTimer** when you want automatic Redux integration
3. **Use FloatingTimer** when you need a timer that's always visible
4. **Use ExamTimer** for standalone exam pages without existing headers

The timer system is now completely modular and can be integrated into any part of your application!
