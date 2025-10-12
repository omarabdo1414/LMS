import { FetchExams } from "@/Apis/exam/fetchExams";
import React, { useEffect } from "react";
import { useState } from "react";

type Exam = {
  id: string;
  title: string;
  description?: string;
};

const GetExams = () => {
  const [exams, setExams] = useState<Exam[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const examsList = Array.isArray(exams)
    ? exams
    : exams?.data || exams?.exams || [];

  const handleStartExam = (examId: string) => {
    // Navigate to exam test page
    window.location.href = `/Exams/test?examId=${examId}`;
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Exams</h1>

      {examsList.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No exams available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {examsList.map((exam: any, index: number) => (
                <tr
                  key={exam.id || exam._id || index}
                  className="hover:bg-gray-50"
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
                    <button
                      onClick={() =>
                        handleStartExam(exam.id || exam._id || index.toString())
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Start Exam
                    </button>
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
