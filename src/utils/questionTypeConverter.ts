import { QuestionType, ApiQuestionType } from '@/constants/interfaces';

/**
 * Convert UI question type to API question type
 */
export function toApiQuestionType(uiType: QuestionType): ApiQuestionType {
    const typeMap: Record<QuestionType, ApiQuestionType> = {
        'Multiple Choice': 'multiple-choice',
        'True/False': 'true-false',
        'Short Answer': 'short-answer',
    };
    
    return typeMap[uiType];
}

/**
 * Convert API question type to UI question type
 */
export function toUiQuestionType(apiType: ApiQuestionType): QuestionType {
    const typeMap: Record<ApiQuestionType, QuestionType> = {
        'multiple-choice': 'Multiple Choice',
        'true-false': 'True/False',
        'short-answer': 'Short Answer',
    };
    
    return typeMap[apiType];
}
