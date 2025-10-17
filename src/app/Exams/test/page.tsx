"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";


interface Question {
  _id: string;
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string;
  points?: number;
}

interface ExamData {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  status?: string;
  questions?: Question[];
  createdAt: string;
  updatedAt: string;
}

export default function TestPage() {
  const [examData, setExamData] = useState<ExamData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExam() {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        // Fetch the specific exam using the exam ID from the URL
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/get/671510713c2c5e497bf2db80`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        // Handle the response - if it's a single exam, wrap it in an array
        const examData = response.data;
        if (examData && !Array.isArray(examData)) {
          setExamData([examData]);
        } else {
          setExamData(examData || []);
        }
      } catch (error: unknown) {
        console.error("Fetch error:", error);
        let errorMessage = "Failed to fetch exam";
        
        if (error && typeof error === 'object') {
          if ('response' in error && error.response && typeof error.response === 'object') {
            const response = error.response as { data?: { message?: string } };
            errorMessage = response.data?.message || errorMessage;
          } else if ('message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Exam Details</h1>
      {examData && examData.length > 0 && (
        <div className="space-y-4">
          {examData.map((exam, index) => (
            <div key={exam._id || index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{exam.title || "Untitled Exam"}</h2>
                  {exam.description && (
                    <p className="text-gray-600 mt-1">{exam.description}</p>
                  )}
                </div>
                <div className="text-right">
                  {exam.duration && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {exam.duration} minutes
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">
                  Status: <span className="font-medium text-green-600">{exam.status || "Available"}</span>
                </div>
                {exam.questions && (
                  <div className="text-sm text-gray-500">
                    Questions: <span className="font-medium">{exam.questions.length}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  ID: {exam._id}
                </div>
                <button 
                  onClick={() => window.location.href = `/Exams/${exam._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Start Exam
                </button>
              </div>
              
              {/* Debug info - remove this in production */}
              <details className="mt-4">
                <summary className="text-xs text-gray-400 cursor-pointer">Debug Info</summary>
                <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(exam, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
