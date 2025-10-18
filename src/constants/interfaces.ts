//>>>>>forms
//signup form
export interface ISignupForm {
  fName: string;
  lName: string;
  email: string;
  password: string;
  cpassword: string;
  phoneNumber: string;
  classLevel: string;
}

//signup api
export interface ISignup {
  fullName: string;
  email: string;
  password: string;
  cpassword: string;
  phoneNumber: string;
  classLevel: string;
}

//login api
export interface ILoginForm {
  email: string;
  password: string;
}

//forgetpassword api
export interface IForgetPass {
  email: string;
}

// reset password
export interface IResetPass {
  email: string;
  newPassword: string;
  cpassword: string;
  otp: string;
}

//profile / user
export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "super_admin" | "admin" | "user";
  isVerified?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//user state
export interface IUserState {
  userData: IUser | null;
  loading: boolean;
  error: string | null;
}

// lesson => get from api
export interface Ilesson {
  _id: string;
  title: string;
  description: string;
  video: string;
  classLevel: string;
  price: number;
  isPaid: boolean;
  scheduledDate: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// lessonForm
export interface IlessonForm {
  title: string;
  description: string;
  video: string;
  classLevel: string;
  price: number;
  scheduledDate: string;
}

// Quiz Question Types (UI Display)
export type QuestionType = "Multiple Choice" | "True/False" | "Short Answer";

// API Question Types
export type ApiQuestionType = "multiple-choice" | "true-false" | "short-answer";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: QuestionType;
  options: QuestionOption[];
  correctAnswer?: string | number;
  points: number;
  required: boolean;
  explanation?: string;
  createdAt: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: number;
  updatedAt: number;
}

// Quiz State
export interface QuizState {
  currentQuiz: Quiz | null;
  questions: QuizQuestion[];
  isLoading: boolean;
  error: string | null;
  selectedExamId: string | null;
}

// Exam Interfaces
export interface ExamAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface ExamState {
  currentExam: Quiz | null;
  currentQuestionIndex: number;
  answers: ExamAnswer[];
  startTime: number | null;
  endTime: number | null;
  isExamStarted: boolean;
  isExamCompleted: boolean;
  score: number;
  totalQuestions: number;
  timeLimit?: number; // in minutes
  timeRemaining?: number; // in seconds
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  timeSpent: number;
  answers: ExamAnswer[];
  completedAt: number;
}
