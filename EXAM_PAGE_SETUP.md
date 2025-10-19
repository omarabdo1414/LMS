# Exam Page Setup and Usage

## Overview
The exam page (`/Exams/exam`) has been transformed into a fully functional exam-taking interface for students.

## Features

### 🎯 Core Functionality
- **Interactive Question Navigation**: Students can navigate between questions using the sidebar or Previous/Next buttons
- **Real-time Timer**: Countdown timer that automatically submits the exam when time runs out
- **Progress Tracking**: Visual progress bar and answered question counter
- **Answer Selection**: Radio button interface for multiple choice questions
- **Auto-save**: Answers are stored locally as students progress through the exam

### 🎨 User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: 
  - Current question highlighted in blue
  - Answered questions marked in green
  - Unanswered questions in gray
- **Time Warning**: Timer turns red when less than 5 minutes remain
- **Clean Layout**: Professional exam interface with clear typography

### ⏰ Timer Features
- Default 1-hour exam duration
- Real-time countdown display (HH:MM:SS format)
- Automatic submission when time expires
- Visual warning when time is running low

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Replace with your actual API URL for production.

### 2. API Integration
The exam page fetches questions from:
- **Endpoint**: `/question`
- **Method**: GET
- **Headers**: `token` (from localStorage)

### 3. Authentication
Students must be logged in (token stored in localStorage) to access the exam.

## Usage Flow

1. **Student Access**: Navigate to `/Exams/exam`
2. **Question Loading**: System fetches exam questions from API
3. **Exam Taking**: 
   - Select answers for each question
   - Navigate between questions
   - Monitor time remaining
4. **Submission**: 
   - Manual submission via "Submit Exam" button
   - Automatic submission when timer expires
5. **Completion**: Success message displayed

## Technical Details

### State Management
- `examData`: Array of questions from API
- `answers`: Object storing student's answers by question ID
- `currentQuestionIndex`: Current question being viewed
- `timeLeft`: Remaining time in seconds
- `isSubmitted`: Submission status

### Key Functions
- `handleAnswerChange()`: Updates student's answers
- `handleSubmitExam()`: Processes exam submission
- `formatTime()`: Formats seconds into HH:MM:SS
- Navigation functions for moving between questions

## Customization

### Timer Duration
Modify the default timer in the component:
```typescript
const [timeLeft, setTimeLeft] = useState(3600); // 1 hour = 3600 seconds
```

### Styling
The component uses Tailwind CSS classes and can be easily customized by modifying the className attributes.

### API Integration
To implement actual exam submission, modify the `handleSubmitExam()` function to send answers to your backend API.

## Browser Compatibility
- Modern browsers with ES6+ support
- Requires localStorage for token storage
- Responsive design for various screen sizes

## Security Considerations
- Token-based authentication
- Client-side answer storage (consider server-side validation)
- Time-based exam constraints
- No answer preview (questions show without correct answers)

## Future Enhancements
- Server-side answer submission
- Exam result calculation and display
- Different question types (multiple choice, text input, etc.)
- Exam pause/resume functionality
- Offline capability with answer sync
