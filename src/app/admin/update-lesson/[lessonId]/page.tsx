import ProtectedRoute from "@/components/guard/ProtectPages";
import UpdateLesson from "@/components/Lessons/UpdateLesson/UpdateLesson";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Update Cource",
  description:
    "A modern educational platform offering interactive courses and personalized learning experiences to help you grow your skills",
};
type TUpdateLessonProps = {
  params: {
    lessonId: string;
  };
};
export default function UpdateLessonPage({ params }: TUpdateLessonProps) {
  return (
    <ProtectedRoute>
      <div className="h-screen flex justify-center items-center ">
        <UpdateLesson lessonId={params.lessonId} />
      </div>
    </ProtectedRoute>
  );
}
