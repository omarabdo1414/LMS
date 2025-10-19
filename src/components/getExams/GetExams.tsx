"use client";
import { useSelector } from "react-redux";
import { FetchExams } from "@/Apis/exam/fetchExams";
import { deleteExam } from "@/Apis/exam/deleteExam";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { RootState } from "@/redux/store";
type ExamItem = {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  duration?: number;
  status?: string;
};

const GetExams = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";
 

  const [exams, setExams] = useState<
    ExamItem[] | { data: ExamItem[] } | { exams: ExamItem[] } | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadExams() {
      try {
        const data = await FetchExams();
        setExams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch exams");
      } finally {
        setLoading(false);
      }
    }
    loadExams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Handle different response structures
  const examsList: ExamItem[] = Array.isArray(exams)
    ? exams
    : Array.isArray((exams as { data?: ExamItem[] })?.data)
    ? (exams as { data: ExamItem[] }).data
    : Array.isArray((exams as { exams?: ExamItem[] })?.exams)
    ? (exams as { exams: ExamItem[] }).exams
    : [];

  async function handleDelete(examId: string) {
    if (!confirm("Are you sure you want to delete this exam?")) return;
    setDeletingId(examId);
    const res = await deleteExam(examId);
    if (!res.success) {
      alert(res.message);
      setDeletingId(null);
      return;
    }
    // Normalize update depending on original shape
    setExams((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter(
          (e) => ((e as ExamItem).id || (e as ExamItem)._id) !== examId
        );
      }
      if (
        prev &&
        (prev as { data?: ExamItem[] }).data &&
        Array.isArray((prev as { data: ExamItem[] }).data)
      ) {
        return {
          ...(prev as { data: ExamItem[] }),
          data: (prev as { data: ExamItem[] }).data.filter(
            (e) => (e.id || e._id) !== examId
          ),
        };
      }
      if (
        prev &&
        (prev as { exams?: ExamItem[] }).exams &&
        Array.isArray((prev as { exams: ExamItem[] }).exams)
      ) {
        return {
          ...(prev as { exams: ExamItem[] }),
          exams: (prev as { exams: ExamItem[] }).exams.filter(
            (e) => (e.id || e._id) !== examId
          ),
        };
      }
      return prev;
    });
    setDeletingId(null);
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Exams</h1>

      {examsList.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No exams available</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-card">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-grar-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-gray-200">
              {examsList.map((exam: ExamItem, index: number) => (
                <tr
                  key={exam.id || exam._id || index}
                  className="hover:bg-blue-700/20"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {exam.title || exam.name || "Untitled Exam"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {exam.description || "No description available"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {exam.duration
                        ? `${exam.duration} minutes`
                        : "Not specified"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {exam.status || "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isAdmin ? (
                      <>
                        <Link
                          href={`/Exams/adminExams/updateExam/${
                            exam.id || exam._id || index.toString()
                          }`}
                        >
                          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mr-2">
                            Edit
                          </button>
                        </Link>

                        <Link
                          href={`/Exams/getExams/${
                            exam.id || exam._id || index.toString()
                          }`}
                        >
                          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mr-2">
                            View Details
                          </button>
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              exam.id || exam._id || index.toString()
                            )
                          }
                          disabled={
                            deletingId ===
                            (exam.id || exam._id || index.toString())
                          }
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        >
                          {deletingId ===
                          (exam.id || exam._id || index.toString())
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </>
                    ) : (
                      <Link
                        href={`/Exams/userExams/${
                          exam.id || exam._id || index.toString()
                        }`}
                      >
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mr-2">
                          startExam
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default GetExams;
