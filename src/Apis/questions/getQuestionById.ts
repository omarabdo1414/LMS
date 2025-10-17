import Cookies from "js-cookie";
import type { Question } from "./getQuestions";

export async function getQuestionById(questionId: string): Promise<{ success: boolean; data?: Question; message?: string }>
{
  try {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question/get/${questionId}`, {
      method: "GET",
      headers: {
        token: token as string,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      const msg = `Failed to fetch question: ${res.status}`;
      return { success: false, message: msg };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, message };
  }
}


