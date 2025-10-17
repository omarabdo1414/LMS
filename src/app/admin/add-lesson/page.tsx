import AddLesson from "@/components/Lessons/AddLesson/AddLesson";
import ProtectedRoute from "@/components/guard/ProtectPages";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Add Cource",
  description:
    "A modern educational platform offering interactive courses and personalized learning experiences to help you grow your skills",
};
export default function AddLessonPage() {
  return (
    <ProtectedRoute>
      <div className="h-screen flex justify-center items-center ">
        <AddLesson />
      </div>
    </ProtectedRoute>
  );
}
