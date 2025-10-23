"use client";
import React, { useEffect, useState } from "react";
import ExamDetails from "@/components/ExamDetails/ExamDetails";
import { getExamScore } from "@/Apis/studentExam/getScore";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuth from "@/components/ui/NotAuth/NotAuth";

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

interface ScoreData {
  data?: ScoreEntry[];
}

const DetailsExam = () => {
  
  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";


  const params = useParams();
  const rawExamId = params.detailsExam;
  const examId = Array.isArray(rawExamId) ? rawExamId[0] : rawExamId;

  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  useEffect(() => {
    if (!examId) return;
    let mounted = true;
    async function fetchData(id: string) {
      try {
        const res = await getExamScore(id);
        setScoreData(res?.data ?? null);
      } catch (e) {
        // ignore score fetch errors, UI will just show generic success
      }
    }
    fetchData(examId);
    return () => {
      mounted = false;
    };
  }, [examId]);
if (isAdmin){ return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Exam Results & Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View detailed exam results and student performance
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {scoreData ? (
            <ExamDetails scoreData={scoreData} />
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Results Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Exam results will be available once students complete the exam.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  💡 Results are updated in real-time as students submit their exams.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );}else{
    return(
      <>
      <NotAuth/>
      </>
    )
  }
};

export default DetailsExam;
