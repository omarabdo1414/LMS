"use client";
import React from 'react'
import { Users, Clock, CheckCircle } from 'lucide-react'

function QuizResponses() {
    const responses = [
        {
            id: 1,
            studentName: "Ahmed Ali",
            email: "ahmed.ali@email.com",
            score: 85,
            totalQuestions: 100,
            completedAt: "2024-01-15 14:30",
            status: "completed"
        },
        {
            id: 2,
            studentName: "Sara Mohamed",
            email: "sara.mohamed@email.com",
            score: 92,
            totalQuestions: 100,
            completedAt: "2024-01-15 15:45",
            status: "completed"
        },
        {
            id: 3,
            studentName: "Omar Hassan",
            email: "omar.hassan@email.com",
            score: 0,
            totalQuestions: 100,
            completedAt: null,
            status: "in_progress"
        }
    ]

    return (
        <div className='p-6 space-y-6'>
            {/* Responses Header */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Quiz Responses</h2>
                <p className='text-gray-600'>View and manage student responses to your quiz</p>
            </div>

            {/* Statistics Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>Total Responses</p>
                            <p className='text-2xl font-bold text-gray-900'>24</p>
                        </div>
                        <Users className='w-8 h-8 text-blue-600' />
                    </div>
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>Completed</p>
                            <p className='text-2xl font-bold text-green-600'>18</p>
                        </div>
                        <CheckCircle className='w-8 h-8 text-green-600' />
                    </div>
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>Average Score</p>
                            <p className='text-2xl font-bold text-gray-900'>78%</p>
                        </div>
                        <Clock className='w-8 h-8 text-orange-600' />
                    </div>
                </div>
            </div>

            {/* Responses Table */}
            <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                <div className='px-6 py-4 border-b border-gray-200'>
                    <h3 className='text-lg font-semibold text-gray-900'>Student Responses</h3>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Student</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Score</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Completed At</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {responses.map((response) => (
                                <tr key={response.id} className='hover:bg-gray-50'>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm font-medium text-gray-900'>{response.studentName}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-600'>{response.email}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>
                                            {response.score}/{response.totalQuestions}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            response.status === 'completed' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {response.status === 'completed' ? (
                                                <>
                                                    <CheckCircle className='w-3 h-3 mr-1' />
                                                    Completed
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className='w-3 h-3 mr-1' />
                                                    In Progress
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                                        {response.completedAt || 'Not completed'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default QuizResponses
