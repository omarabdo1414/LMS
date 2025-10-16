
/**
 * @file This file contains the redux slice for managing the quiz creation state.
 *
 * It includes the following:
 * - The initial state with the current quiz, questions, loading state, and error state
 * - Helper function to generate unique IDs
 * - Actions for various quiz operations
 * - Reducers to handle the actions
 * - Actions and reducers for quiz settings
 * - Actions and reducers for selecting the current quiz
 * - Create a new question function with default values
 *
 * The quiz state includes the following:
 * - currentQuiz: The current quiz being edited
 * - questions: Array of questions for the current quiz
 * - isLoading: Flag indicating if the quiz is being loaded
 * - error: Error string if there was an error loading the quiz
 * - selectedExamId: ID of the currently selected exam
 *
 * The quiz settings include the following:
 * - timeLimit: Time limit for the quiz in minutes
 * - attempts: Number of attempts allowed for the quiz
 * - shuffleQuestions: Flag indicating if questions should be shuffled
 * - showCorrectAnswers: Flag indicating if correct answers should be shown
 * - allowReview: Flag indicating if students can review their answers
 * - passPercentage: Percentage required to pass the quiz
 * - dueDate: Date and time when the quiz is due
 * - instructions: Instructions for the quiz
 *
 * The current quiz includes the following:
 * - id: ID of the quiz
 * - title: Title of the quiz
 * - description: Description of the quiz
 * - questions: Array of questions for the quiz
 * - createdAt: Date and time when the quiz was created
 * - updatedAt: Date and time when the quiz was last updated
 *
 * The quiz settings are stored in the quiz object as the 'settings' property.
 *
 * The quiz state reducer listens for the following actions and updates the state accordingly:
 * - addQuestion: Add a new question to the quiz
 * - deleteQuestion: Delete a question from the quiz
 * - updateQuestionText: Update the text of a question
 * - updateQuestionType: Update the type of a question
 * - addOption: Add a new option to a question
 * - removeOption: Remove an option from a question
 * - updateOptionText: Update the text of an option
 * - setCorrectAnswer: Set the correct answer for a question
 * - updateQuestionPoints: Update the points for a question
 * - toggleQuestionRequired: Toggle the required flag for a question
 * - duplicateQuestion: Duplicate a question
 * - clearAllQuestions: Clear all questions from the quiz
 * - setLoading: Set the loading state of the quiz
 * - setError: Set the error state of the quiz
 * - initializeQuiz: Initialize quiz with title and description
 * - updateQuizTitle: Update quiz title
 * - updateQuizDescription: Update quiz description
 * - saveQuizSettings: Save quiz settings
 * - setSelectedExam: Set selected exam ID
 *
 * The quiz reducer listens for the following actions and updates the state accordingly:
 * - resetExam: Reset exam state
 * - startExam: Start an exam
 * - submitAnswer: Submit an answer for a question
 * - endExam: End the exam
 * - updateScore: Update the score for a question
 * - updateTimeRemaining: Update the time remaining for the exam
 *
 * The exam slice is used to manage the state of the exam being taken.
 * It includes the following:
 * - currentExam: The current exam being taken
 * - currentQuestionIndex: The index of the current question being answered
 * - answers: Array of answers for the current exam
 * - startTime: The time the exam started
 * - endTime: The time the exam ended
 * - isExamStarted: Flag indicating if the exam has started
 * - isExamCompleted: Flag indicating if the exam has been completed
 * - score: The score for the exam
 * - totalQuestions: The total number of questions in the exam
 * - timeLimit: The time limit for the exam
 * - timeRemaining: The time remaining for the exam
 *
 * The exam slice reducer listens for the following actions and updates the state accordingly:
 * - startExam: Start an exam
 * - submitAnswer: Submit an answer for a question
 * - endExam: End the exam
 * - resetExam: Reset exam state
 * - updateScore: Update the score for a question
 * - updateTimeRemaining: Update the time remaining for the exam
 *
 * The exam slice is used in the ExamPage component to manage the state of the exam being taken.
 * It listens for the following actions and updates the state accordingly:
 * - resetExam: Reset the exam state
 * - startExam: Start the exam
 * - submitAnswer: Submit an answer for a question
 * - endExam: End the exam
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizQuestion, QuizState, QuestionType } from "@/constants/interfaces";

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial state
const initialState: QuizState = {
    currentQuiz: null,
    questions: [],
    isLoading: false,
    error: null,
    selectedExamId: null,
};

// Create a new question with default values
const createNewQuestion = (): QuizQuestion => ({
    id: generateId(),
    questionText: "",
    questionType: "Multiple Choice",
    options: [
        { id: generateId(), text: "", isCorrect: false },
        { id: generateId(), text: "", isCorrect: false },
        { id: generateId(), text: "", isCorrect: false },
    ],
    correctAnswer: 0,
    points: 10,
    required: true,
    createdAt: Date.now(),
});

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        // Add a new question
        addQuestion: (state) => {
            const newQuestion = createNewQuestion();
            state.questions.push(newQuestion);
        },

        // Delete a question by ID
        deleteQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter(
                (question) => question.id !== action.payload
            );
        },

        // Update question text
        updateQuestionText: (
            state,
            action: PayloadAction<{ id: string; text: string }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.id
            );
            if (question) {
                question.questionText = action.payload.text;
            }
        },

        // Update question type
        updateQuestionType: (
            state,
            action: PayloadAction<{ id: string; type: QuestionType }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.id
            );
            if (question) {
                question.questionType = action.payload.type;

                // Reset options for non-multiple choice questions
                if (action.payload.type !== "Multiple Choice") {
                    question.options = [];
                } else if (question.options.length === 0) {
                    // Add default options for multiple choice
                    question.options = [
                        { id: generateId(), text: "", isCorrect: false },
                        { id: generateId(), text: "", isCorrect: false },
                        { id: generateId(), text: "", isCorrect: false },
                    ];
                }
            }
        },

        // Add option to a question
        addOption: (state, action: PayloadAction<string>) => {
            const question = state.questions.find(
                (q) => q.id === action.payload
            );
            if (question && question.questionType === "Multiple Choice") {
                question.options.push({
                    id: generateId(),
                    text: "",
                    isCorrect: false,
                });
            }
        },

        // Remove option from a question
        removeOption: (
            state,
            action: PayloadAction<{ questionId: string; optionId: string }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.questionId
            );
            if (question) {
                question.options = question.options.filter(
                    (option) => option.id !== action.payload.optionId
                );
            }
        },

        // Update option text
        updateOptionText: (
            state,
            action: PayloadAction<{
                questionId: string;
                optionId: string;
                text: string;
            }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.questionId
            );
            if (question) {
                const option = question.options.find(
                    (opt) => opt.id === action.payload.optionId
                );
                if (option) {
                    option.text = action.payload.text;
                }
            }
        },

        // Set correct answer
        setCorrectAnswer: (
            state,
            action: PayloadAction<{
                questionId: string;
                correctAnswer: string | number;
            }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.questionId
            );
            if (question) {
                question.correctAnswer = action.payload.correctAnswer;
                // For multiple choice, also update isCorrect on options
                if (question.questionType === "Multiple Choice") {
                    question.options.forEach(opt => {
                        opt.isCorrect = opt.text === action.payload.correctAnswer;
                    });
                }
            }
        },

        // Update points for a question
        updateQuestionPoints: (
            state,
            action: PayloadAction<{ id: string; points: number }>
        ) => {
            const question = state.questions.find(
                (q) => q.id === action.payload.id
            );
            if (question) {
                question.points = action.payload.points;
            }
        },

        // Toggle required status
        toggleQuestionRequired: (state, action: PayloadAction<string>) => {
            const question = state.questions.find(
                (q) => q.id === action.payload
            );
            if (question) {
                question.required = !question.required;
            }
        },

        // Duplicate a question
        duplicateQuestion: (state, action: PayloadAction<string>) => {
            const questionIndex = state.questions.findIndex(
                (q) => q.id === action.payload
            );
            if (questionIndex !== -1) {
                const originalQuestion = state.questions[questionIndex];
                const duplicatedQuestion: QuizQuestion = {
                    ...originalQuestion,
                    id: generateId(),
                    questionText: originalQuestion.questionText + " (Copy)",
                    options: originalQuestion.options.map((option) => ({
                        ...option,
                        id: generateId(),
                    })),
                    createdAt: Date.now(),
                };
                state.questions.splice(questionIndex + 1, 0, duplicatedQuestion);
            }
        },

        // Clear all questions
        clearAllQuestions: (state) => {
            state.questions = [];
        },

        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        // Set error state
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Initialize quiz with title and description
        initializeQuiz: (
            state,
            action: PayloadAction<{ title: string; description: string }>
        ) => {
            state.currentQuiz = {
                id: generateId(),
                title: action.payload.title,
                description: action.payload.description,
                questions: state.questions,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
        },

        // Update quiz title
        updateQuizTitle: (state, action: PayloadAction<string>) => {
            if (state.currentQuiz) {
                state.currentQuiz.title = action.payload;
                state.currentQuiz.updatedAt = Date.now();
            }
        },

        // Update quiz description
        updateQuizDescription: (state, action: PayloadAction<string>) => {
            if (state.currentQuiz) {
                state.currentQuiz.description = action.payload;
                state.currentQuiz.updatedAt = Date.now();
            }
        },

        // Save quiz settings
        saveQuizSettings: (
            state,
            action: PayloadAction<{
                timeLimit: number;
                attempts: number;
                shuffleQuestions: boolean;
                showCorrectAnswers: boolean;
                allowReview: boolean;
                passPercentage: number;
                dueDate: string;
                instructions: string;
            }>
        ) => {
            if (state.currentQuiz) {
                // Store settings in the quiz object
                (state.currentQuiz as never).settings = action.payload;
                state.currentQuiz.updatedAt = Date.now();
            }
        },

        // Set selected exam ID
        setSelectedExam: (state, action: PayloadAction<string>) => {
            state.selectedExamId = action.payload;
        },
    },
});

export const {
    addQuestion,
    deleteQuestion,
    updateQuestionText,
    updateQuestionType,
    addOption,
    removeOption,
    updateOptionText,
    setCorrectAnswer,
    updateQuestionPoints,
    toggleQuestionRequired,
    duplicateQuestion,
    clearAllQuestions,
    setLoading,
    setError,
    initializeQuiz,
    updateQuizTitle,
    updateQuizDescription,
    saveQuizSettings,
    setSelectedExam,
} = questionsSlice.actions;

export default questionsSlice.reducer;