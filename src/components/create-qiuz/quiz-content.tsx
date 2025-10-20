"use client";

import React, { useEffect, useState } from 'react'
import { Plus, X, Copy, Trash2, ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    updateQuestionText, 
    updateQuestionType, 
    addOption, 
    removeOption, 
    updateOptionText, 
    updateQuestionPoints, 
    toggleQuestionRequired, 
    duplicateQuestion, 
    deleteQuestion,
    updateQuizTitle,
    updateQuizDescription,
    initializeQuiz,
    setCorrectAnswer
} from '@/redux/questions'
import { RootState } from '@/redux/store'
import { QuestionType, QuizQuestion } from '@/constants/interfaces'
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
import ExamIntegration from './ExamIntegration'
import ExamSelector from './ExamSelector'

function QuizContent() {
    const dispatch = useDispatch()
    const { questions, currentQuiz } = useSelector((state: RootState) => state.questions)

    // Initialize quiz if it doesn't exist
    useEffect(() => {
        if (!currentQuiz) {
            dispatch(initializeQuiz({
                title: "Advanced JavaScript Concepts Quiz",
                description: "A comprehensive quiz to test your knowledge on closures, promises, and async/await in JavaScript."
            }))
        }
    }, [currentQuiz, dispatch])

    // If no questions exist, show empty state
    if (questions.length === 0) {
        return (
            <div className='p-6 space-y-6'>
                <QuizTitle />
                <ExamSelector />
                <ExamIntegration />
                <div className='bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm text-center'>
                    <p className='text-gray-500 dark:text-gray-400 text-lg'>No questions yet. Click &quot;Add Question&quot; to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 space-y-6'>
            {/* Quiz Header */}
            <QuizTitle />

            {/* Exam Selector */}
            <ExamSelector />

            {/* Exam Integration */}
            <ExamIntegration />

            {/* Questions List */}
            {questions.map((question, questionIndex) => (
                <QuestionCard key={question.id} question={question} questionIndex={questionIndex} />
            ))}
        </div>
    )
}

function QuestionCard({ question, questionIndex }: { question: QuizQuestion, questionIndex: number }) {
    const dispatch = useDispatch()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleQuestionTextChange = (text: string) => {
        dispatch(updateQuestionText({ id: question.id, text }))
    }

    const handleQuestionTypeChange = (type: QuestionType) => {
        dispatch(updateQuestionType({ id: question.id, type }))
    }

    const handleAddOption = () => {
        dispatch(addOption(question.id))
    }

    const handleRemoveOption = (optionId: string) => {
        dispatch(removeOption({ questionId: question.id, optionId }))
    }

    const handleOptionTextChange = (optionId: string, text: string) => {
        dispatch(updateOptionText({ questionId: question.id, optionId, text }))
    }

    const handleSetCorrectOption = (optionId: string) => {
        // Mark this option as correct and unmark others
        const updatedOptions = question.options.map(opt => ({
            ...opt,
            isCorrect: opt.id === optionId
        }));
        // Store the text of the correct option as correctAnswer
        const correctOption = updatedOptions.find(opt => opt.id === optionId);
        if (correctOption) {
            dispatch(setCorrectAnswer({ 
                questionId: question.id, 
                correctAnswer: correctOption.text 
            }));
        }
    }

    const handlePointsChange = (points: number) => {
        dispatch(updateQuestionPoints({ id: question.id, points }))
    }

    const handleToggleRequired = () => {
        dispatch(toggleQuestionRequired(question.id))
    }

    const handleDuplicate = () => {
        dispatch(duplicateQuestion(question.id))
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(question.id))
        setShowDeleteDialog(false)
    }

    // API Of the Question
    // https://documenter.getpostman.com/view/36602455/2sB2x9jqk6#81ac58b6-29a9-488d-9710-c5d7a84aa0b5/api/v1/questions/
    // useEffect(() => {
        
    // }, [question]);

    return (
        <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border dark:border-slate-700'>
            <div className='flex items-center gap-2 mb-4'>
                <span className='text-sm text-gray-500 dark:text-gray-400 font-medium'>Question {questionIndex + 1}</span>
            </div>

            {/* Question Input and Type */}
            <div className='flex gap-4 mb-6'>
                <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(e.target.value)}
                    placeholder="Enter your question here..."
                    className='flex-1 text-lg font-medium border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
                />
                <div className='relative'>
                    <select
                        value={question.questionType}
                        onChange={(e) => handleQuestionTypeChange(e.target.value as QuestionType)}
                        className='appearance-none bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md px-4 py-2 pr-8 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Short Answer">Short Answer</option>
                    </select>
                    <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none' />
                </div>
            </div>

            {/* Answer Options - Only show for Multiple Choice */}
            {question.questionType === 'Multiple Choice' && (
                <div className='space-y-3 mb-6'>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mb-2'>Select the correct answer:</p>
                    {question.options.map((option, index: number) => (
                        <div key={option.id} className='flex items-center gap-3'>
                            <input
                                type="radio"
                                name={`answer-${question.id}`}
                                className='w-4 h-4 text-blue-600 cursor-pointer'
                                checked={option.isCorrect || false}
                                onChange={() => handleSetCorrectOption(option.id)}
                            />
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className='flex-1 border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
                            />
                            <button
                                onClick={() => handleRemoveOption(option.id)}
                                className='p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded'
                            >
                                <X className='w-4 h-4 text-gray-400 dark:text-gray-500' />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddOption}
                        className='flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium'
                    >
                        <Plus className='w-4 h-4' />
                        Add option
                    </button>
                </div>
            )}

            {/* True/False Answer */}
            {question.questionType === 'True/False' && (
                <div className='space-y-3 mb-6'>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mb-2'>Select the correct answer:</p>
                    <div className='flex gap-4'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name={`answer-${question.id}`}
                                className='w-4 h-4 text-blue-600'
                                checked={question.correctAnswer === 'True' || question.correctAnswer === 'true'}
                                onChange={() => dispatch(setCorrectAnswer({ questionId: question.id, correctAnswer: 'True' }))}
                            />
                            <span className='text-gray-700 dark:text-gray-300'>True</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name={`answer-${question.id}`}
                                className='w-4 h-4 text-blue-600'
                                checked={question.correctAnswer === 'False' || question.correctAnswer === 'false'}
                                onChange={() => dispatch(setCorrectAnswer({ questionId: question.id, correctAnswer: 'False' }))}
                            />
                            <span className='text-gray-700 dark:text-gray-300'>False</span>
                        </label>
                    </div>
                </div>
            )}

            {/* Short Answer - Model Answer */}
            {question.questionType === 'Short Answer' && (
                <div className='space-y-2 mb-6'>
                    <label className='text-xs text-gray-500 dark:text-gray-400'>Model Answer (for reference):</label>
                    <textarea
                        value={typeof question.correctAnswer === 'string' ? question.correctAnswer : ''}
                        onChange={(e) => dispatch(setCorrectAnswer({ questionId: question.id, correctAnswer: e.target.value }))}
                        placeholder="Enter a model answer or key points..."
                        className='w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        rows={3}
                    />
                </div>
            )}

            {/* Question Controls */}
            <div className='flex items-center justify-between border-t pt-4'>
                <div className='flex items-center gap-6'>
                    <label className='flex items-center gap-2'>
                        <input 
                            type="checkbox" 
                            className='w-4 h-4' 
                            checked={question.required}
                            onChange={handleToggleRequired}
                        />
                        <span className='text-sm text-gray-600 dark:text-gray-400'>Required</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>Assign points:</span>
                        <input
                            type="number"
                            value={question.points}
                            onChange={(e) => handlePointsChange(Number(e.target.value))}
                            className='w-16 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                            min="1"
                        />
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <button 
                        onClick={handleDuplicate}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded'
                        title="Duplicate question"
                    >
                        <Copy className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                    </button>
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="ghost"
                                size="sm"
                                className='p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded'
                                title="Delete question"
                            >
                                <Trash2 className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this question? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

function QuizTitle() {
    const dispatch = useDispatch()
    const { currentQuiz } = useSelector((state: RootState) => state.questions)

    const handleTitleChange = (title: string) => {
        dispatch(updateQuizTitle(title))
    }

    const handleDescriptionChange = (description: string) => {
        dispatch(updateQuizDescription(description))
    }

    return (
        <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-t-4 border-blue-700 dark:border-blue-600'>
            <input
                type="text"
                value={currentQuiz?.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter quiz title..."
                className='text-2xl font-bold text-gray-900 dark:text-white w-full mb-2 border-none outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-600'
            />
            <input
                type="text"
                value={currentQuiz?.description || ''}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Enter quiz description..."
                className='text-gray-600 dark:text-gray-300 w-full border-none outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-600'
            />
        </div>
    );
}

export default QuizContent;