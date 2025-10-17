import Cookies from "js-cookie";

export interface Question {
  _id: string;
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string;
  points?: number;
  exam?: {
    _id: string;
    title: string;
  };
}

export async function getQuestions(): Promise<{ success: boolean; data?: Question[]; message?: string }>
{
  try {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question`, {
      method: "GET",
      headers: {
        token: token as string,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      const msg = `Failed to fetch questions: ${res.status}`;
      return { success: false, message: msg };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, message };
  }
}


