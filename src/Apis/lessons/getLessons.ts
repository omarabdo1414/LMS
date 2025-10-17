<<<<<<< HEAD
"use client";
import Cookies from "js-cookie";

=======
import { cookies } from "next/headers";
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be
export async function getLessons(page: number = 1) {
  try {
    const token = (await cookies()).get("token")?.value;
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/?limit=12&page=${page}`,
      {
        method: "GET",
        headers: {
<<<<<<< HEAD
          token: Cookies.get("token") as string,
        },
        next: {
          revalidate: 60,
=======
          token: token as string,
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be
        },
        // no cahse
        cache: "no-cache",
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
