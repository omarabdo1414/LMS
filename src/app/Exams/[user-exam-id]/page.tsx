"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";

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
  const router = useRouter();
  const params = useParams();
  const [examData, setExamData] = useState<ExamData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExam() {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const testId = params?.["test-id"]; // Get the test ID from URL params

        if (!token) {
          router.push("/login");
          return;
        }

        if (!testId) {
          throw new Error("No test ID provided");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/${testId}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            validateStatus: (status) => status < 500, // Handle HTTP errors ourselves
          }
        );

        if (response.status === 401) {
          Cookies.remove("token");
          router.push("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error(response.data.message || "Failed to fetch exam");
        }

        const examData = response.data;
        setExamData(Array.isArray(examData) ? examData : [examData]);
      } catch (error) {
        console.error("Fetch error:", error);
        let errorMessage = "Failed to fetch exam";

        if (error instanceof AxiosError) {
          errorMessage = error.response?.data?.message || error.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, [router, params]);

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
            <div
              key={exam._id || index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {exam.title || "Untitled Exam"}
                  </h2>
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
                  Status:{" "}
                  <span className="font-medium text-green-600">
                    {exam.status || "Available"}
                  </span>
                </div>
                {exam.questions && (
                  <div className="text-sm text-gray-500">
                    Questions:{" "}
                    <span className="font-medium">{exam.questions.length}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">ID: {exam._id}</div>
                <button
                  onClick={() => (window.location.href = `/Exams/${exam._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Start Exam
                </button>
              </div>

              {/* Debug info - remove this in production */}
              <details className="mt-4">
                <summary className="text-xs text-gray-400 cursor-pointer">
                  Debug Info
                </summary>
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
