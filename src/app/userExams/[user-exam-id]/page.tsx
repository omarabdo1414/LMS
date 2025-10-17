"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { submitStudentExam } from "@/Apis/studentExam/submitExam";
import { getExamRemainingTime } from "@/Apis/studentExam/getRemainingTime";
import { getExamScore } from "@/Apis/studentExam/getScore";

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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [scoreData, setScoreData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchExam() {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const testId = params?.["user-exam-id"]; // Get the test ID from URL params

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

  // Sync remaining time periodically
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const sync = async () => {
      const testId = params?.["user-exam-id"] as string | undefined;
      if (!testId || isSubmitted) return;
      try {
        const res = await getExamRemainingTime(testId);
        const serverSeconds = (res?.data?.remainingSeconds ?? res?.data?.remaining_time ?? res?.data) as number | undefined;
        if (typeof serverSeconds === "number" && serverSeconds >= 0) {
          setTimeLeft(serverSeconds);
        }
      } catch {}
    };
    sync();
    interval = setInterval(sync, 30000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [params, isSubmitted]);

  // Local countdown + auto-submit
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0 && !isSubmitted) {
      void handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleSubmit = async () => {
    if (submitting || isSubmitted) return;
    const testId = params?.["user-exam-id"] as string | undefined;
    if (!testId) return;
    try {
      setSubmitting(true);
      const answersArray = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));
      await submitStudentExam(testId, answersArray);
      setIsSubmitted(true);
      try {
        const res = await getExamScore(testId);
        setScoreData(res?.data ?? null);
      } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (isSubmitted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Exam Submitted</h1>
        {scoreData ? (
          <pre className="text-sm bg-gray-100 p-3 rounded border overflow-auto">{JSON.stringify(scoreData, null, 2)}</pre>
        ) : (
          <p className="text-gray-700">Your results will be available soon.</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Exam Details</h1>
      <div className="mb-4 text-sm text-gray-600">Time remaining: {timeLeft}s</div>
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
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Exam"}
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
