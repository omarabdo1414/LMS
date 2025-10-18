"use client";
import { getCookie } from "./get_cookie";

interface UpdateQuestionData {
    text?: string;
    type?: string;
    options?: string[];
    correctAnswer?: string;
    points?: number;
}

export async function updateQuestion(questionId: string, questionData: UpdateQuestionData) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: getCookie("token") as string,
                },
                body: JSON.stringify(questionData),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update question");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating question:", error);
        throw error;
    }
}
