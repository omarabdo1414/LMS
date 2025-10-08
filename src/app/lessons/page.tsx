import ProtectedRoute from "@/components/guard/ProtectPages";
import Lessons from "@/components/Lessons/Lessons";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Lessons",
  description: "lms edu education Forget Password ",
};
export default async function LessonsPage() {
  return (
    <ProtectedRoute>
      <section className="contain py-8">
        <h1 className="text-5xl font-semibold text-center">Courses</h1>
        <p className="text-center my-2">
          {" "}
          Access structured lessons, track your progress, and grow your
          knowledge step by step.
        </p>
        <Lessons />
      </section>
    </ProtectedRoute>
  );
}
