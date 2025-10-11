"use client";
import { IlessonForm } from "@/constants/interfaces";

export async function addLesson(body: IlessonForm) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token") as string,
      },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
