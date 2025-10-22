import Cookies from "js-cookie";
import { ILessonForm } from "@/constants/interfaces";
export async function addLesson(body: ILessonForm) {
  const token = Cookies.get("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  }
}
