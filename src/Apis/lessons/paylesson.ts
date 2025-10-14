"use client";
import Cookies from "js-cookie";

export async function payLesson(id: string) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/pay/${id}`,
      {
        method: "POST",
        headers: {
          token: Cookies.get("token") as string,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
