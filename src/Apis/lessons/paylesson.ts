<<<<<<< HEAD
"use client";
import Cookies from "js-cookie";

=======
import Cookies from "js-cookie";
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be
export async function payLesson(id: string) {
  let token = Cookies.get("token")
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/pay/${id}`,
      {
        method: "POST",
        headers: {
<<<<<<< HEAD
          token: Cookies.get("token") as string,
=======
          token: token as string,
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
