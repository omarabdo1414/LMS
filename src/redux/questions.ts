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