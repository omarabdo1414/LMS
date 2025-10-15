import SignupForm from "@/components/SignupForm/SignupForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Signup",
  description: "A modern educational platform offering interactive courses and personalized learning experiences to help you grow your skills ",
};
export default function Signup() {
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      {/* signup form */}
        <SignupForm/>
    </div>
  );
}
