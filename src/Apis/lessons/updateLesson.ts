import { ILessonForm } from "@/constants/interfaces";
import Cookies from "js-cookie";
export async function updateLesson(id: string, body: ILessonForm) {
  let token = Cookies.get("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
