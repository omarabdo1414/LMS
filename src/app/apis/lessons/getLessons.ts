import { cookies } from "next/headers";
export async function getLessons(page: number = 1) {
  try {
    const token = (await cookies()).get("token")?.value;
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/?limit=12&page=${page}`,
      {
        method: "GET",
        headers: {
          token: token as string,
        },
        cache: "no-cache",
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
