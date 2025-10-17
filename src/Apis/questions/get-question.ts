"use client";

/**
 * Get all questions
 * Access: Admin only
 */
export async function getAllQuestions() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/question`,
            {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token") as string,
                },
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch questions");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching all questions:", error);
        throw error;
    }
}

/**
 * Get question by ID
 * Access: Admin, User
 * Returns specific question along with its associated exam
 */
export async function getQuestionById(questionId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/question/get/${questionId}`,
            {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token") as string,
                },
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch question");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching question:", error);
        throw error;
    }
}
