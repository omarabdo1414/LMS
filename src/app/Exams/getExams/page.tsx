import GetExams from "@/components/getExams/GetExams";
import ProtectedRoute from "@/components/guard/ProtectPages";
export default function GetExamsPage() {
  return (
    <ProtectedRoute>
      <GetExams />
    </ProtectedRoute>
  );
}
