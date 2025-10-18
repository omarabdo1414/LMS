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
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Exam Results</h2>
      <div className="overflow-auto bg-card rounded-lg shadow-sm border">
        <table className="min-w-full text-sm">
          <thead className="bg-card-50 text-left">
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Submitted</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <React.Fragment key={entry._id}>
                <tr className="border-t">
                  <td className="px-4 py-3">
                    {entry.student?.fullName ?? "—"}
                  </td>
                  <td className="px-4 py-3">{entry.score ?? "—"}</td>
                  <td className="px-4 py-3">
                    {entry.isSubmitted ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-yellow-600">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {entry.startTime
                      ? new Date(entry.startTime).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {entry.endTime
                      ? new Date(entry.endTime).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(entry._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
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
