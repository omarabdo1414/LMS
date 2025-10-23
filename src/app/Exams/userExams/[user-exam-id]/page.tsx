"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { submitStudentExam } from "@/Apis/studentExam/submitExam";
import { getExamRemainingTime } from "@/Apis/studentExam/getRemainingTime";
import { getExamScoreForStudent } from "@/Apis/studentExam/getScore";

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

interface ScoreData {
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  message?: string;
}

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const [examData, setExamData] = useState<ExamData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [totalTime, setTotalTime] = useState<number>(3600);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  useEffect(() => {
    async function fetchExam() {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const testId = params?.["user-exam-id"];

        if (!token) {
          router.push("/login");
          return;
        }

        if (!testId) {
          throw new Error("No test ID provided");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/get/${testId}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            validateStatus: (status) => status < 500,
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

        const examData = response.data.data;
        setExamData(Array.isArray(examData) ? examData : [examData]);

        const durationInSeconds = (examData?.duration ?? 60) * 60;
        setTotalTime(durationInSeconds);
        setTimeLeft(durationInSeconds);
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
        const serverSeconds = (res?.data?.remainingSeconds ??
          res?.data?.remaining_time ??
          res?.data) as number | undefined;

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

  const handleAnswerChange = (questionId: string, selected: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (submitting || isSubmitted) return;

    const testId = params?.["user-exam-id"] as string | undefined;
    if (!testId) return;

    try {
      setSubmitting(true);
      const answersArray = Object.entries(answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );

      await submitStudentExam(testId, answersArray);
      setIsSubmitted(true);

      try {
        const res = await getExamScoreForStudent(testId);
        setScoreData(res?.data ?? null);
      } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, isSubmitted, params, answers]);

  // Local countdown + auto-submit
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0 && !isSubmitted) {
      void handleSubmit();
    }
  }, [timeLeft, isSubmitted, handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = (timeLeft / totalTime) * 100;
  const progressColor =
    progressPercent > 50
      ? "bg-green-500"
      : progressPercent > 20
      ? "bg-yellow-500"
      : "bg-red-600";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading Exam...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Exam</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Exam Submitted Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">Thank you for completing the exam. Your answers have been recorded.</p>
            
            {scoreData ? (
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Results</h2>
                <div className="space-y-3 text-left">
                  {scoreData.score !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Score:</span>
                      <span className="text-2xl font-bold text-blue-600">{scoreData.score}%</span>
                    </div>
                  )}
                  {scoreData.correctAnswers !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Correct Answers:</span>
                      <span className="text-lg font-semibold text-green-600">{scoreData.correctAnswers}</span>
                    </div>
                  )}
                  {scoreData.totalQuestions !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Total Questions:</span>
                      <span className="text-lg font-semibold text-gray-800">{scoreData.totalQuestions}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <p className="text-blue-800">Your results will be available soon. Please check back later.</p>
              </div>
            )}
            
            <button 
              onClick={() => router.push('/Exams/getExams')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {examData?.[0]?.title || "Exam"}
            </h1>
            {examData?.[0]?.description && (
              <p className="text-gray-600 text-lg">{examData[0].description}</p>
            )}
          </div>

          {/* Enhanced Timer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Time Remaining</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{formatTime(timeLeft)}</span>
                <p className="text-xs text-gray-500">minutes</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
              <div
                className={`${progressColor} h-full transition-all duration-1000 ease-linear shadow-sm`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{Math.round(progressPercent)}% remaining</span>
              <span>{Math.round((100 - progressPercent))}% elapsed</span>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        {examData && examData.length > 0 && (
          <div className="space-y-6">
            {examData.map((exam, index) => (
              <div
                key={exam._id || index}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="space-y-8">
                  {exam.questions?.map((q, qIndex) => (
                    <div key={q._id} className="border-l-4 border-blue-500 pl-6">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-start">
                          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <span className="flex-1">{q.text}</span>
                        </h3>
                        {q.points && (
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {q.points} points
                          </div>
                        )}
                      </div>

                      {q.options && q.options.length > 0 ? (
                        <div className="space-y-3">
                          {q.options.map((option) => (
                            <label
                              key={option}
                              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                answers[q._id] === option
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q._id}
                                value={option}
                                checked={answers[q._id] === option}
                                onChange={() => handleAnswerChange(q._id, option)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                answers[q._id] === option
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {answers[q._id] === option && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="text-gray-700 font-medium">{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 italic">
                            This question has no options available.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {submitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Submit Exam</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
