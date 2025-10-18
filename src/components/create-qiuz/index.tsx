"use client";
import React, { useState } from 'react'
import QuizContent from './quiz-content';
import QuizResponses from './quiz-responses';
import QuizSettings from './quiz-settings';
import QuizActions from './quiz-actions';
import SideBar from './sideBar';

function Quiz() {
    const [activeSection, setActiveSection] = useState('questions')

    const renderContent = () => {
        switch (activeSection) {
            case 'questions':
                return <QuizContent />
            case 'responses':
                return <QuizResponses />
            case 'settings':
                return <QuizSettings />
            default:
                return <QuizContent />
        }
    }

    const renderActions = () => {
        // Only show actions for questions section
        if (activeSection === 'questions') {
            return <QuizActions />
        }
        return null
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='flex h-screen'>
                {/* Sidebar */}
                <div className='w-64 flex-shrink-0'>
                    <SideBar activeSection={activeSection} onSectionChange={setActiveSection} />
                </div>
                
                {/* Main Content */}
                <div className='flex-1 flex flex-col overflow-hidden'>
                    <div className='flex-1 overflow-y-auto'>
                        {renderContent()}
                    </div>
                    <div className='flex-shrink-0'>
                        {renderActions()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;