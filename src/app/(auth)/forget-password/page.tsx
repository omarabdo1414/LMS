import ForgetPass from "@/components/Auth/ForgetPassword/ForgetPassword";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "A modern educational platform offering interactive courses and personalized learning experiences to help you grow your skills",
};
export default function ForgetPassword() {
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      {/* forget password form */}
      <ForgetPass />
    </div>
  );
}
