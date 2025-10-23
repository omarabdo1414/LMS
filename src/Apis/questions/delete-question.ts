"use client";
import { getCookie } from "./get_cookie";

export async function deleteQuestion(questionId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`,
            {
                method: "DELETE",
                headers: {
                    token: getCookie("token") as string,
                },
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to delete question");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error deleting question:", error);
        throw error;
    }
}
