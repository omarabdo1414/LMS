
import axios from "axios";
import { ExamForm } from "@/constants/interfaces";


export const AddExam = async (body: ExamForm) => {
  try {
    // grab token from localStorage (client-side)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      console.warn("No token found in localStorage");
      return {
        success: false,
        message: "No auth token found",
        status: 401,
      };
    }

    // Send both common header shapes to match backend expectation
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      token, // keep custom header if backend expects this
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/exam`,
      body,
      { headers }
    );

    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("AddExam error:", err.response?.data || err.message);
    if (err.response?.status === 401) {
      console.warn("Received 401 from API - token may be invalid/expired or header key mismatched");
    }
    return {
      success: false,
      message: err.response?.data?.message || err.message,
      status: err.response?.status,
      data: err.response?.data,
    };
  }
};

