import { IResetPass } from "@/constants/interfaces";

export async function resetPassword(body: IResetPass) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
