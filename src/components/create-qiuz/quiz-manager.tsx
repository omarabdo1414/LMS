"use client";
import React from 'react'
import { FileQuestion, FileText, Settings } from 'lucide-react'

interface QuizManagerProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

function QuizManager({ activeSection, onSectionChange }: QuizManagerProps) {
    const navItems = [
        { id: 'questions', label: 'Questions', icon: FileQuestion },
        { id: 'responses', label: 'Responses', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings }
    ]

    return (
        <div className='bg-white h-screen p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-gray-900 mb-8'>Quiz Builder</h2>
            <nav className='space-y-2'>
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    return (
                        <div
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className='w-5 h-5' />
                            <span className='font-medium'>{item.label}</span>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}

export default QuizManager