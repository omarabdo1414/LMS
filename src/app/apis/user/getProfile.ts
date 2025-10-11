import { cookies } from "next/headers";
export async function getProfile() {
  let cookie = await cookies();
  let token = cookie.get("token")?.value;
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
