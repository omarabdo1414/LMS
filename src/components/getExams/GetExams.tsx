"use client";
import { useDispatch, useSelector } from "react-redux";
import { FetchExams } from "@/Apis/exam/fetchExams";
import { deleteExam } from "@/Apis/exam/deleteExam";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setCurrentExam ,setExams } from "@/redux/examData";
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

  const dispatch = useDispatch();
  const router = useRouter();
  const exams = useSelector((state: RootState) => state.examData.exams);

  useEffect(() => {
    const load = async () => {
      const data = await FetchExams();
      if (data?.success) {
        dispatch(setExams(data.exams));
      }
    };
    load();
  }, [dispatch]);

  const handleEdit = (exam: any) => {
    dispatch(setCurrentExam(exam));
    router.push(`/Exams/adminExams/updateExam/${exam._id}`);
  };


  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";
  const [examsState, setExamsState] = useState<
  ExamItem[] | { data: ExamItem[] } | { examsState: ExamItem[] } | null
>(null);

 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadExams() {
      try {
        const data = await FetchExams();
        setExamsState(data);
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
  const examsList: ExamItem[] = Array.isArray(examsState)
    ? examsState
    : Array.isArray((examsState as { data?: ExamItem[] })?.data)
    ? (examsState as { data: ExamItem[] }).data
    : Array.isArray((examsState as { examsState?: ExamItem[] })?.examsState)
    ? (examsState as { examsState: ExamItem[] }).examsState
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
    setExamsState((prev) => {
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
        (prev as { examsState?: ExamItem[] }).examsState &&
        Array.isArray((prev as { examsState: ExamItem[] }).examsState)
      ) {
        return {
          ...(prev as { examsState: ExamItem[] }),
          examsState: (prev as { examsState: ExamItem[] }).examsState.filter(
            (e) => (e.id || e._id) !== examId
          ),
        };
      }
      return prev;
    });
    setDeletingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <main className="container mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Exams Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and monitor your exams
          </p>
        </div>

        {examsList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No exams available</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Create your first exam to get started
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-600">
              {examsList.map((exam: ExamItem, index: number) => (
                <tr
                  key={exam.id || exam._id || index}
                  className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {exam.title || exam.name || "Untitled Exam"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {exam.id || exam._id || index}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                      {exam.description ? (
                        <span className="line-clamp-2">
                          {exam.description}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          No description available
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {exam.duration ? `${exam.duration} min` : "Not specified"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">
                      {exam.status || "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {isAdmin ? (
                        <>
                          <button 
                            onClick={() => handleEdit(exam)}
                            className="inline-flex items-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>

                          <Link
                            href={`/Exams/getExams/${
                              exam.id || exam._id || index.toString()
                            }`}
                          >
                            <button className="inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
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
                            className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            {deletingId === (exam.id || exam._id || index.toString()) ? (
                              <>
                                <svg className="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <Link
                          href={`/Exams/userExams/${
                            exam.id || exam._id || index.toString()
                          }`}
                        >
                          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z" />
                            </svg>
                            Start Exam
                          </button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default GetExams;
