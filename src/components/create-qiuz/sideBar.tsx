import React from 'react'
import QuizManager from './quiz-manager';

interface SideBarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

function SideBar({ activeSection, onSectionChange }: SideBarProps) {
    return (
        <div className='side-bar border-r-2'>
            <QuizManager activeSection={activeSection} onSectionChange={onSectionChange} />
        </div>
    )
}

export default SideBar