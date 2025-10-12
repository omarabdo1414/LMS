"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/guard/ProtectPages";

interface ExamForm {
  title: string;
  description: string;
  duration: number;
  classLevel: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

const EditExamPage = () => {
  const router = useRouter();
  const { id } = useParams(); // examId from URL

  const [formData, setFormData] = useState<ExamForm>({
    title: "",
    description: "",
    duration: 0,
    classLevel: "",
    startDate: "",
    endDate: "",
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);

  // 📥 Fetch exam details when page loads
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(
          `https://edu-master-psi.vercel.app/exam/${id}`,
          {
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yMDVAZ21haWwuY29tIiwiX2lkIjoiNjdkZTJjMTE2Zjk3NDlkOTUzNGUzODgzIiwiaWF0IjoxNzUxNzQwMjUwLCJleHAiOjE3NTE4MjY2NTB9.0qePTQgbWkj87PdupPzwWCgYyAaNbPZsvkmZIn3-TYk",
            },
          }
        );
        setFormData(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load exam details ❌");
      }
    };

    if (id) fetchExam();
  }, [id]);

  // 📤 Update Exam
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `https://edu-master-psi.vercel.app/exam/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yMDVAZ21haWwuY29tIiwiX2lkIjoiNjdkZTJjMTE2Zjk3NDlkOTUzNGUzODgzIiwiaWF0IjoxNzUxNzQwMjUwLCJleHAiOjE3NTE4MjY2NTB9.0qePTQgbWkj87PdupPzwWCgYyAaNbPZsvkmZIn3-TYk",
          },
        }
      );
      alert("✅ Exam updated successfully!");
      console.log(res.data);
      router.push("/exams");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update exam!");
    } finally {
      setLoading(false);
    }
  };

  // 📋 Form Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <ProtectedRoute>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate.slice(0, 10)}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate.slice(0, 10)}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <span>Published</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Exam"}
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
};

export default EditExamPage;
