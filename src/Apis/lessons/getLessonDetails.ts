import { cookies } from "next/headers";
export async function getLessonByID(id: string) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`,
      {
        method: "GET",
        headers: {
          token: (await cookies()).get("token")?.value as string,
        },
        next: {
          revalidate: 3,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
