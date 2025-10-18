import { Quiz, QuizState } from '@/constants/interfaces';

/**
 * Create an exam from the current quiz in Redux state
 */
export const createExamFromQuizState = (quizState: QuizState): Quiz | null => {
  if (!quizState.currentQuiz || !quizState.questions.length) {
    return null;
  }

  return {
    ...quizState.currentQuiz,
    questions: quizState.questions,
  };
};

/**
 * Validate if a quiz is ready to be used as an exam
 */
export const validateQuizForExam = (quiz: Quiz): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!quiz.title.trim()) {
    errors.push('Quiz title is required');
  }

  if (!quiz.description.trim()) {
    errors.push('Quiz description is required');
  }

  if (quiz.questions.length === 0) {
    errors.push('Quiz must have at least one question');
  }

  quiz.questions.forEach((question, index) => {
    if (!question.questionText.trim()) {
      errors.push(`Question ${index + 1}: Question text is required`);
    }

    if (question.questionType === 'Multiple Choice') {
      if (question.options.length < 2) {
        errors.push(`Question ${index + 1}: Multiple choice questions need at least 2 options`);
      }

      const hasCorrectAnswer = question.options.some(option => option.isCorrect);
      if (!hasCorrectAnswer) {
        errors.push(`Question ${index + 1}: Multiple choice questions need at least one correct answer`);
      }
    }

    if (question.points <= 0) {
      errors.push(`Question ${index + 1}: Points must be greater than 0`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Calculate total possible points for a quiz
 */
export const calculateTotalPoints = (quiz: Quiz): number => {
  return quiz.questions.reduce((total, question) => total + question.points, 0);
};

/**
 * Get quiz statistics
 */
export const getQuizStats = (quiz: Quiz) => {
  const totalQuestions = quiz.questions.length;
  const requiredQuestions = quiz.questions.filter(q => q.required).length;
  const totalPoints = calculateTotalPoints(quiz);
  
  const questionTypes = quiz.questions.reduce((acc, question) => {
    acc[question.questionType] = (acc[question.questionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalQuestions,
    requiredQuestions,
    totalPoints,
    questionTypes,
  };
};
