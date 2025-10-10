"use client";
export async function getProfile() {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token") as string,
      },
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
