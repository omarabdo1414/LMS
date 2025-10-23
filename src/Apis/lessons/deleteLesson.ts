import Cookies from "js-cookie";
export async function removeLesson(id: string) {
  let token = Cookies.get("token")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
