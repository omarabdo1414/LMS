'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FetchExams } from '@/Apis/exam/fetchExams';
import { setSelectedExam } from '@/redux/questions';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Exam {
    _id: string;
    title: string;
    description?: string;
}

const ExamSelector: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedExamId } = useSelector((state: RootState) => state.questions);
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await FetchExams();
            if (response && response.data) {
                setExams(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch exams');
        } finally {
            setLoading(false);
        }
    };

    const handleExamSelect = (examId: string) => {
        dispatch(setSelectedExam(examId));
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Loading exams...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Error loading exams</h3>
                        <p className="text-sm text-red-700 dark:text-red-500 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!exams || exams.length === 0) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">No exams available</h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">
                            Please create an exam first before adding questions.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Select Exam</h3>
                {selectedExamId && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Exam Selected</span>
                    </div>
                )}
            </div>
            <select
                value={selectedExamId || ''}
                onChange={(e) => handleExamSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">-- Select an exam --</option>
                {exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>
                        {exam.title}
                    </option>
                ))}
            </select>
            {selectedExamId && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    All questions will be added to this exam.
                </p>
            )}
        </div>
    );
};

export default ExamSelector;
