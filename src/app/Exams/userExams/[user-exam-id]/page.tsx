"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { submitStudentExam } from "@/Apis/studentExam/submitExam";
import { getExamRemainingTime } from "@/Apis/studentExam/getRemainingTime";
import { getExamScore, getExamScoreForStudent } from "@/Apis/studentExam/getScore";

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
  const [totalTime, setTotalTime] = useState<number>(3600);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [scoreData, setScoreData] = useState<any | null>(null);

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

  const handleAnswerChange = (questionId: string, selected: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSubmit = async () => {
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
  };

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
      <div className="p-4 bg-card">
        <h1 className="text-2xl font-bold mb-4">Exam Submitted</h1>
        {scoreData ? (
          <pre className="text-sm bg-card p-3 rounded border overflow-auto">
            { JSON.stringify(scoreData, null, 2) }
          </pre>
        ) : (
          <p className="text-gray-700">Your results will be available soon.</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {examData?.[0]?.title || "Exam"}
      </h1>

      {/* ✅ تايمر مرئي */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Time Remaining</span>
          <span className="font-semibold">{formatTime(timeLeft)}</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className={`${progressColor} h-full transition-all duration-1000 ease-linear`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {examData && examData.length > 0 && (
        <div className="space-y-8">
          {examData.map((exam, index) => (
            <div
              key={exam._id || index}
              className=" bg-card border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              {exam.questions?.map((q, qIndex) => (
                <div key={q._id} className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {qIndex + 1}. {q.text}
                  </h3>

                  {q.options && q.options.length > 0 ? (
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={q._id}
                            value={option}
                            checked={answers[q._id] === option}
                            onChange={() => handleAnswerChange(q._id, option)}
                            className="accent-blue-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      This question has no options.
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Exam"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
