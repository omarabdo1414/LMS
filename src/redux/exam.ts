import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, ExamState, ExamResult } from "@/constants/interfaces";

// Initial state
const initialState: ExamState = {
  currentExam: null,
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  endTime: null,
  isExamStarted: false,
  isExamCompleted: false,
  score: 0,
  totalQuestions: 0,
  timeLimit: undefined,
  timeRemaining: undefined,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    // Start an exam
    startExam: (state, action: PayloadAction<{ exam: Quiz; timeLimit?: number }>) => {
      const { exam, timeLimit } = action.payload;
      state.currentExam = exam;
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.startTime = Date.now();
      state.isExamStarted = true;
      state.isExamCompleted = false;
      state.score = 0;
      state.totalQuestions = exam.questions.length;
      state.timeLimit = timeLimit;
      state.timeRemaining = timeLimit ? timeLimit * 60 : undefined;
    },

    // Answer a question
    answerQuestion: (
      state,
      action: PayloadAction<{ questionId: string; answer: string | number; timeSpent: number }>
    ) => {
      const { questionId, answer, timeSpent } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (ans) => ans.questionId === questionId
      );

      if (existingAnswerIndex >= 0) {
        // Update existing answer
        state.answers[existingAnswerIndex] = {
          questionId,
          answer,
          isCorrect: false, // Will be calculated on submission
          timeSpent,
        };
      } else {
        // Add new answer
        state.answers.push({
          questionId,
          answer,
          isCorrect: false,
          timeSpent,
        });
      }
    },

    // Navigate to next question
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.totalQuestions - 1) {
        state.currentQuestionIndex += 1;
      }
    },

    // Navigate to previous question
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },

    // Jump to specific question
    goToQuestion: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.totalQuestions) {
        state.currentQuestionIndex = index;
      }
    },

    // Submit exam
    submitExam: (state) => {
      if (!state.currentExam || !state.startTime) return;

      const endTime = Date.now();
      state.endTime = endTime;
      state.isExamCompleted = true;

      // Calculate score
      let correctAnswers = 0;
      const updatedAnswers = state.answers.map((answer) => {
        const question = state.currentExam!.questions.find(
          (q) => q.id === answer.questionId
        );
        
        if (question) {
          let isCorrect = false;
          
          if (question.questionType === "Multiple Choice") {
            // For multiple choice, check if the selected option is correct
            const selectedOption = question.options[answer.answer as number];
            isCorrect = selectedOption ? (selectedOption.isCorrect || false) : false;
          } else {
            // For other types, compare with correct answer
            isCorrect = answer.answer === question.correctAnswer;
          }

          if (isCorrect) {
            correctAnswers++;
          }

          return {
            ...answer,
            isCorrect,
          };
        }
        
        return answer;
      });

      state.answers = updatedAnswers;
      state.score = (correctAnswers / state.totalQuestions) * 100;
    },

    // Update time remaining
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },

    // Reset exam state
    resetExam: (state) => {
      state.currentExam = null;
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.startTime = null;
      state.endTime = null;
      state.isExamStarted = false;
      state.isExamCompleted = false;
      state.score = 0;
      state.totalQuestions = 0;
      state.timeLimit = undefined;
      state.timeRemaining = undefined;
    },

    // Set exam result
    setExamResult: () => {
      // This can be used to store the final result
      // Implementation depends on your needs
    },
  },
});

export const {
  startExam,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  submitExam,
  updateTimeRemaining,
  resetExam,
  setExamResult,
} = examSlice.actions;

export default examSlice.reducer;
