"use client";
import ProtectedRoute from "@/components/guard/ProtectPages";
import GetExams from "@/components/getExams/GetExams";
export default function Page() {
  return (
    <ProtectedRoute>
      <GetExams />
    </ProtectedRoute>
  );
}
