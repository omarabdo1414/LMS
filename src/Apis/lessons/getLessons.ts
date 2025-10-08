"use client";
export async function getLessons(page: number = 1) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/?page=${page}`,
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token") as string,
        },
        next: {
          revalidate: 60,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
