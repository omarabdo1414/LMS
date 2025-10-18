"use client";
import { getCookie } from "./get_cookie";

interface QuestionData {
    text: string;
    type: string;
    options: string[];
    correctAnswer: string;
    exam: string;
    points: number;
}

export async function addQuestion(questionData: QuestionData) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/question`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: getCookie("token") as string
                },
                body: JSON.stringify(questionData),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to add question");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error adding question:", error);
        throw error;
    }
}
