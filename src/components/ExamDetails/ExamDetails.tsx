"use client";

import React, { useState } from "react";

interface Answer {
  _id?: string;
  question: string;
  selectedAnswer: string;
  isCorrect?: boolean;
}

interface ScoreEntry {
  _id: string;
  student: { _id: string; fullName: string };
  exam: { _id: string; title: string };
  startTime?: string;
  endTime?: string;
  isSubmitted?: boolean;
  score?: number;
  answers?: Answer[];
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  scoreData: { data?: ScoreEntry[] } | ScoreEntry[];
}

export default function ExamDetails({ scoreData }: Props) {
  const entries: ScoreEntry[] = Array.isArray(scoreData)
    ? scoreData
    : scoreData?.data ?? [];

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (!entries.length) {
    return <div className="p-4 text-gray-600">No results available.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Exam Results</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Detailed performance analysis for all students
        </p>
      </div>
      <div className="overflow-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-600">
            {entries.map((entry) => (
              <React.Fragment key={entry._id}>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {entry.student?.fullName ?? "Unknown Student"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {entry.student?._id ?? "—"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.score !== undefined ? (
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        entry.score >= 80 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : entry.score >= 60 
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {entry.score}%
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.isSubmitted ? (
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {entry.startTime
                      ? new Date(entry.startTime).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {entry.endTime
                      ? new Date(entry.endTime).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggle(entry._id)}
                      className="inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {expanded[entry._id] ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded[entry._id] && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-4 py-3">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-700">
                          <strong>
                            Answers ({entry.answers?.length ?? 0}):
                          </strong>
                        </div>
                        {entry.answers && entry.answers.length ? (
                          <div className="grid gap-2">
                            {entry.answers.map((ans, idx) => (
                              <div
                                key={ans._id ?? idx}
                                className="p-3 rounded border bg-white"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    <div className="text-xs text-gray-500">
                                      Question ID
                                    </div>
                                    <div className="text-sm">
                                      {ans.question}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">
                                      Selected
                                    </div>
                                    <div
                                      className={`text-sm ${
                                        ans.isCorrect
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      {ans.selectedAnswer}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            No answers submitted.
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
