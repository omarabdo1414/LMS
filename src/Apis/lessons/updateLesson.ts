import Cookies from "js-cookie";
import { IlessonForm } from "@/constants/interfaces";
export async function updateLesson(id: string, body: IlessonForm) {
  let token = Cookies.get("token");
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
