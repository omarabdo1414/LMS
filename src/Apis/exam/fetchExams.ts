import Cookies from "js-cookie";

export async function FetchExams() {
  try {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch exams: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("GetExams error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
