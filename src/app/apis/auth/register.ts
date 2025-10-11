import { ISignup } from "@/constants/interfaces";

export async function createAccount(body: ISignup) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
