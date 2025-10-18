// src/Apis/exam/updateExam.ts
import Cookies from "js-cookie";
export interface UpdateExamBody {
    title?: string;
    description?: string;
    duration?: number;
    classLevel?: string;
    isPublished?: boolean;
    startDate?: string;
    endDate?: string;
  }
  
  export async function updateExam(id: string, body: UpdateExamBody) {
    if (!id) throw new Error("Missing exam id");
  
    const token = typeof window !== "undefined" ? Cookies.get("token") : null;
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token ?? "",
      },
      body: JSON.stringify(body),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data?.message || "Failed to update exam");
    }
  
    return data;
  }
  