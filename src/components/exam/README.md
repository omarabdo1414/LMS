# Exam System Documentation

This document explains the exam system implementation in the LMS application.

## Overview

The exam system is built with a modular component structure and uses Redux for state management. It supports multiple question types, timer functionality, and provides detailed results.

## Architecture

### Components Structure

```
src/components/exam/
├── index.tsx              # Main exam component
├── ExamHeader.tsx         # Header with timer and navigation
├── ExamIntro.tsx          # Introduction screen before exam starts
├── ExamProgress.tsx       # Progress bar and statistics
├── QuestionCard.tsx       # Individual question display
├── ExamControls.tsx       # Navigation controls (Previous/Next/Submit)
├── SampleQuizData.ts      # Sample quiz data for testing
└── README.md             # This documentation
```

### Redux State Management

The exam state is managed in `src/redux/exam.ts` with the following structure:

```typescript
interface ExamState {
  currentExam: Quiz | null;
  currentQuestionIndex: number;
  answers: ExamAnswer[];
  startTime: number | null;
  endTime: number | null;
  isExamStarted: boolean;
  isExamCompleted: boolean;
  score: number;
  totalQuestions: number;
  timeLimit?: number;
  timeRemaining?: number;
}
```

## Features

### 1. Exam Introduction
- Displays exam title, description, and instructions
- Shows exam statistics (questions, time limit, points)
- Start button to begin the exam

### 2. Question Navigation
- Previous/Next buttons for navigation
- Progress bar showing completion status
- Question counter (e.g., "Question 1 of 4")

### 3. Question Types Support
- **Multiple Choice**: Radio buttons with single selection
- **True/False**: Binary choice questions
- **Short Answer**: Text input for brief responses
- **Essay**: Large text area for detailed responses

### 4. Timer Functionality
- Optional time limit for exams
- Countdown display in header
- Auto-submit when time expires

### 5. Answer Tracking
- Real-time answer saving
- Navigation between questions preserves answers
- Visual indicators for answered/unanswered questions

### 6. Results Page
- Overall score percentage
- Detailed breakdown (correct, wrong, unanswered)
- Question-by-question review
- Time spent statistics

## Usage

### Basic Implementation

```tsx
import Exam from '@/components/exam';
import { Quiz } from '@/constants/interfaces';

const MyExamPage = () => {
  const examData: Quiz = {
    // ... quiz data
  };

  return (
    <Exam 
      examData={examData} 
      timeLimit={60} // Optional: 60 minutes
    />
  );
};
```

### Using Redux State

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { startExam } from '@/redux/exam';
import { RootState } from '@/redux/store';

const ExamPage = () => {
  const dispatch = useDispatch();
  const { currentExam } = useSelector((state: RootState) => state.exam);

  const handleStartExam = () => {
    dispatch(startExam({ exam: examData, timeLimit: 30 }));
  };

  return <Exam examData={currentExam} />;
};
```

### Sample Quiz Data

```tsx
import { sampleQuiz } from '@/components/exam/SampleQuizData';

// Use the sample quiz for testing
const examData = sampleQuiz;
```

## Redux Actions

### Exam Actions

- `startExam({ exam, timeLimit })`: Initialize exam with data and optional time limit
- `answerQuestion({ questionId, answer, timeSpent })`: Save user's answer
- `nextQuestion()`: Move to next question
- `previousQuestion()`: Move to previous question
- `goToQuestion(index)`: Jump to specific question
- `submitExam()`: Complete exam and calculate results
- `resetExam()`: Clear exam state

### Usage Example

```tsx
import { useDispatch } from 'react-redux';
import { startExam, answerQuestion, submitExam } from '@/redux/exam';

const dispatch = useDispatch();

// Start exam
dispatch(startExam({ 
  exam: quizData, 
  timeLimit: 60 
}));

// Answer question
dispatch(answerQuestion({
  questionId: 'q1',
  answer: 'Nile',
  timeSpent: 30
}));

// Submit exam
dispatch(submitExam());
```

## Styling

The exam system uses Tailwind CSS for styling with a clean, modern design:

- **Header**: Blue accent colors with timer display
- **Questions**: Card-based layout with clear visual hierarchy
- **Progress**: Visual progress bar with completion percentage
- **Results**: Color-coded score display (green for good, red for poor)

## Customization

### Adding New Question Types

1. Update the `QuestionType` enum in `src/constants/interfaces.ts`
2. Add rendering logic in `QuestionCard.tsx`
3. Update answer validation in `src/redux/exam.ts`

### Custom Styling

All components use Tailwind CSS classes. You can customize the appearance by:

1. Modifying the CSS classes in component files
2. Creating custom CSS in `src/app/globals.css`
3. Using CSS modules for component-specific styles

### Timer Customization

The timer can be customized by:

1. Setting different time limits per exam
2. Modifying the timer display format in `ExamHeader.tsx`
3. Adding custom auto-submit behavior

## Testing

Use the demo page at `/exam-demo` to test the exam system with sample data.

## Integration with Quiz Creation

The exam system integrates with the quiz creation system:

1. Create quizzes using the quiz creation components
2. Store quiz data in Redux questions state
3. Convert quiz data to exam format using utility functions
4. Launch exams from the stored quiz data

## Best Practices

1. **State Management**: Always use Redux actions to modify exam state
2. **Component Separation**: Keep components focused on single responsibilities
3. **Error Handling**: Validate quiz data before starting exams
4. **Performance**: Use React.memo for components that don't need frequent re-renders
5. **Accessibility**: Ensure proper ARIA labels and keyboard navigation

## Troubleshooting

### Common Issues

1. **Exam not starting**: Check if quiz data is valid and properly formatted
2. **Timer not working**: Ensure timeLimit is provided and greater than 0
3. **Answers not saving**: Verify Redux store is properly configured
4. **Navigation issues**: Check currentQuestionIndex bounds

### Debug Tips

1. Use Redux DevTools to inspect state changes
2. Check browser console for JavaScript errors
3. Verify component props are correctly passed
4. Test with sample data first before using real quiz data
