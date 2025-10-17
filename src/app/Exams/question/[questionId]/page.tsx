"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getQuestionById } from "@/Apis/questions/getQuestionById";

export default function QuestionDetailsPage() {
  const params = useParams<{ questionId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const id = params?.questionId as string;
        if (!id) {
          setError("Invalid question id");
          return;
        }
        const res = await getQuestionById(id);
        if (!res.success) throw new Error(res.message || "Unable to fetch question");
        setQuestion(res.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load question");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!question) {
    return <div className="p-4">No question found.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => router.back()} className="text-sm text-blue-600 hover:underline">Back</button>
      <h1 className="text-2xl font-bold">Question Details</h1>
      <div className="bg-white border rounded p-4">
        <div className="font-medium">{question.text}</div>
        <div className="text-sm text-gray-500 mt-1">Type: {question.type} {typeof question.points === "number" ? `• ${question.points} pts` : ""}</div>
        {Array.isArray(question.options) && question.options.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-semibold mb-1">Options</div>
            <ul className="list-disc pl-5 text-sm">
              {question.options.map((opt: string, idx: number) => (
                <li key={idx} className={opt === question.correctAnswer ? "font-semibold text-green-700" : ""}>{opt}</li>
              ))}
            </ul>
          </div>
        )}
        {question.correctAnswer && (
          <div className="mt-3 text-sm">Correct Answer: <span className="font-semibold">{question.correctAnswer}</span></div>
        )}
        {question.exam && (
          <div className="mt-3 text-sm text-gray-500">Exam: {question.exam.title} ({question.exam._id})</div>
        )}
        <div className="mt-4 text-xs text-gray-400">ID: {question._id}</div>
      </div>
    </div>
  );
}


