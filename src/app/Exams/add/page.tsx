"use client";

import React, { useState } from "react";
import axios from "axios";
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

const AddExamPage = () => {
  const [formData, setFormData] = useState<ExamForm>({
    title: "",
    description: "",
    duration: 0,
    classLevel: "Grade 1 Secondary",
    startDate: "",
    endDate: "",
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://edu-master-psi.vercel.app/exam",
        formData,
        {
          headers: {
            token: token as string,
          },
        }
      );
      alert("✅ Exam added successfully!");
      console.log("Success:", response.data);
    } catch (error: any) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          `Failed to add exam! Status: ${error.response?.status || 'Unknown'}`;
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
     <ProtectedRoute>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Exam Title"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Exam Description"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="duration"
          type="number"
          placeholder="Duration (minutes)"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {/* <input
          name="classLevel"
          placeholder="Class Level"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        /> */}
                <select
                  className="w-full h-10 border rounded-sm bg-input dark:bg-slate-800 focus:outline-none  px-1 text-slate-800 dark:text-slate-300 border-gray-300 dark:border-gray-600 "
                  name="classLevel"
                  id="classLevel"
                  
                  onChange={handleChange}
                >
                  <option value="Grade 1 Secondary">Grade 1 Secondary</option>
                  <option value="Grade 2 Secondary">Grade 2 Secondary</option>
                  <option value="Grade 3 Secondary">Grade 3 Secondary</option>
                </select>

        <input
          name="startDate"
          type="date"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="endDate"
          type="date"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            onChange={handleChange}
          />
          <span>Publish Exam</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Exam"}
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
};

export default AddExamPage;







