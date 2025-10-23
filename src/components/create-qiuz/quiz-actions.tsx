"use client";

import React, { useState } from 'react'
import { Plus, Eye, Save, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion, clearAllQuestions, setLoading, setError } from '@/redux/questions'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { addQuestion as addQuestionApi } from '@/Apis/questions/add-question'
import { toApiQuestionType } from '@/utils/questionTypeConverter'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


function QuizActions() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { questions, currentQuiz, selectedExamId, isLoading } = useSelector((state: RootState) => state.questions)
    const [showClearDialog, setShowClearDialog] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleAddQuestion = () => {
        dispatch(addQuestion())
    }

    const handlePreviewQuiz = () => {
        // Navigate to exam with current quiz data
        if (currentQuiz && questions.length > 0) {
            router.push(`/exam?preview=true`);
        }
    }

    const handleSaveQuiz = async () => {
        // Validate requirements
        if (!currentQuiz || questions.length === 0) {
            alert('Please add at least one question before saving the quiz.');
            return;
        }

        if (!selectedExamId) {
            alert('Please select an exam before saving questions.');
            return;
        }

        // Validate all questions have required fields
        const invalidQuestions = questions.filter(q => 
            !q.questionText || 
            (q.questionType === 'Multiple Choice' && q.options.filter(opt => opt.text).length < 2)
        );

        if (invalidQuestions.length > 0) {
            alert('Please complete all questions. Each question needs text and multiple choice questions need at least 2 options.');
            return;
        }

        setIsSaving(true);
        dispatch(setLoading(true));

        try {
            // Save all questions to API
            const savePromises = questions.map(async (question) => {
                // Prepare question data for API
                const questionData = {
                    text: question.questionText,
                    type: toApiQuestionType(question.questionType),
                    options: question.questionType === 'Multiple Choice' 
                        ? question.options.map(opt => opt.text).filter(text => text) 
                        : [],
                    correctAnswer: question.questionType === 'Multiple Choice'
                        ? (question.options.find(opt => opt.isCorrect)?.text || question.options[0]?.text || '')
                        : (typeof question.correctAnswer === 'string' ? question.correctAnswer : ''),
                    exam: selectedExamId,
                    points: question.points || 10,
                };

                return addQuestionApi(questionData);
            });

            await Promise.all(savePromises);
            
            alert(`Successfully saved ${questions.length} question(s) to the exam!`);
            dispatch(setError(null));
            
            // Navigate to exam page after successful save
            router.push('/exam');
        } catch (error) {
            console.error('Error saving questions:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to save questions';
            alert(`Error: ${errorMessage}`);
            dispatch(setError(errorMessage));
        } finally {
            setIsSaving(false);
            dispatch(setLoading(false));
        }
    }

    const handleClearAll = () => {
        dispatch(clearAllQuestions())
        setShowClearDialog(false)
    }

    return (
        <div className='flex justify-between items-center p-6 bg-white dark:bg-slate-800 border-t dark:border-slate-700'>
            <div className='flex items-center gap-3'>
                <button
                    onClick={handleAddQuestion}
                    className='flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors cursor-pointer'
                >
                    <Plus className='w-4 h-4' />
                    Add Question
                </button>
                {questions.length > 0 && (
                    <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="destructive"
                                className='flex items-center gap-2 bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors'
                            >
                                Clear All
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Clear All Questions</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to clear all questions? This action cannot be undone and will remove all your quiz questions.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearAll}>
                                    Clear All
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <div className='flex items-center gap-3'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {questions.length} question{questions.length !== 1 ? 's' : ''}
                </span>
                <button
                    onClick={handlePreviewQuiz}
                    className='flex items-center gap-2 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50'
                    disabled={questions.length === 0}
                >
                    <Eye className='w-4 h-4' />
                    Preview Quiz
                </button>
                <button
                    onClick={handleSaveQuiz}
                    className='flex items-center gap-2 bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={questions.length === 0 || isSaving || isLoading}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className='w-4 h-4 animate-spin' />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className='w-4 h-4' />
                            Save
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}


export default QuizActions;