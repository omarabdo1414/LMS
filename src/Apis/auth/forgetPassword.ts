import { IForgetPass } from "@/constants/interfaces";

export async function forgetPassword(body: IForgetPass) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
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
