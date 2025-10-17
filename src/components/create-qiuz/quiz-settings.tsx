"use client";
import React, { useState } from 'react'
import { Save, Eye, Clock, Settings as SettingsIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { saveQuizSettings } from '@/redux/questions'

// Submit Toast
import toast from 'react-hot-toast';

function QuizSettings() {
    const dispatch = useDispatch()
    const [settings, setSettings] = useState({
        timeLimit: 60,
        attempts: 1,
        shuffleQuestions: false,
        showCorrectAnswers: true,
        allowReview: false,
        passPercentage: 60,
        dueDate: '',
        instructions: 'Please read each question carefully and select the best answer.'
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (field: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSaveSettings = () => {
        dispatch(saveQuizSettings(settings))
        // You can add a success message or notification here
        toast.success('Quiz settings saved successfully!');
    }

    return (
        <div className='p-6 space-y-6'>
            {/* Settings Header */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Quiz Settings</h2>
                <p className='text-gray-600'>Configure your quiz preferences and restrictions</p>
            </div>

            {/* General Settings */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                    <SettingsIcon className='w-5 h-5 text-blue-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>General Settings</h3>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Time Limit (minutes)
                        </label>
                        <input
                            type="number"
                            value={settings.timeLimit}
                            onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Number of Attempts
                        </label>
                        <input
                            type="number"
                            value={settings.attempts}
                            onChange={(e) => handleInputChange('attempts', parseInt(e.target.value))}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Pass Percentage (%)
                        </label>
                        <input
                            type="number"
                            value={settings.passPercentage}
                            onChange={(e) => handleInputChange('passPercentage', parseInt(e.target.value))}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Due Date
                        </label>
                        <input
                            type="datetime-local"
                            value={settings.dueDate}
                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
            </div>

            {/* Display Options */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                    <Eye className='w-5 h-5 text-blue-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>Display Options</h3>
                </div>
                
                <div className='space-y-4'>
                    <label className='flex items-center gap-3'>
                        <input
                            type="checkbox"
                            checked={settings.shuffleQuestions}
                            onChange={(e) => handleInputChange('shuffleQuestions', e.target.checked)}
                            className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                        />
                        <span className='text-sm font-medium text-gray-700'>Shuffle Questions</span>
                    </label>
                    
                    <label className='flex items-center gap-3'>
                        <input
                            type="checkbox"
                            checked={settings.showCorrectAnswers}
                            onChange={(e) => handleInputChange('showCorrectAnswers', e.target.checked)}
                            className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                        />
                        <span className='text-sm font-medium text-gray-700'>Show Correct Answers After Submission</span>
                    </label>
                    
                    <label className='flex items-center gap-3'>
                        <input
                            type="checkbox"
                            checked={settings.allowReview}
                            onChange={(e) => handleInputChange('allowReview', e.target.checked)}
                            className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                        />
                        <span className='text-sm font-medium text-gray-700'>Allow Students to Review Quiz</span>
                    </label>
                </div>
            </div>

            {/* Instructions */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                    <Clock className='w-5 h-5 text-blue-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>Instructions</h3>
                </div>
                
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Quiz Instructions
                    </label>
                    <textarea
                        value={settings.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        rows={4}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter instructions for students...'
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-end'>
                <button 
                    onClick={handleSaveSettings}
                    className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'
                >
                    <Save className='w-4 h-4' />
                    Save Settings
                </button>
            </div>
        </div>
    )
}

export default QuizSettings
