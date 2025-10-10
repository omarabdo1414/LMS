import ResetPass from "@/components/ResetPassword/ResetPassword";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Reset Password",
  description: "lms edu education Forget Password ",
};
export default function ResetPassword() {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* Reset password */}
      <ResetPass />
    </div>
  );
}
