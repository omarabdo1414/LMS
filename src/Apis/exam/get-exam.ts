"use client";
import Cookies from "js-cookie";

export async function getExam(examId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/exam/get/${examId}`,
            {
                method: "GET",
                headers: {
                    token: Cookies.get("token") as string,
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


