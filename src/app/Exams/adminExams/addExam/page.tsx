import React from "react";
import ProtectedRoute from "@/components/guard/ProtectPages";
import CreateExam from "@/components/createExams/createExam";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <div>
      <ProtectedRoute>
        <CreateExam />
      </ProtectedRoute>
    </div>
  );
};

export default page;
