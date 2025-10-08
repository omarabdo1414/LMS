import { ILoginForm } from "@/constants/interfaces";
export async function signin(body: ILoginForm) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await res.json()
    return data
  } catch (error) {
    console.error(error);
    
  }
}
