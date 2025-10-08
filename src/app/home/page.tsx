import ProtectedRoute from "@/components/guard/ProtectPages";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div></div>
    </ProtectedRoute>
  );
}
